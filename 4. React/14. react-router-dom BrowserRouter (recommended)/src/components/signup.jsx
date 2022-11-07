import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";



function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const signupHandler = (e) => {
        e.preventDefault();

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("user: ", user);

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent!
                        // ...
                    });

                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });




            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("firebase signup error: ", error);
            });



        // e.reset();
    }


    return (
        <>
            <h4>This is Signup page</h4>

            <form onSubmit={signupHandler}>

                Name: <input type="text" name="name" placeholder="Enter your name" onChange={(e) => { setName(e.target.value) }} />
                <br />
                Email: <input type="email" name="username" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                <br />
                Password: <input type="password" name="new-password" autoComplete="new-password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                <br />
                Password: <input type="password" name="new-password" autoComplete="new-password" placeholder="confirm password" />
                <br />
                <button type="submit">Signup</button>
            </form>
        </>
    )
}

export default Signup;
