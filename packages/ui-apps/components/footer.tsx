import React from 'react';
import "../css/footer.css";

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
        <div className="footer-column">
            <h3>Contacts</h3>
        </div>
        <div className="footer-column">
            <h3>Explore</h3>
        </div>
        <div className="footer-column">
            <h3>Resources</h3>
        </div>
        <div className="footer-column footer-icons">
            <span>📷</span>
            <span>🐦</span>
            <span>▶️</span>
            <span>💼</span>
        </div>
        </footer>
    );
};
