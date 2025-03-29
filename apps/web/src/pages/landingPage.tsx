import React from "react";
import { Banner, Footer } from "@repo/ui";
import "./css/landingPage.css";

export default function LandingPage() {
    return (
        <div className="landing-container">
            <Banner tagline="Connecting Hearts, Changing Lives" />
            <div className="landing-content">
               
            </div>
            <Footer />
        </div>
    )
};

