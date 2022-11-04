import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet
} from "react-router-dom";

import { useState } from 'react';





function App() {

  // const [page, setPage] = useState("home");

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`/`}>Home </Link>
            {/* <a href={`/`}>Home</a> */}
          </li>
          <li>
            <Link to={`/about`}>About </Link>
            {/* <a href={`about`}>About</a> */}
          </li>
          <li>
            <Link to={`/gallery`}>Gallery </Link>
            {/* <a href={`gallery`}>Gallery</a> */}
          </li>
        </ul>
      </nav>


      <Outlet/>


     



      {/* <button onClick={()=>{setPage("home")}}>Home</button>
      <button onClick={()=>{setPage("about")}}>About</button>
      <button onClick={()=>{setPage("gallery")}}>Gallery</button>

      {(page === "home") ? <Home /> : null}
      {(page === "about") ? <About /> : null}
      {(page === "gallery") ? <Gallery /> : null} */}




    </div>
  );
}

export default App;
