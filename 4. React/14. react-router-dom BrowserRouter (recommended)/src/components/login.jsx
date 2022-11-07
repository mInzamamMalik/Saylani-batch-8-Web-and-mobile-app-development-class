import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


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


    return (
        <>
            <h4>This is Login page</h4>

            <form onSubmit={loginHandler}>


                Email: <input type="email" name="username" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                <br />
                Password: <input type="password" name="current-password" autoComplete="current-password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />

                <br />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login;
