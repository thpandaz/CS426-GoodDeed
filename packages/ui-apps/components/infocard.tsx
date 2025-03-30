import React from 'react';
import "../css/infocard.css";

interface InfoCardProps {
    title: string;
    body: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, body }) => {
    return (
        <div className="info-card">
        <div className="info-card-title">ℹ️ {title}</div>
        <p className="info-card-body">{body}</p>
        </div>
    );
};
