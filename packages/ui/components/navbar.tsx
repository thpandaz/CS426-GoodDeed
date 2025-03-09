import React from "react";
import "../css/navbar.css"; // Ensure you have a corresponding CSS file

export const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
        <div className="navbar-logo">GoodDeed</div>
        <ul className="navbar-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="navbar-button" onClick={() => alert("Sign Up Clicked!")}>Sign Up</button>
        </nav>
    );
};

