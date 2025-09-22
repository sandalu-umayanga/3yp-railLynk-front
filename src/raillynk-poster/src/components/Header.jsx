import React from 'react';
import './components.css'; // Importing styles for the header

const Header = () => {
    return (
        <header className="poster-header">
            <div className="branding">
                <img src="/assets/logos/raillynk-logo.png" alt="RailLynk Logo" className="logo" />
                <h1 className="title">RailLynk: Modern Railway Management</h1>
            </div>
            <p className="subtitle">Comprehensive solutions for Sri Lankan railway operations</p>
        </header>
    );
};

export default Header;