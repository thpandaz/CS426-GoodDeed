import React from "react";
import { Footer, ExploreSection, OpportunityCard, InfoCard } from "@repo/ui";
import "./css/explorePage.css";

export default function ExplorePage() {
    return (
        <div className="explore-container">
            <div className="explore-content">
                <header className="explore-header">Welcome Back, User</header>

                <ExploreSection title="Opportunity picks for you" subtitle="Subheading">
                    <div className="explore-grid">
                    <InfoCard title="Title" body="Body text for whatever you’d like to say." />
                    <InfoCard title="Title" body="Body text for whatever you’d like to say." />
                    <InfoCard title="Title" body="Body text for whatever you’d like to say." />
                    </div>
                </ExploreSection>

                <ExploreSection title="Explore relating opportunity" subtitle="Subheading">
                    <div className="explore-grid">
                    <OpportunityCard heading="Heading" subheading="Subheading" />
                    <OpportunityCard heading="Heading" subheading="Subheading" />
                    <OpportunityCard heading="Heading" subheading="Subheading" />
                    </div>
                </ExploreSection>

                <ExploreSection title="Explore nearby events" subtitle="Subheading">
                    <div className="explore-grid">
                    <OpportunityCard heading="Heading" subheading="Subheading" />
                    <OpportunityCard heading="Heading" subheading="Subheading" />
                    <OpportunityCard heading="Heading" subheading="Subheading" />
                    </div>
                </ExploreSection>
            </div>
            

            <Footer />
        </div>
    );
}
