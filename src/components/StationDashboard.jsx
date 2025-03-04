import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSettings, FiMenu, FiUsers, FiList, FiClipboard, FiUserPlus, FiCreditCard, FiLogOut } from "react-icons/fi";
import "../styles/stationDashboard.css";
import { useNavigate } from "react-router-dom";

const StationDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="menu-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FiMenu size={24} />
        </button>

        <ul className="menu-list">
          <li>
            <Link to="/" className="menu-item">
              <FiClipboard size={20} /> {isSidebarOpen && "Home"}
            </Link>
          </li>
          <li>
            <Link to="/station/manage-trains" className="menu-item">
              <FiUsers size={20} /> {isSidebarOpen && "Manage Passengers"}
            </Link>
          </li>
          <li>
            <Link to="https://eservices.railway.gov.lk/schedule/searchTrain.action?lang=en" className="menu-item">
              <FiList size={20} /> {isSidebarOpen && "View Schedule"}
            </Link>
          </li>
          <li>
            <Link to="/passengersPage" className="menu-item">
              <FiUsers size={20} /> {isSidebarOpen && "Users"}
            </Link>
          </li>
          <li>
            <Link to="/passengerRegister" className="menu-item">
              <FiUserPlus size={20} /> {isSidebarOpen && "Register Passenger"}
            </Link>
          </li>
          <li>
            <Link to="/recharging" className="menu-item">
              <FiCreditCard size={20} /> {isSidebarOpen && "Recharge"}
            </Link>
          </li>
          <li>
            <Link to="/station/settings" className="menu-item">
              <FiSettings size={20} /> {isSidebarOpen && "Settings"}
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="menu-item logout-button">
              <FiLogOut size={20} /> {isSidebarOpen && "Logout"}
            </button>
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
