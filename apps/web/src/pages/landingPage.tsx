import { Footer} from "@repo/ui-web";
import Hero from "@repo/ui-web/components/Hero";
import HowItWorks from "@repo/ui-web/components/HowItWorks";
import Testimonials from "@repo/ui-web/components/Testimonials";
import CallToAction from "@repo/ui-web/components/CallToAction";
// import {LandingCard1, LandingCard2} from "@repo/assets"

import LandingBody from "@repo/ui-web/components/LandingBody";

export default function LandingPage() {

    return (
        <div className="w-full">
            <Hero />
            <LandingBody />
            <HowItWorks />
            <Testimonials />
            <CallToAction />
            <Footer />
        </div>
    );
};