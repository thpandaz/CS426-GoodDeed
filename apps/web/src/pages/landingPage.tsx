import { Footer, LandingCard, ReviewCarousel } from "@repo/ui-web";
import Hero from "@repo/ui-web/components/Hero";
import {LandingCard1, LandingCard2} from "@repo/assets"

import "./css/landingPage.css";

export default function LandingPage() {

    return (
        <div className="landing-container ">
            <Hero />
            <div className="landing-content">
                <div className="cards-container">
                    <LandingCard imgSrc={LandingCard1} description="The <strong>better solution</strong> for the next generation." className="card-left" />
                    <LandingCard imgSrc={LandingCard2} description="<strong>Be the Change—One Click at a Time</strong>: Fuel Gen Z Volunteerism to Transform Communities and Shape a Brighter Future." className="card-right" />
                </div>
                <h2 style={{ textAlign: 'left', color: 'white', fontSize: '2vw', fontWeight: 'bold', paddingBottom: '30px' }}>
                    Here's what our volunteers and partners are saying 🗣
                </h2>
                <ReviewCarousel />
            </div>
            <Footer />
        </div>
    );
};