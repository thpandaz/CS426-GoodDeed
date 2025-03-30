import React from 'react';
import "../css/exploresection.css";

interface ExploreSectionProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({ title, subtitle, children }) => {
    return (
        <section className="explore-section">
        <h2 className="explore-title">{title}</h2>
        <p className="explore-subtitle">{subtitle}</p>
        <div className="explore-section-grid">{children}</div>
        </section>
    );
};
