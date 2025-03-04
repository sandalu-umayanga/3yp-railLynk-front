import React from "react";
import "../styles/adminMain.css";

const AdminMain = () => {
  return (
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
  );
};

export default AdminMain;