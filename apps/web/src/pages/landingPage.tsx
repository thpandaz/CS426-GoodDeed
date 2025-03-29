import React from "react";
import { Banner, Footer, LandingCard } from "@repo/ui";
import "./css/landingPage.css";
import landingcard1 from "../../../native/assets/landingcard1.jpg"
import landingcard2 from "../../../native/assets/landingcard2.jpg"

export default function LandingPage() {
    return (
        <div className="landing-container">
            <Banner tagline="Connecting Hearts, Changing Lives" />
            <div className="landing-content">
                <div className="cards-container">
                    <LandingCard
                        imgSrc={landingcard1} 
                        description="The <strong>better solution</strong> for the next generation."
                        className="card-left"
                    />
                    <LandingCard
                        imgSrc={landingcard2}
                        description="<strong>Be the Change—One Click at a Time</strong>: 
                                Fuel Gen Z Volunteerism to Transform Communities and Shape 
                                a Brighter Future."
                        className="card-right"
                    />
                </div>
                <h2 style={{ textAlign: 'left', color: 'white', fontSize: '2vw', fontWeight: 'bold' }}>
                    Don't just take it from us —
                    hear from those who matter most!
                </h2>
            </div>
            <Footer />
        </div>
    )
};

