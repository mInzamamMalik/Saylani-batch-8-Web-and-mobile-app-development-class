import { useState, useContext, useEffect } from "react";
import { GlobalContext } from '../context/Context';

import { Button, TextField } from '@mui/material';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { io } from "socket.io-client";

import './login.css'
import axios from "axios";


function Login() {
    let { state, dispatch } = useContext(GlobalContext);

    const [result, setResult] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {

        const socket = io(state.baseUrlSocketIo, {
            withCredentials: true
        });

        socket.on('connect', function () {
            console.log("connected")
        });
        socket.on('disconnect', function (message) {
            console.log("Socket disconnected from server: ", message);
        });
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        socket.on(`personal-channel`, function (data) {
            console.log("socket push data: ", data);
        });

        return () => {
            socket.close();
        }

    }, [])




    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/login`, {
                email: email,
                password: password
            }, {
                withCredentials: true
            })

            dispatch({
                type: 'USER_LOGIN',
                payload: response.data.profile
            })


            console.log("login successful");
            setResult("login successful")

        } catch (e) {
            console.log("e: ", e);
        }

        // e.reset();
    }


    return (
        <>
            <h4>This is Login page</h4>

            <form onSubmit={loginHandler} className="loginForm">


                <TextField
                    className="TextField"
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="username"
                    placeholder="email"
                    autoComplete="username"
                    onChange={(e) => { setEmail(e.target.value) }}
                />


                <br />

                <TextField
                    className="TextField"
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="current-password"
                    autoComplete="current-password"
                    placeholder="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <br />
                <Button variant="outlined" type="submit">Login</Button>

            </form>
            <br />
            <button>
                <Link to={`/forget-password`}>Forget Password</Link>
            </button>


            <p>{result}</p>
        </>
    )
}

export default Login;
