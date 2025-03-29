import React from "react";
import "../css/landingcard.css";


interface LandingCardProps {
    imgSrc: string;
    description: string;
    className?: string;
}

export const LandingCard: React.FC<LandingCardProps> = ({ imgSrc, description, className = "" }) => {
    return (
        <div className={`landing-card ${className}`}> 
            <img src={imgSrc} alt="logo" />
            <p className="description" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    );
};