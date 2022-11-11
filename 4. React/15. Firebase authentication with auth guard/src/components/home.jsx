import { useState, useEffect } from "react";
import moment from 'moment';

import {
    getFirestore, collection,
    addDoc, getDocs, doc,
    onSnapshot, query, serverTimestamp,
    orderBy, deleteDoc, updateDoc, where

} from "firebase/firestore";

import { getAuth } from 'firebase/auth'








function Home() {

    const db = getFirestore();


    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [editing, setEditing] = useState({
        editingId: null,
        editingText: ""
    })




    useEffect(() => {

        const auth = getAuth();

        let unsubscribe = null;
        const getRealtimeData = async () => {

            const q = query(
                collection(db, "posts"),
                where("user", "==", auth.currentUser.email),
                // orderBy("user")
            );

            console.log("===========>", auth.currentUser.email);

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
        const auth = getAuth();

        console.log("postText: ", postText);

        try {

            const docRef = await addDoc(collection(db, "posts"), {
                text: postText,
                user: auth.currentUser.email,
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

export default Home;

