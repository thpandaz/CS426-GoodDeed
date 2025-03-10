import React from "react";
import "../css/banner.css"; 


interface BannerProps {
    tagline: string;
    imgSrc: string;
}

export const Banner: React.FC<BannerProps> = ({ tagline, imgSrc }) => {
    return (
        <div className="banner">
            <img src={ imgSrc } alt="logo" />
            <h1 className="tagline">{tagline}</h1>
        </div>
    );
};
