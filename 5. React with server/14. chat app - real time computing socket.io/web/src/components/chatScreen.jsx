import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from './../context/Context';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import { useParams } from "react-router-dom";


import "./userList.css"

function ChatScreen() {

    let { state, dispatch } = useContext(GlobalContext);
    const { id } = useParams();


    const [writeMessage, setWriteMessage] = useState("");
    const [conversation, setConversation] = useState(null);

    useEffect(() => {

        const getMessages = async () => {
            try {
                const response = await axios.get(`${state.baseUrl}/messages/${id}`)
                console.log("response: ", response.data);
                setConversation(response.data)

            } catch (error) {
                console.log("error in getting all tweets", error);
            }
        }
        getMessages();
    }, [])

    const sendMessage = async (e) => {
        if (e) e.preventDefault();

        try {
            const response = await axios.post(`${state.baseUrl}/message`, {
                to: id,
                text: writeMessage,
            })
            console.log("response: ", response.data);
        } catch (error) {
            console.log("error in getting all tweets", error);
        }
    }


    return (
        <div>
            <h1>Chat Screen</h1>

            <form onSubmit={sendMessage}>
                <input type="text" placeholder='type your message' onChange={(e) => [
                    setWriteMessage(e.target.value)
                ]} />
                <button type="submit">Send</button>
            </form>

            {(conversation?.length) ?
                conversation?.map((eachMessage, index) => {
                    return <div key={index}>
                        <h2>{eachMessage.from.firstName} {eachMessage.from.lastName}</h2>
                        <span>{moment(eachMessage.createdOn).fromNow()}</span>
                        <p>{eachMessage.text}</p>
                    </div>
                })
                : null
            }
            {(conversation?.length === 0 ? "No Messages found" : null)}
            {(conversation === null ? "Loading..." : null)}

        </div>
    );
}

export default ChatScreen;
