import { useState, useEffect } from "react";
import './App.css';

import axios from 'axios';
import moment from 'moment';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, onSnapshot, query } from "firebase/firestore";



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

      const q = query(collection(db, "posts"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
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
        createdOn: new Date().getTime(),
      });
      console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
    }


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
              {eachPost?.text}
            </h3>

            <span>{
              moment(eachPost?.datePublished)
                .format('Do MMMM, h:mm a')
            }</span>

          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
