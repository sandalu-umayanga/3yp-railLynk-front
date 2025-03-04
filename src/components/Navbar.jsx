import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/navbar.css";
import { USER_TYPE } from "../constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem(USER_TYPE);
    setUserType(storedUserType);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">RailLynk</div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
        <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
        <li><Link to="/adminLogin" onClick={() => setIsOpen(false)}>Admin</Link></li>
        {userType === "admin" && (
          <li><Link to="/adminDashboard" onClick={() => setIsOpen(false)}>Admin Dashboard</Link></li>
        )}
        {userType === "station" && (
          <li><Link to="/stationDashboard" onClick={() => setIsOpen(false)}>Station Dashboard</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;