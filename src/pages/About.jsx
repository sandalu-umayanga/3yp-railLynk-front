import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiMap, FiCreditCard, FiShield, FiClock, FiStar, FiPhone, FiMail, FiMapPin, FiNavigation } from 'react-icons/fi';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">About RailLynk</h1>
          <p className="hero-subtitle">
            Revolutionizing Sri Lanka's railway experience with smart technology and seamless digital solutions
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <h3>500K+</h3>
              <p>Daily Passengers</p>
            </div>
            <div className="stat-item">
              <h3>200+</h3>
              <p>Train Stations</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Service Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Mission</h2>
            <p>Transforming public transportation through innovative digital solutions</p>
          </div>
          <div className="mission-content">
            <div className="mission-text">
              <h3>Building the Future of Rail Travel</h3>
              <p>
                RailLynk is committed to modernizing Sri Lanka's railway system by providing 
                passengers, station operators, and administrators with cutting-edge digital tools. 
                Our platform ensures efficient, transparent, and user-friendly rail travel experiences.
              </p>
              <p>
                We believe that technology can bridge the gap between traditional railway operations 
                and modern passenger expectations, creating a seamless journey from booking to arrival.
              </p>
            </div>
            <div className="mission-image">
              <div className="image-placeholder">
                <FiNavigation size={120} />
                <p>Sri Lankan Railway Network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Key Features</h2>
            <p>Comprehensive solutions for all railway stakeholders</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FiUsers size={40} />
              </div>
              <h3>Passenger Management</h3>
              <p>Complete passenger registration, profile management, and travel history tracking system.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiCreditCard size={40} />
              </div>
              <h3>Digital Payments</h3>
              <p>Secure online recharging with Google Pay integration and real-time balance updates.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiMap size={40} />
              </div>
              <h3>Live Tracking</h3>
              <p>Real-time train location tracking and arrival time predictions for better journey planning.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiShield size={40} />
              </div>
              <h3>Smart Ticketing</h3>
              <p>Digital ticket generation, validation, and management with QR code technology.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiClock size={40} />
              </div>
              <h3>Schedule Management</h3>
              <p>Comprehensive train schedule management with delay notifications and updates.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiStar size={40} />
              </div>
              <h3>Station Operations</h3>
              <p>Efficient station management tools for platform allocation and passenger flow control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="technology-section">
        <div className="container">
          <div className="tech-content">
            <div className="tech-image">
              <div className="image-placeholder">
                <FiMap size={100} />
                <p>Modern Technology Stack</p>
              </div>
            </div>
            <div className="tech-text">
              <h2>Advanced Technology</h2>
              <div className="tech-features">
                <div className="tech-item">
                  <h4>🚀 React Frontend</h4>
                  <p>Modern, responsive user interface built with React and modern CSS</p>
                </div>
                <div className="tech-item">
                  <h4>🔧 Django Backend</h4>
                  <p>Robust API backend with Django REST framework for scalable operations</p>
                </div>
                <div className="tech-item">
                  <h4>💳 Payment Integration</h4>
                  <p>Secure payment processing with Google Pay and other digital payment methods</p>
                </div>
                <div className="tech-item">
                  <h4>📱 Mobile Responsive</h4>
                  <p>Fully responsive design that works seamlessly across all devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2>Benefits for Everyone</h2>
            <p>Creating value for all stakeholders in the railway ecosystem</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>For Passengers</h3>
              <ul>
                <li>Easy online ticket booking and payment</li>
                <li>Real-time train tracking and updates</li>
                <li>Digital wallet for seamless transactions</li>
                <li>Complete travel history and analytics</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>
            <div className="benefit-card">
              <h3>For Station Operators</h3>
              <ul>
                <li>Efficient platform management tools</li>
                <li>Real-time passenger flow monitoring</li>
                <li>Automated announcement systems</li>
                <li>Digital ticketing validation</li>
                <li>Comprehensive reporting dashboard</li>
              </ul>
            </div>
            <div className="benefit-card">
              <h3>For Administrators</h3>
              <ul>
                <li>Centralized system management</li>
                <li>Analytics and performance metrics</li>
                <li>Revenue tracking and reporting</li>
                <li>System-wide monitoring capabilities</li>
                <li>User management and security controls</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>Get in Touch</h2>
            <p>We're here to help you with any questions or support you need</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <FiPhone size={30} />
              </div>
              <h3>Phone Support</h3>
              <p>+94 11 243 4215</p>
              <p>Available 24/7 for urgent issues</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <FiMail size={30} />
              </div>
              <h3>Email Support</h3>
              <p>support@raillynk.lk</p>
              <p>Response within 24 hours</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <FiMapPin size={30} />
              </div>
              <h3>Head Office</h3>
              <p>Railway Headquarters</p>
              <p>Colombo Fort, Sri Lanka</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Modern Rail Travel?</h2>
            <p>Join thousands of passengers who have already upgraded their railway experience with RailLynk</p>
            <div className="cta-buttons">
              <Link to="/login" className="cta-btn primary">
                Get Started Today
              </Link>
              <Link to="/adminLogin" className="cta-btn secondary">
                Admin Access
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
