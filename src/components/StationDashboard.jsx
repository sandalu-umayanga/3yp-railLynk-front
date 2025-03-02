import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSettings, FiMenu, FiMapPin, FiUsers, FiList, FiClipboard } from "react-icons/fi";
import "../styles/stationDashboard.css";

const StationDashboard = () => {
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
            <Link to="/station/manage-trains" className="menu-item">
              <FiClipboard size={20} /> {isSidebarOpen && "Manage Trains"}
            </Link>
          </li>
          <li>
            <Link to="/station/manage-passengers" className="menu-item">
              <FiUsers size={20} /> {isSidebarOpen && "Manage Passengers"}
            </Link>
          </li>
          <li>
            <Link to="/station/view-schedule" className="menu-item">
              <FiList size={20} /> {isSidebarOpen && "View Schedule"}
            </Link>
          </li>
          <li>
            <Link to="/station/settings" className="menu-item">
              <FiSettings size={20} /> {isSidebarOpen && "Settings"}
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="dashboard-title">Station Dashboard</h1>

        <div className="stats-container">
          <div className="stats-card">
            <h3>Total Trains</h3>
            <p>85</p>
          </div>

          <div className="stats-card">
            <h3>Passengers Today</h3>
            <p>4,320</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDashboard;
