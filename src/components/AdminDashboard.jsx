import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiSettings, FiMenu, FiUserPlus, FiMapPin, FiList, FiMonitor } from "react-icons/fi";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
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
            <Link to="/passengersPage" className="menu-item">
              <FiUsers size={20} /> {isSidebarOpen && "Users"}
            </Link>
          </li>
          <li>
            <Link to="/admin/settings" className="menu-item">
              <FiSettings size={20} /> {isSidebarOpen && "Settings"}
            </Link>
          </li>
          <li>
            <Link to="/passengerRegister" className="menu-item">
              <FiUserPlus size={20} /> {isSidebarOpen && "Register Passenger"}
            </Link>
          </li>
          <li>
            <Link to="/stationRegister" className="menu-item">
              <FiMapPin size={20} /> {isSidebarOpen && "Register Station"}
            </Link>
          </li>
          <li>
            <Link to="/admin/view-stations" className="menu-item">
              <FiList size={20} /> {isSidebarOpen && "View Stations"}
            </Link>
          </li>
          <li>
            <Link to="/admin/view-passengers" className="menu-item">
              <FiUsers size={20} /> {isSidebarOpen && "View Passengers"}
            </Link>
          </li>
          <li>
            <Link to="http://192.168.8.119:8000/admin" className="menu-item">
              <FiMonitor size={20} /> {isSidebarOpen && "Base Admin"}
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="dashboard-title">Admin Dashboard</h1>

        <div className="stats-container">
          <div className="stats-card">
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>

          <div className="stats-card">
            <h3>Active Tickets</h3>
            <p>567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
