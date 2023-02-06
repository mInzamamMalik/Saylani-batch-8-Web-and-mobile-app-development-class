import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from './../context/Context';
import { Routes, Route, Link, Navigate } from "react-router-dom";

import './profile.css';
import coverImage from './../img/cover.jpg';
import profilePhoto from './../img/profile.jpg';

function Home() {

    let { state, dispatch } = useContext(GlobalContext);


    const [tweets, setTweets] = useState([])
    const [loadTweet, setLoadTweet] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editingTweet, setEditingTweet] = useState(null)


    const getAllTweets = async () => {
        try {
            const response = await axios.get(`${state.baseUrl}/tweets`)
            console.log("response: ", response.data);

            setTweets(response.data.data)

        } catch (error) {
            console.log("error in getting all tweets", error);
        }
    }

    const deleteTweet = async (id) => {
        try {
            const response = await axios.delete(`${state.baseUrl}/tweet/${id}`)
            console.log("response: ", response.data);

            setLoadTweet(!loadTweet)

        } catch (error) {
            console.log("error in getting all tweets", error);
        }
    }

    const editMode = (tweet) => {
        setIsEditMode(!isEditMode)
        setEditingTweet(tweet)

        editFormik.setFieldValue("tweetName", tweet.name)
        editFormik.setFieldValue("tweetPrice", tweet.price)
        editFormik.setFieldValue("tweetDescription", tweet.description)

    }

    useEffect(() => {

        getAllTweets()

    }, [loadTweet])

    const tweetValidationSchema = yup.object({
        tweetText: yup
            .string('Enter your tweet text')
            .required('tweet text is required')
            .min(3, "please enter more then 3 characters ")
            .max(140, "please enter within 140 characters "),
    })

    const myFormik = useFormik({
        initialValues: {
            tweetText: '',
        },
        validationSchema: tweetValidationSchema,
        onSubmit: (values) => {
            console.log("values: ", values);

            axios.post(`${state.baseUrl}/tweet`, {
                text: values.tweetText,
            })
                .then(response => {
                    console.log("response: ", response.data);
                    setLoadTweet(!loadTweet)
                })
                .catch(err => {
                    console.log("error: ", err);
                })
        },
    });
    const editFormik = useFormik({
        initialValues: {
            tweetText: '',
        },
        validationSchema: tweetValidationSchema,

        onSubmit: (values) => {
            console.log("values: ", values);

            axios.put(`${state.baseUrl}/tweet/${editingTweet._id}`, {
                text: values.tweetText,
            })
                .then(response => {
                    console.log("response: ", response.data);
                    setLoadTweet(!loadTweet)

                })
                .catch(err => {
                    console.log("error: ", err);
                })
        },
    });

    // let a = 3;
    // let b = 2;    

    // a = a + b; // 5
    // b = a - b; // 3
    // a = a - b; // 2







    return (
        <div>

            <div className='banner'>
                <img className='cover' src={coverImage} alt="" />
            </div>
            <div className='profile' >
                <img src={profilePhoto} alt="" />
                <span>{state?.user?.firstName} {state?.user?.lastName}  <br /> {state?.user?.email} </span>
                
                <button>
                    <Link to={`/change-password`}>Change password</Link>
                </button>
            </div>

        </div>





    );
}

export default Home;
