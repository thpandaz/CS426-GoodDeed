import React from "react";
import "../css/banner.css"; 
import logo from "../assets/cs-426-logo.svg";


interface BannerProps {
    tagline: string;
}

export const Banner: React.FC<BannerProps> = ({ tagline }) => {
    return (
        <div className="banner">
            <img src={logo} alt="logo" />
            <h1 className="tagline">{tagline}</h1>
        </div>
    );
};
