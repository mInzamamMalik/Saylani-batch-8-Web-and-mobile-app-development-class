import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from './../context/Context';

function Home() {

    let { state, dispatch } = useContext(GlobalContext);


    const [tweets, setTweets] = useState([])
    const [loadTweet, setLoadTweet] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editingTweet, setEditingTweet] = useState(null)


    const getAllTweets = async () => {
        try {
            const response = await axios.get(`${state.baseUrl}/tweetFeed`)
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

            axios.post(`${state.baseUrl}/product`, {
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


    return (
        <div>
            <h1>Home</h1>
            <form onSubmit={myFormik.handleSubmit}>
                <textarea
                    id="tweetText"
                    placeholder="what is in your mind?"
                    value={myFormik.values.tweetText}
                    onChange={myFormik.handleChange}
                    rows="4"
                    cols="50"
                ></textarea>
                {
                    (myFormik.touched.tweetText && Boolean(myFormik.errors.tweetText)) ?
                        <span style={{ color: "red" }}>{myFormik.errors.tweetText}</span>
                        :
                        null
                }

                <br />
                <button type="submit"> Submit </button>
            </form>

            <br />
            <br />


            <div >
                {tweets.map((eachProduct, i) => (
                    <div key={eachProduct._id} style={{ border: "1px solid black", padding: 10, margin: 10, borderRadius: 15 }}>
                        <h2>{eachProduct.name}</h2>
                        <p>{eachProduct._id}</p>
                        <h5>{eachProduct.price}</h5>
                        <p>{eachProduct.description}</p>

                        <button onClick={() => {
                            deleteTweet(eachProduct._id)
                        }}>delete</button>

                        <button onClick={() => {
                            editMode(eachProduct)
                        }}>edit</button>

                        {(isEditMode && editingTweet._id === eachProduct._id) ?
                            <div>

                                <form onSubmit={editFormik.handleSubmit}>
                                    <input
                                        id="tweetText"
                                        placeholder="Product Name"
                                        value={editFormik.values.tweetText}
                                        onChange={editFormik.handleChange}
                                    />
                                    {
                                        (editFormik.touched.tweetText && Boolean(editFormik.errors.tweetText)) ?
                                            <span style={{ color: "red" }}>{editFormik.errors.tweetText}</span>
                                            :
                                            null
                                    }

                                    <br />
                                    <input
                                        id="productPrice"
                                        placeholder="Product Price"
                                        value={editFormik.values.productPrice}
                                        onChange={editFormik.handleChange}
                                    />
                                    {
                                        (editFormik.touched.productPrice && Boolean(editFormik.errors.productPrice)) ?
                                            <span style={{ color: "red" }}>{editFormik.errors.productPrice}</span>
                                            :
                                            null
                                    }

                                    <br />
                                    <input
                                        id="productDescription"
                                        placeholder="Product Description"
                                        value={editFormik.values.productDescription}
                                        onChange={editFormik.handleChange}
                                    />
                                    {
                                        (editFormik.touched.productDescription && Boolean(editFormik.errors.productDescription)) ?
                                            <span style={{ color: "red" }}>{editFormik.errors.productDescription}</span>
                                            :
                                            null
                                    }

                                    <br />
                                    <button type="submit"> Submit </button>
                                </form>

                            </div> : null}

                    </div>
                ))}
            </div>


        </div>





    );
}

export default Home;
