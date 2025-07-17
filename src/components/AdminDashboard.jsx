import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiUsers, FiSettings, FiMenu, FiUserPlus, FiMapPin, 
  FiList, FiMonitor, FiLogOut, FiBarChart2, 
  FiTrendingUp, FiCalendar, FiDollarSign,
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
    totalStations: 0,
    dailyRevenue: 0,
    monthlyRevenue: 0,
    stationUsagePercentages: [],
    revenueData: []
  });
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // Fetch dashboard data from your API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Make API request to get the actual data
      const response = await API.get('admin/dashboard-stats');
      console.log("Dashboard data received:", response.data);
      // Extract the data from response
      const {
        total_cards,
        total_passengers,
        total_stations,
        daily_revenue,
        monthly_revenue,
        last_5_months_revenue,
        most_busy_stations_today
      } = response.data;
      
      // Transform monthly revenue data into chart format
      const revenueChartData = Object.entries(last_5_months_revenue || {}).map(([month, amount]) => ({
        name: month.substring(0, 3), // Get first 3 letters of month name
        amount: amount || 0
      })).sort((a, b) => {
        // Sort months chronologically
        const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
      });
      
      // Transform busy stations data for pie chart
      const stationUsageData = (most_busy_stations_today && most_busy_stations_today.length > 0)
        ? most_busy_stations_today.map((station, index) => ({
            name: station.station_name || `Station ${index + 1}`,
            value: station.usage_count || station.percentage || 0
          }))
        : [
            { name: "No data", value: 100 }
          ];
      
      // Update state with actual data
      setDashboardStats({
        totalCardsIssuedToday: total_cards || 0,
        totalPassengers: total_passengers || 0,
        totalStations: total_stations || 0,
        dailyRevenue: daily_revenue || 0,
        monthlyRevenue: monthly_revenue || 0,
        stationUsagePercentages: stationUsageData,
        revenueData: revenueChartData
      });
      
      // Reset offline state on successful API call
      setIsOffline(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      
      // Check if it's a network error and provide appropriate feedback
      if (error.code === 'ERR_NETWORK') {
        console.warn("Network error - using offline fallback data");
        setIsOffline(true);
      } else if (error.response) {
        console.warn(`API error ${error.response.status}: ${error.response.statusText}`);
        setIsOffline(true);
      }
      
      // Use realistic mock data if API fails
      setDashboardStats({
        totalCardsIssuedToday: 1,
        totalPassengers: 25,
        totalStations: 132,
        dailyRevenue: 0,
        monthlyRevenue: 0,
        stationUsagePercentages: [
          { name: "No busy stations today", value: 100 }
        ],
        revenueData: [
          { name: 'Mar', amount: 0 },
          { name: 'Apr', amount: 0 },
          { name: 'May', amount: 0 },
          { name: 'Jun', amount: 0 },
          { name: 'Jul', amount: 0 },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchDashboardData();

    // Set up interval for real-time updates (every 5 minutes to reduce network calls)
    const intervalId = setInterval(() => {
      // Only fetch if the tab is visible to avoid unnecessary network calls
      if (document.visibilityState === 'visible') {
        fetchDashboardData();
      }
    }, 300000); // 5 minutes

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
        <div className="dashboard-header">
          <h1 className="dashboard-title">Railway System Overview</h1>
          {isOffline && (
            <div className="offline-indicator">
              <span className="offline-dot"></span>
              Using offline data - Check network connection
              <button 
                className="retry-btn" 
                onClick={() => fetchDashboardData()}
                title="Retry connection"
              >
                🔄 Retry
              </button>
            </div>
          )}
        </div>
        
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

              <div className="stats-card">
                <div className="stats-icon cyan">
                  <FiMapPin size={24} />
                </div>
                <div className="stats-details">
                  <h3>Total Stations</h3>
                  <p className="stats-number">{dashboardStats.totalStations.toLocaleString()}</p>
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
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;