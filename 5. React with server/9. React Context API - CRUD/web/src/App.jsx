import './App.css';
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from './context/Context';
import axios from 'axios'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import loaderImg from './img/loader.webp'

import Home from "./components/home";
import About from "./components/about";
import Gallery from "./components/gallery";
import Login from "./components/login";
import Signup from "./components/signup";


function App() {
  let { state, dispatch } = useContext(GlobalContext);

  const [fullName, setFullName] = useState("");


  const logoutHandler = async () => {
    
    try {
      let response = await axios.post(`${state.baseUrl}/logout`, {
        withCredentials: true
      })
      console.log("response: ", response);

      dispatch({
        type: 'USER_LOGOUT'
      })
    } catch (error) {
      console.log("axios error: ", error);
    }

  }

  useEffect(() => {
    
    const getProfile = async () => {
      try {
        let response = await axios.get(`${state.baseUrl}/products`, {
          withCredentials: true
        })

        console.log("response: ", response);

        dispatch({
          type: 'USER_LOGIN'
        })
      } catch (error) {

        console.log("axios error: ", error);

        dispatch({
          type: 'USER_LOGOUT'
        })
      }



    }
    getProfile();

  }, [])


  return (
    <div>

      {
        (state.isLogin === true) ?
          <ul className='navBar'>
            <li> <Link to={`/`}>Home</Link> </li>
            <li> <Link to={`/gallery`}>Gallery</Link> </li>
            <li> <Link to={`/about`}>About</Link> </li>
            <li> <Link to={`/profile`}>Profile</Link> </li>
            <li> {fullName} <button onClick={logoutHandler}>Logout</button> </li>
          </ul>
          : null
      }
      {
        (state.isLogin === false) ?
          <ul className='navBar'>
            <li> <Link to={`/`}>Login</Link> </li>
            <li> <Link to={`/signup`}>Signup</Link> </li>
          </ul> : null
      }

      {(state.isLogin === true) ?

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null}

      {(state.isLogin === false) ?
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes> : null
      }

      {(state.isLogin === null) ?

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
          <img width={300} src={loaderImg} alt="" />
        </div>

        : null}

    </div>
  );
}

export default App;