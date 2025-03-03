import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSettings, FiMenu, FiUser, FiList, FiClipboard } from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa"; // Alternative icon from FontAwesome
import "../styles/passengerDashboard.css";

const PassengerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="menu-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FiMenu size={24} />
        </button>

        <ul className="menu-list">
          <li>
            <Link to="/passengerProfile" className="menu-item">
              <FiUser size={20} /> {isSidebarOpen && "Profile"}
            </Link>
          </li>
          <li>
            <Link to="/passenger/tickets" className="menu-item">
              <FaTicketAlt size={20} /> {isSidebarOpen && "My Tickets"}
            </Link>
          </li>
          <li>
            <Link to="https://eservices.railway.gov.lk/schedule/searchTrain.action?lang=en" className="menu-item">
              <FiList size={20} /> {isSidebarOpen && "Train Schedule"}
            </Link>
          </li>
          <li>
            <Link to="/passenger/settings" className="menu-item">
              <FiSettings size={20} /> {isSidebarOpen && "Settings"}
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="dashboard-title">Passenger Dashboard</h1>

        <div className="stats-container">
          <div className="stats-card">
            <h3>Upcoming Trips</h3>
            <p>2</p>
          </div>

          <div className="stats-card">
            <h3>Tickets Purchased</h3>
            <p>15</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDashboard;