import { LandingCard } from "../packages/ui/components/landingcard";
import landingcard1 from "./assets/landingcard1.jpg"
import landingcard2 from "./assets/landingcard2.jpg"

export default {
    title: "Components/LandingCard",
    component: LandingCard,
    parameters: {
        layout: 'centered'
    }
}

export const CardLeft = {
    args: {
        imgSrc: landingcard1,
        description: 'The <strong>better solution</strong> for the next generation.',
        className: 'card-left'
    }
}

export const CardRight = {
    args: {
        imgSrc: landingcard2,
        description: '<strong>Be the Change—One Click at a Time</strong>: Fuel Gen Z Volunteerism to Transform Communities and Shape a Brighter Future.',
        className: 'card-right'
    }
}