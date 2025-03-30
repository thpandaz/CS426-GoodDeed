import { OpportunityCard } from "@repo/ui-web";

export default {
    title: "Components/OpportunityCard",
    component: OpportunityCard,
    parameters: {
        layout: 'centered'
    }
}

export const Labels = {
    args: {
        heading: 'Heading',
        subheading: 'Subheading',
        labels: ['label1', 'label2', 'label3']
    }
}

export const NoLabels = {
    args: {
        heading: 'Heading',
        subheading: 'Subheading',
    }
}