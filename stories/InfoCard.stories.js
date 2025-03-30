import { InfoCard } from "../packages/ui/components/infocard";

export default {
    title: "Components/InfoCard",
    component: InfoCard,
    parameters: {
        layout: 'centered'
    }
}

export const Primary = {
    args: {
        title: 'Title',
        body: 'Body'
    }
}