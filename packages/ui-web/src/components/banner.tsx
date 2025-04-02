import React from "react";
import "../css/banner.css"; 
import {IntroVideo, Logo} from "@repo/assets";



interface BannerProps {
    tagline: string;
}

export const Banner: React.FC<BannerProps> = ({ tagline }) => {
    return (
        <div className="banner">
            <video autoPlay loop muted className="banner-video text-red-500">
                <source src={IntroVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <img src={Logo} alt="logo" />
            <h1 className="tagline">{tagline}</h1>
        </div>
    );
};