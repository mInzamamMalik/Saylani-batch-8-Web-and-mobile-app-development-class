import './App.css';
import Home from "./components/home";
import About from "./components/about";
import Gallery from "./components/gallery";
import Weather from "./components/weather";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>

      <Router>
        <nav className='navBar'>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/weather">Weather</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="weather" element={<Weather />} />
          <Route path="about" element={<About/>} />
          <Route path="gallery" element={<Gallery/>} />
          <Route index element={<Home/>} />
        </Routes>

      </Router>

    </div>

  );
}

export default App;
