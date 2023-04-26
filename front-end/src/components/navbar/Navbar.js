import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [loggedIn, setLoggedIn] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    document.location.href = "/signup";
  };

  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.clear();
    navigate("/signup");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <Link to="/">
              <span>L</span>earn<span>W</span>ith<span>U</span>s
            </Link>
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/tutorials">tutorials</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/bookshelf">Bookshelf</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>

            {!loggedIn && (
              <button onClick={handleLogin} className="text-center my-2 pr-4 pl-2">
                <Link className="signup-btn text-white hover:bg-purple-800 font-medium text-sm text-center">
                  Sign In/Sign Up </Link>
              </button>
            )}

            {loggedIn && (
              <button onClick={handleLogout} className="text-center my-2 pr-4 pl-2">
                <Link className="signup-btn text-white hover:bg-purple-800 font-medium text-sm text-center"> Sign Out </Link>
              </button>
            )}
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <Link onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </Link>
          </div>
        </div>
      </nav>
      <hr className='hr-line' />
      <div className={`sub-navbar mx-5 ${showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}`}>
        {/* Home icon from font awesome */}
        <Link to="/" className="home-icon"><i className="fas fa-home"></i></Link>

        {/* Sub navbar links */}
        <div className="sub-navbar-links">
          <Link to="/courses/html-course" className="navbar-links">HTML</Link>
          <Link to="/courses/css-course" className="navbar-links">CSS</Link>
          <Link to="/courses/namaste-js-course" className="navbar-links">JS</Link>
          <Link to="/courses/python-course" className="navbar-links">Python</Link>
          <Link to="/courses/java-course" className="navbar-links">Java</Link>
          <Link to="/courses/cpp-course" className="navbar-links">C++</Link>
          <Link to="/courses/c-course" className="navbar-links">C</Link>
          <Link to="/courses/react-course" className="navbar-links">React</Link>
          <Link to="/courses/node-course" className="navbar-links">Node</Link>
        </div>
      </div>
      <hr className='hr-line1' />
    </>
  );
}