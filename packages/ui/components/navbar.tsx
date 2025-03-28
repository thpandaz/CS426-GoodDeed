import React from "react";
import "../css/navbar.css"; // CSS for navbar
import { Link } from "react-router-dom";


// Creates a super simple Nav Bar with links and button
export const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
        <div className="navbar-logo">GoodDeed</div>
        <ul className="navbar-links">
            <li><Link to="/main">Home</Link></li>
            <li><Link to="/explorePage">Explore</Link></li>

            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="navbar-button" onClick={() => alert("Sign Up Clicked!")}>Sign Up</button>
        </nav>
    );

};

