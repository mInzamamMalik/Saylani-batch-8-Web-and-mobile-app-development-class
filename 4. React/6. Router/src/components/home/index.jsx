
import { useState, useEffect } from "react"
import "./index.css";
import Post from "./../post"
import axios from "axios";




function Home() {

    const [isLit, setLit] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        axios.get("https://my-json-server.typicode.com/minzamammalik/jsonplaceholder/posts")
            .then(response => {
                console.log("response: ", response.data);

                setPosts(response.data);
            })
            .catch(err => {
                console.log("error: ", err);
            })
            
    }, [])



    const clickHandler = () => {
        console.log("I am click handler")
        setLit(!isLit)
    }

    return (
        <div className={`room ${(isLit) ? "lit" : "dark"}`}>

            
            <button onClick={clickHandler} >Toggle Dark Mode</button>

            

            {
                posts.map((eachPost, i) => (
                    <>
                        <Post
                            name={eachPost.name}
                            postText={eachPost.postText}
                            profilePhoto={eachPost.profilePhoto}
                            postImage="https://cdn.motor1.com/images/mgl/mrz1e/s3/coolest-cars-feature.jpg"
                            postDate={eachPost.postDate}
                        ></Post>
                    </>
                ))
            }


        </div>
    );
}

export default Home;



