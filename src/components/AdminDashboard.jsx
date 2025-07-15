import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiUsers, FiSettings, FiMenu, FiUserPlus, FiMapPin, 
  FiList, FiMonitor, FiLogOut, FiBarChart2, 
  FiTrendingUp, FiCalendar, FiClock, FiMap, FiDollarSign,
  FiCreditCard
} from "react-icons/fi";
import "../styles/adminDashboard.css";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Import your API instance

// For charts - install these packages:
// npm install recharts

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState({
    totalCardsIssuedToday: 0,
    totalPassengers: 0,
    dailyRevenue: 0,
    monthlyRevenue: 0,
    stationUsagePercentages: [],
    // Example data for sections without real API data
    activeTrains: 0,
    upcomingDepartures: [],
    trainsTracking: [],
    revenueData: []
  });
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Fetch dashboard data from your API
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Make API request to get the actual data
        const response = await API.get('admin/dashboard-stats');
        console.log(response);
        // Extract the data from response
        const {
          total_cards_issued_today,
          total_passengers,
          daily_revenue,
          monthly_revenue_last_6_months,
          station_usage_percentages
        } = response.data;
        
        // Transform monthly revenue data into chart format
        const revenueChartData = Object.entries(monthly_revenue_last_6_months).map(([month, amount]) => ({
          name: month.split(' ')[0], // Extract just the month name
          amount: amount
        })).reverse(); // Reverse to show chronological order
        
        // Update state with actual data and keep example data for other sections
        setDashboardStats({
          totalCardsIssuedToday: total_cards_issued_today,
          totalPassengers: total_passengers,
          dailyRevenue: daily_revenue,
          // Use the latest month's revenue as monthly revenue
          monthlyRevenue: Object.values(monthly_revenue_last_6_months)[0] || 0,
          stationUsagePercentages: station_usage_percentages.map(item => ({
            name: item.station,
            value: item.percentage
          })),
          // Example data for other sections
          activeTrains: 26,
          upcomingDepartures: [
            { id: 1, trainName: "Express 101", destination: "Kandy", departure: "10:15 AM", platform: 3 },
            { id: 2, trainName: "Coastal Line", destination: "Galle", departure: "11:30 AM", platform: 1 },
            { id: 3, trainName: "Northern Express", destination: "Jaffna", departure: "12:45 PM", platform: 5 }
          ],
          trainsTracking: [
            { id: 101, name: "Express 101", status: "On time", location: "Approaching Gampaha" },
            { id: 102, name: "Coastal Line", status: "Delayed (15m)", location: "Departed Panadura" },
            { id: 103, name: "Northern Express", status: "On time", location: "At Kurunegala" }
          ],
          revenueData: revenueChartData
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Use mock data if API fails
        setDashboardStats({
          totalCardsIssuedToday: 8,
          totalPassengers: 8,
          dailyRevenue: 125,
          monthlyRevenue: 125,
          stationUsagePercentages: [
            { name: "Colombo Fort", value: 78 },
            { name: "Kandy", value: 65 },
            { name: "Galle", value: 42 },
            { name: "Jaffna", value: 31 }
          ],
          activeTrains: 26,
          upcomingDepartures: [
            { id: 1, trainName: "Express 101", destination: "Kandy", departure: "10:15 AM", platform: 3 },
            { id: 2, trainName: "Coastal Line", destination: "Galle", departure: "11:30 AM", platform: 1 },
            { id: 3, trainName: "Northern Express", destination: "Jaffna", departure: "12:45 PM", platform: 5 }
          ],
          trainsTracking: [
            { id: 101, name: "Express 101", status: "On time", location: "Approaching Gampaha" },
            { id: 102, name: "Coastal Line", status: "Delayed (15m)", location: "Departed Panadura" },
            { id: 103, name: "Northern Express", status: "On time", location: "At Kurunegala" }
          ],
          revenueData: [
            { name: 'Dec', amount: 0 },
            { name: 'Jan', amount: 0 },
            { name: 'Feb', amount: 0 },
            { name: 'Mar', amount: 0 },
            { name: 'Apr', amount: 0 },
            { name: 'May', amount: 125 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Set up interval for real-time updates (every 30 seconds)
    const intervalId = setInterval(fetchDashboardData, 300000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    // Dispatch custom event to update navbar
    window.dispatchEvent(new Event('userTypeChanged'));
    navigate("/");
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"} items`}>
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
            <Link to="/adminTracking" className="menu-item">
              <FiUsers size={20} /> {isSidebarOpen && "Live Location"}
            </Link>
          </li>
          <li>
            <Link to="http://192.168.8.119:8000/admin" className="menu-item">
              <FiMonitor size={20} /> {isSidebarOpen && "Base Admin"}
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
        <h1 className="dashboard-title">Railway System Overview</h1>
        
        {loading ? (
          <div className="loading-spinner">Loading dashboard data...</div>
        ) : (
          <>
            {/* Top Stats Row */}
            <div className="stats-row">
              <div className="stats-card">
                <div className="stats-icon blue">
                  <FiCreditCard size={24} />
                </div>
                <div className="stats-details">
                  <h3>Cards Issued Today</h3>
                  <p className="stats-number">{dashboardStats.totalCardsIssuedToday.toLocaleString()}</p>
                </div>
              </div>

              <div className="stats-card">
                <div className="stats-icon green">
                  <FiUsers size={24} />
                </div>
                <div className="stats-details">
                  <h3>Total Passengers</h3>
                  <p className="stats-number">{dashboardStats.totalPassengers.toLocaleString()}</p>
                </div>
              </div>

              <div className="stats-card">
                <div className="stats-icon orange">
                  <FiDollarSign size={24} />
                </div>
                <div className="stats-details">
                  <h3>Daily Revenue</h3>
                  <p className="stats-number">Rs. {dashboardStats.dailyRevenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="stats-card">
                <div className="stats-icon purple">
                  <FiDollarSign size={24} />
                </div>
                <div className="stats-details">
                  <h3>Monthly Revenue</h3>
                  <p className="stats-number">Rs. {dashboardStats.monthlyRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="charts-row">
              {/* Monthly Revenue Chart */}
              <div className="chart-container">
                <h3><FiTrendingUp /> Monthly Revenue</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={dashboardStats.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`Rs. ${value.toLocaleString()}`, 'Revenue']} />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Station Usage Chart */}
              <div className="chart-container">
                <h3><FiUsers /> Station Usage</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={dashboardStats.stationUsagePercentages}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                    >
                      {dashboardStats.stationUsagePercentages.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Usage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Upcoming Departures Table */}
            <div className="data-container">
              <h3><FiClock /> Upcoming Departures</h3>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Train</th>
                      <th>Destination</th>
                      <th>Departure</th>
                      <th>Platform</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardStats.upcomingDepartures.map((train) => (
                      <tr key={train.id}>
                        <td>{train.trainName}</td>
                        <td>{train.destination}</td>
                        <td>{train.departure}</td>
                        <td>{train.platform}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Train Tracking Status */}
            <div className="data-container">
              <h3><FiMap /> Live Train Tracking</h3>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Train ID</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Current Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardStats.trainsTracking.map((train) => (
                      <tr key={train.id}>
                        <td>{train.id}</td>
                        <td>{train.name}</td>
                        <td className={train.status.includes('Delayed') ? 'delayed' : 'on-time'}>
                          {train.status}
                        </td>
                        <td>{train.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;