import React from 'react';
import './components.css';

const Section = ({ title, content, image }) => {
    return (
        <div className="section">
            {image && <img src={image} alt={title} className="section-image" />}
            <h2 className="section-title">{title}</h2>
            <p className="section-content">{content}</p>
        </div>
    );
};

export default Section;