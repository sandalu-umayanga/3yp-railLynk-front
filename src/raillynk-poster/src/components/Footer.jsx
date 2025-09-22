import React from 'react';
import './components.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} RailLynk. All rights reserved.</p>
                <p>Contact us: support@raillynk.com</p>
            </div>
        </footer>
    );
};

export default Footer;