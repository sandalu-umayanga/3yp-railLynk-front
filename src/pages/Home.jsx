import { useEffect, useState } from "react";
import "../styles/home.css";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home">

      <div className="railway-background">
        <div className="track"></div>
        <div className="track-lights"></div>
        <div className="railway-gradient"></div>
      </div>
      
      <div className="animated-background">
        <div className="animated-shape shape1"></div>
        <div className="animated-shape shape2"></div>
        <div className="animated-shape shape3"></div>
        <div className="animated-shape shape4"></div>
      </div>

      <div 
        className="home-theme" 
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <h1>Welcome to RailLynk</h1>
        <p>Revolutionizing Sri Lanka's railway experience with smart technology and seamless digital solutions</p>
        <div className="hero-decoration">
          <div className="floating-element">🚊</div>
          <div className="floating-element">🎫</div>
          <div className="floating-element">📱</div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>Transforming public transportation through innovative digital solutions</p>
          <div className="mission-description">
            <p>
              RailLynk is Sri Lanka's premier digital railway platform, designed to modernize and 
              streamline your train travel experience. We bridge the gap between traditional rail 
              services and cutting-edge technology, creating seamless journeys for all passengers.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Section */}
      <div className="stats-section">
        <h2>Trusted by Thousands</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">500K+</div>
            <div className="stat-label">Daily Passengers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-label">Train Stations</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Service Support</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">System Uptime</div>
          </div>
        </div>
      </div>

      {/* Core Features Section */}
      <div className="features-section">
        <h2>Key Features</h2>
        <p className="features-subtitle">Comprehensive solutions for modern rail travel</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎫</div>
            <h3>Smart Ticketing</h3>
            <p>Digital ticket generation, validation, and management with QR code technology for seamless travel.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Real-time Tracking</h3>
            <p>Live train location tracking and accurate arrival time predictions for better journey planning.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Digital Payments</h3>
            <p>Secure online recharging with Google Pay integration and real-time balance updates.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>Station Operations</h3>
            <p>Efficient station management tools for platform allocation and passenger flow control.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Passenger Management</h3>
            <p>Complete passenger registration, profile management, and travel history tracking system.</p>
          </div>
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="tech-section">
        <h2>Modern Technology Stack</h2>
        <p className="tech-subtitle">Built with cutting-edge technology</p>
        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-icon">🚀</div>
            <h3>React Frontend</h3>
            <p>Modern, responsive user interface built with React and contemporary CSS frameworks</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">🔧</div>
            <h3>Django Backend</h3>
            <p>Robust API backend with Django REST framework for scalable and secure operations</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">💳</div>
            <h3>Google Pay Integration</h3>
            <p>Secure payment processing with Google Pay and other trusted digital payment methods</p>
          </div>
          <div className="tech-card">
            <div className="tech-icon">📱</div>
            <h3>Mobile Responsive</h3>
            <p>Fully responsive design that works seamlessly across all devices and screen sizes</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <h2>Benefits for Everyone</h2>
        <p className="benefits-subtitle">Creating value for all stakeholders in the railway ecosystem</p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>For Passengers</h3>
            <ul>
              <li>Real-time train tracking and updates</li>
              <li>Digital wallet for seamless transactions</li>
              <li>Complete travel history and analytics</li>
              <li>Mobile-friendly interface</li>
              <li>Instant ticket validation</li>
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

      {/* Call to Action */}
      
    </div>
  );
};

export default Home;