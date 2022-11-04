import logo from './logo.svg';
import './App.css';
import { useState } from "react";

import { Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./components/home";
import About from "./components/about";
import Gallery from "./components/gallery";
import Login from "./components/login";
import Signup from "./components/signup";



function App() {

  const [isLogin, setIsLogin] = useState(false);


  return (
    <div>

      <button onClick={() => { setIsLogin(!isLogin) }}>Toggle login test</button>


      {
        (isLogin) ?
          <ul>
            <li> <Link to={`/`}>Home</Link> </li>
            <li> <Link to={`/gallery`}>Gallery</Link> </li>
            <li> <Link to={`/about`}>About</Link> </li>
            <li> <Link to={`/profile`}>Profile</Link> </li>
          </ul>
          :
          <ul>
            <li> <Link to={`/`}>Login</Link> </li>
            <li> <Link to={`/signup`}>Signup</Link> </li>
          </ul>
      }

      {(isLogin) ?

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      }

    </div>
  );
}

export default App;
