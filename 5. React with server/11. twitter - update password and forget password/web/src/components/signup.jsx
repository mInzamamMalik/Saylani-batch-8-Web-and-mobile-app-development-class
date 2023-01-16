import { useState, useContext } from "react";
import axios from 'axios';
import { GlobalContext } from '../context/Context';




function Signup() {
    let { state, dispatch } = useContext(GlobalContext);

    const [result, setResult] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const signupHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/signup`, {
                firstName: name,
                lastName: name,
                email: email,
                password: password
            })


            console.log("signup successful");
            setResult("signup successful")

        } catch (e) {
            console.log("e: ", e);
        }


        // e.reset();
    }


    return (
        <>
            <h4>This is Signup page</h4>

            <form onSubmit={signupHandler}>

                Name: <input type="text" name="name" placeholder="Enter your name" onChange={(e) => { setName(e.target.value) }} />
                <br />
                Email: <input type="email" name="username" autoComplete="username" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                <br />
                Password: <input type="password" name="new-password" autoComplete="new-password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                <br />
                Password: <input type="password" name="new-password" autoComplete="new-password" placeholder="confirm password" />
                <br />
                <button type="submit">Signup</button>
            </form>
            <p>{result}</p>
        </>
    )
}

export default Signup;
