import { Banner, Footer, LandingCard, ReviewCarousel } from "@repo/ui-web";
import landingcard1 from "../../../native/assets/landingcard1.jpg"
import landingcard2 from "../../../native/assets/landingcard2.jpg"
import "./css/landingPage.css";

export default function LandingPage() {

    return (
        <div className="landing-container ">
            <Banner tagline="Connecting Hearts, Changing Lives" />
            <div className="landing-content">
                <div className="cards-container">
                    <LandingCard imgSrc={landingcard1} description="The <strong>better solution</strong> for the next generation." className="card-left" />
                    <LandingCard imgSrc={landingcard2} description="<strong>Be the Change—One Click at a Time</strong>: Fuel Gen Z Volunteerism to Transform Communities and Shape a Brighter Future." className="card-right" />
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