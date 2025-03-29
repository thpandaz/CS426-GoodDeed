import React from "react";
import "../css/banner.css"; 
import logo from "../../../apps/native/assets/cs-426-logo-light.svg"


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