import { InfoCard } from "@repo/ui-web";

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