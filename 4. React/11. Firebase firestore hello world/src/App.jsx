import { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import { initializeApp } from "firebase/app";

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

  const [editing, setEditing] = useState({
    editingId: null,
    editingText: ""
  })




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

      <form onSubmit={savePost}>
        <textarea
          type="text"
          placeholder="What's in your mind..."
          onChange={(e) => {
            setPostText(e.target.value)
          }}
        />
        <br />
        <button type="submit">Post</button>
      </form>

      <div>
        {(isLoading) ? "loading..." : ""}

        {posts.map((eachPost, i) => (
          <div className="post" key={i}>

            <h3
              className="title"
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
            </h3>

            <span>{
              moment(
                (eachPost?.createdOn?.seconds) ?
                  eachPost?.createdOn?.seconds * 1000
                  :
                  undefined
              )
                .format('Do MMMM, h:mm a')
            }</span>

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
