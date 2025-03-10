import { createRoot } from "react-dom/client";
import "./style.css";
import { Banner, LandingCard, NavBar } from "@repo/ui";
import logo from "../assets/cs-426-logo.svg";
import landingcard1 from "../assets/landingcard1.jpg";
import landingcard2 from "../assets/landingcard2.jpg";

const App = () => (
  <div>
    <NavBar></NavBar>
    <Banner tagline="Connecting Hearts, Changing Lives"
            imgSrc={logo}/>
      <div className="cards-container">
        <LandingCard
          imgSrc={landingcard1} 
          description="The <strong>better solution</strong> for the next generation."
          className="card-left"/>
        <LandingCard
          imgSrc={landingcard2}
          description="<strong>Be the Change—One Click at a Time</strong>: 
                      Fuel Gen Z Volunteerism to Transform Communities and Shape 
                      a Brighter Future."
          className="card-right"/>
    </div>
    <h2 style={{ textAlign: 'left', color: 'black', fontSize: '24px', fontWeight: 'bold', margin: '50px' }}>
      Don't just take it from us, <br />
      hear from those who matter most!
    </h2>
  </div>
);

createRoot(document.getElementById("app")!).render(<App />);