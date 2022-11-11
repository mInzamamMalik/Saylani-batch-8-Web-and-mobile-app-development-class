import { useState } from "react";
import {
    getAuth, signInWithEmailAndPassword,
    FacebookAuthProvider, signInWithPopup
} from "firebase/auth";
import { Button, TextField } from '@mui/material';

import './login.css'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");





    const loginHandler = (e) => {
        e.preventDefault();


        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("login successful: ", user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("firebase login error: ", errorCode, errorMessage);
            });



        // e.reset();
    }
    const facebookLoginHandler = () => {

        const provider = new FacebookAuthProvider();
        provider.addScope('user_birthday');
        provider.setCustomParameters({
            'display': 'popup'
        });

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                console.log("user: ", user);

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                console.log("error in facebook login");
            });



    }


    return (
        <>
            <h4>This is Login page</h4>

            <form onSubmit={loginHandler} className="loginForm">


                <TextField
                    className="TextField"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="username"
                    placeholder="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                />


                <br />

                <TextField
                    className="TextField"
                    id="outlined-basic"
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


            <button onClick={facebookLoginHandler}>Login with Facebook</button>
            <button>Login with Github</button>
            <button>Login with Abc</button>
            <button>Login with Xyz</button>
        </>
    )
}

export default Login;
