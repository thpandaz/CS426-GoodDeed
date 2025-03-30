import React from "react";
import "../css/banner.css"; 
import logo from "../../../apps/native/assets/cs-426-logo-light.svg"
import goodDeedVideo from '../../../apps/native/assets/gooddeed.mp4';



interface BannerProps {
    tagline: string;
}

export const Banner: React.FC<BannerProps> = ({ tagline }) => {
    return (
        <div className="banner">
            <video autoPlay loop muted className="banner-video">
                <source src={goodDeedVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <img src={logo} alt="logo" />
            <h1 className="tagline">{tagline}</h1>
        </div>
    );
};