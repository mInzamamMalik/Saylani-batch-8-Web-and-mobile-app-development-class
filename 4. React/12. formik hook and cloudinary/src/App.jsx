import { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import { initializeApp } from "firebase/app";
import { useFormik } from 'formik';
import * as yup from 'yup';


import {
  getFirestore, collection,
  addDoc, getDocs, doc,
  onSnapshot, query, serverTimestamp,
  orderBy, deleteDoc, updateDoc

} from "firebase/firestore";

import './App.css';




const firebaseConfig = {
  apiKey: "AIzaSyBjeDp-5ohk2ro06AgYvSJI_QZC6zlFinE",
  authDomain: "helloworldfirebase-58375.firebaseapp.com",
  projectId: "helloworldfirebase-58375",
  storageBucket: "helloworldfirebase-58375.appspot.com",
  messagingSenderId: "73482016651",
  appId: "1:73482016651:web:9b2f45f359f552f16d018e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);




function App() {

  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [editing, setEditing] = useState({
    editingId: null,
    editingText: ""
  })


  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
    },
    validationSchema: yup.object({
      title: yup
        .string('Enter Title')
        .required('Title is required')
        .min(5, "Please enter at least 5 characters in post title")
        .max(20, "limit exceed: 20 Characters max"),

      text: yup
        .string('Please ent6er your post text')
        .required('Post text is required')
        .min(10, "Please enter at least 10 characters in post")
        .max(300, 'Limit exceed: 300 Characters max'),

    }),
    onSubmit: async (values) => {




      const cloudinaryData = new FormData();
      cloudinaryData.append("file", file);
      cloudinaryData.append("upload_preset", "profilepicturesabc");
      cloudinaryData.append("cloud_name", "malikasinger");
      console.log(cloudinaryData);

      axios.post(`https://api.cloudinary.com/v1_1/malikasinger/image/upload`,
        cloudinaryData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(async res => {
         
          console.log("from then", res.data);

          console.log("values: ", values)
          try {

            const docRef = await addDoc(collection(db, "posts"), {
              title: values.title,
              text: values.text,
              img: res?.data?.url,
              createdOn: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);

          } catch (e) {
            console.error("Error adding document: ", e);
          }


        })
        .catch(err => {
          console.log("from catch", err);
        })









    },
  });




  useEffect(() => {


    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `, doc.data());

        setPosts((prev) => {
          let newArray = [...prev, doc.data()];
          return newArray
        });

      });
    }
    // getData();

    let unsubscribe = null;
    const getRealtimeData = async () => {

      const q = query(collection(db, "posts"), orderBy("createdOn", "desc"));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          // posts.unshift(doc.data());
          // posts.push(doc.data());

          posts.push({ id: doc.id, ...doc.data() });

        });

        setPosts(posts);
        console.log("posts: ", posts);
      });

    }
    getRealtimeData();

    return () => {
      console.log("Cleanup function");
      unsubscribe();
    }

  }, [])




  const savePost = async (e) => {
    e.preventDefault();

    console.log("postText: ", postText);

    try {

      const docRef = await addDoc(collection(db, "posts"), {
        text: postText,
        // createdOn: new Date().getTime(),
        createdOn: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
    }


  }

  const deletePost = async (postId) => {

    console.log("postId: ", postId);

    await deleteDoc(doc(db, "posts", postId));

  }

  const updatePost = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "posts", editing.editingId), {
      text: editing.editingText
    });

    setEditing({
      editingId: null,
      editingText: ""
    })

  }


  return (
    <div>




      <form onSubmit={formik.handleSubmit}>

        Title:
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="Title"

        />

        {
          (formik.touched.title)
            ?
            <span style={{ color: "red" }}>{formik.errors.title} </span>
            :
            null
        }

        <br />

        Text:
        <textarea
          type="text"
          name="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          placeholder="What's in your mind..."
        />
        <span style={{ color: "red" }}>
          {formik.touched.text && formik.errors.text}
        </span>

        <br />

        Profile Picture:
        <input
          type="file"
          name="profilePicture"
          onChange={(e) => {
            console.log(e.currentTarget.files[0])

            setFile(e.currentTarget.files[0])
          }}
        />

        <br />


        <button type="submit">Post</button>
      </form>

      <div>
        {(isLoading) ? "loading..." : ""}

        {posts.map((eachPost, i) => (
          <div className="post" key={i}>

            <h3>{eachPost.title}</h3>

            <p
              href={eachPost?.url}
              target="_blank" rel="noreferrer"
            >
              {(eachPost.id === editing.editingId) ?
                <form onSubmit={updatePost}>

                  <input
                    type="text"
                    value={editing.editingText}
                    onChange={(e) => {
                      setEditing({
                        ...editing,
                        editingText: e.target.value
                      })
                    }}
                    placeholder="please enter updated value" />

                  <button type="submit">Update</button>
                </form>
                :
                eachPost?.text}
            </p>

            <span>{
              moment(
                (eachPost?.createdOn?.seconds) ?
                  eachPost?.createdOn?.seconds * 1000
                  :
                  undefined
              )
                .format('Do MMMM, h:mm a')
            }</span>

            <img src={eachPost?.img} alt="" />

            <br />
            <br />
            <button onClick={() => {

              deletePost(eachPost?.id)

            }}>Delete</button>

            {(editing.editingId === eachPost?.id) ? null :
              <button onClick={() => {

                setEditing({
                  editingId: eachPost?.id,
                  editingText: eachPost?.text
                })

              }} >Edit</button>
            }

          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
