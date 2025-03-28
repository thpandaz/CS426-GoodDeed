import React from 'react';
import "../css/opportunitycard.css";

interface OpportunityCardProps {
    heading: string;
    subheading: string;
    labels?: string[];
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
    heading,
    subheading,
    labels = [],
}) => {
    return (
        <div className="opportunity-card">
        <div className="opportunity-card-heading">{heading}</div>
        <div className="opportunity-card-subheading">{subheading}</div>
        <div className="opportunity-card-labels">
            {labels.map((label, idx) => (
            <span key={idx} className="opportunity-card-label">
                ✅ {label}
            </span>
            ))}
        </div>
        </div>
    );
};
