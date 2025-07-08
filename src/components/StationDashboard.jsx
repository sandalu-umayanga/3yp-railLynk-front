import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiSettings, FiMenu, FiUsers, FiList, FiClipboard, FiUserPlus, 
  FiCreditCard, FiLogOut, FiDatabase, FiBell, FiCalendar, 
  FiMapPin, FiClock, FiAlertOctagon, FiMap, FiSearch,
  FiMic, FiUserCheck, FiFileText, FiBarChart2, FiTool,
  FiEdit, FiTrash, FiInfo, FiPhone, FiMail
} from "react-icons/fi";
import "../styles/stationDashboard.css";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Import API service

// You'll need to install these packages:
// npm install react-calendar recharts leaflet react-leaflet

import Calendar from 'react-calendar';
import { 
  LineChart, Line, BarChart, Bar, ResponsiveContainer, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-calendar/dist/Calendar.css';

const StationDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [currentTab, setCurrentTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState({
    temp: '28°C',
    condition: 'Sunny',
    icon: '☀️'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for all dashboard data
  const [stationData, setStationData] = useState({
    stationName: "Colombo Fort",
    stationId: "CMB001",
    arrivingTrainsToday: 0,
    departingTrainsToday: 0,
    platformOccupancy: 0,
    delayedTrains: 0,
    emergencyAlerts: 0,
    platforms: 8
  });
  const [trainSchedule, setTrainSchedule] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [trackingData, setTrackingData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [platformOccupancyData, setPlatformOccupancyData] = useState([]);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keep the current date and time updated
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch all data using API service
        const response = await API.get('station/dashboard-data');
        
        // Update all state with fetched data
        setStationData(response.data.stationData);
        setTrainSchedule(response.data.trainSchedule);
        setPlatformData(response.data.platformData);
        setTrackingData(response.data.trackingData);
        setStaffData(response.data.staffData);
        setAnnouncements(response.data.announcements);
        setIncidents(response.data.incidents);
        setPlatformOccupancyData(response.data.platformOccupancyData);
        setWeatherData(response.data.weatherData);
      } catch (error) {
        console.error("Failed to fetch station dashboard data:", error);
        setError("Failed to load dashboard data. Please try again later.");
        
        // Use example data if API fails
        setExampleData();
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
    
    // Set up interval for real-time updates (every 30 seconds)
    const intervalId = setInterval(fetchDashboardData, 300000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Set example data if API fails
  const setExampleData = () => {
    // Station data
    setStationData({
      stationName: "Colombo Fort",
      stationId: "CMB001",
      arrivingTrainsToday: 42,
      departingTrainsToday: 38,
      platformOccupancy: 75,
      delayedTrains: 5,
      emergencyAlerts: 1,
      platforms: 8
    });

    // Train schedule data
    setTrainSchedule([
      {
        id: "EXP101",
        name: "Colombo Express",
        arrival: "10:15",
        departure: "10:30",
        status: "On Time",
        platform: 2,
        delay: 0,
        type: "Express"
      },
      {
        id: "INT202",
        name: "Kandy Intercity",
        arrival: "11:00",
        departure: "11:15",
        status: "Delayed",
        platform: 1,
        delay: 15,
        type: "Intercity"
      },
      {
        id: "LOC303",
        name: "Galle Local",
        arrival: "10:45",
        departure: "11:00",
        status: "On Time",
        platform: 5,
        delay: 0,
        type: "Local"
      },
      {
        id: "EXP404",
        name: "Northern Express",
        arrival: "12:30",
        departure: "12:45",
        status: "Delayed",
        platform: 3,
        delay: 20,
        type: "Express"
      },
      {
        id: "LOC505",
        name: "Coastal Line",
        arrival: "13:15",
        departure: "13:25",
        status: "On Time",
        platform: 4,
        delay: 0,
        type: "Local"
      }
    ]);

    // Platform data
    setPlatformData([
      { platform: 1, train: "INT202", arrivalTime: "11:00", departureTime: "11:15", status: "Allocated" },
      { platform: 2, train: "EXP101", arrivalTime: "10:15", departureTime: "10:30", status: "Occupied" },
      { platform: 3, train: "EXP404", arrivalTime: "12:30", departureTime: "12:45", status: "Allocated" },
      { platform: 4, train: "LOC505", arrivalTime: "13:15", departureTime: "13:25", status: "Free" },
      { platform: 5, train: "LOC303", arrivalTime: "10:45", departureTime: "11:00", status: "Occupied" },
      { platform: 6, train: null, arrivalTime: null, departureTime: null, status: "Free" },
      { platform: 7, train: null, arrivalTime: null, departureTime: null, status: "Maintenance" },
      { platform: 8, train: null, arrivalTime: null, departureTime: null, status: "Free" }
    ]);

    // Tracking data
    setTrackingData([
      { id: "EXP101", lat: 6.9271, lng: 79.8612, eta: "On Platform", speed: 0 },
      { id: "INT202", lat: 6.9350, lng: 79.8500, eta: "5 min", speed: 45 },
      { id: "LOC303", lat: 6.9271, lng: 79.8612, eta: "On Platform", speed: 0 },
      { id: "EXP404", lat: 6.9100, lng: 79.8300, eta: "25 min", speed: 60 },
      { id: "LOC505", lat: 6.8900, lng: 79.8100, eta: "40 min", speed: 50 }
    ]);

    // Staff data
    setStaffData([
      { id: 1, name: "John Perera", role: "Station Master", shift: "Morning", contact: "0771234567" },
      { id: 2, name: "Amara Silva", role: "Ticket Inspector", shift: "Morning", contact: "0777654321" },
      { id: 3, name: "Raj Kumar", role: "Signal Operator", shift: "Morning", contact: "0778765432" },
      { id: 4, name: "Nimal Fernando", role: "Platform Manager", shift: "Morning", contact: "0776543210" },
      { id: 5, name: "Lakshmi Patel", role: "Customer Service", shift: "Evening", contact: "0775432109" }
    ]);

    // Announcements
    setAnnouncements([
      { id: 1, message: "Train EXP404 delayed by 20 minutes", time: "10:05", type: "Delay" },
      { id: 2, message: "Please keep your belongings with you at all times", time: "09:30", type: "General" }
    ]);

    // Incidents
    setIncidents([
      { id: 1, title: "Medical Emergency", description: "Passenger requiring medical assistance at Platform 3", status: "Resolved", time: "09:15", severity: "Medium" },
      { id: 2, title: "Signal Fault", description: "Technical issue with signals at north track", status: "In Progress", time: "08:45", severity: "High" }
    ]);

    // Platform occupancy data
    setPlatformOccupancyData([
      { name: '6-9 AM', occupancy: 65 },
      { name: '9-12 PM', occupancy: 82 },
      { name: '12-3 PM', occupancy: 78 },
      { name: '3-6 PM', occupancy: 87 },
      { name: '6-9 PM', occupancy: 90 },
      { name: '9-12 AM', occupancy: 45 },
    ]);
  };

  const handleLogout = () => {
    localStorage.clear();
    // Dispatch custom event to update navbar
    window.dispatchEvent(new Event('userTypeChanged'));
    navigate("/");
  };

  const handlePlatformChange = async (platformNum, newData) => {
    try {
      // Update platform allocation via API
      await API.put(`station/platform/${platformNum}`, newData);
      
      // Update local state
      setPlatformData(platformData.map(p => 
        p.platform === platformNum ? {...p, ...newData} : p
      ));
    } catch (error) {
      console.error("Failed to update platform:", error);
      alert("Failed to update platform. Please try again.");
    }
  };

  const addAnnouncement = async (announcement) => {
    try {
      // Send announcement to API
      const response = await API.post('station/announcements', announcement);
      
      // Update local state with response data
      setAnnouncements([response.data, ...announcements]);
    } catch (error) {
      console.error("Failed to create announcement:", error);
      
      // Fallback to local state update if API fails
      setAnnouncements([
        { 
          id: announcements.length + 1, 
          message: announcement.message,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          type: announcement.type
        },
        ...announcements
      ]);
    }
  };

  const addIncident = async (incident) => {
    try {
      // Send incident to API
      const response = await API.post('station/incidents', incident);
      
      // Update local state with response data
      setIncidents([response.data, ...incidents]);
    } catch (error) {
      console.error("Failed to report incident:", error);
      
      // Fallback to local state update if API fails
      setIncidents([
        {
          id: incidents.length + 1,
          title: incident.title,
          description: incident.description,
          status: "Reported",
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          severity: incident.severity
        },
        ...incidents
      ]);
    }
  };

  // Function to filter trains by search term
  const filteredTrains = trainSchedule.filter(train => 
    train.id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    train.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formattedDate = currentDateTime.toLocaleString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleString('en-US', { 
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"} items`}>
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
            <Link to="/stationTransaction" className="menu-item">
              <FiDatabase size={20} /> {isSidebarOpen && "Transactions"}
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
        {/* Loading State */}
        {loading && (
          <div className="loading-overlay">
            <div className="loader"></div>
            <p>Loading dashboard data...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="error-message">
            <FiAlertOctagon size={24} />
            <p>{error}</p>
            <button className="btn" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        )}

        {/* Station Header with Controls */}
        <div className="station-header">
          <div className="station-info">
            <h1>{stationData.stationName} <span className="station-id">#{stationData.stationId}</span></h1>
            <p className="datetime">{formattedDate} • {formattedTime}</p>
          </div>
          <div className="weather-widget">
            <span className="weather-icon">{weatherData.icon}</span>
            <span className="weather-temp">{weatherData.temp}</span>
            <span className="weather-cond">{weatherData.condition}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={currentTab === 'overview' ? 'active' : ''} 
            onClick={() => setCurrentTab('overview')}
          >
            <FiClipboard /> Dashboard Overview
          </button>
          <button 
            className={currentTab === 'schedule' ? 'active' : ''} 
            onClick={() => setCurrentTab('schedule')}
          >
            <FiClock /> Train Schedule
          </button>
          <button 
            className={currentTab === 'platforms' ? 'active' : ''} 
            onClick={() => setCurrentTab('platforms')}
          >
            <FiMapPin /> Platform Management
          </button>
          <button 
            className={currentTab === 'tracking' ? 'active' : ''} 
            onClick={() => setCurrentTab('tracking')}
          >
            <FiMap /> Live Tracking
          </button>
          <button 
            className={currentTab === 'trainDetails' ? 'active' : ''} 
            onClick={() => setCurrentTab('trainDetails')}
          >
            <FiSearch /> Train Lookup
          </button>
          <button 
            className={currentTab === 'announcements' ? 'active' : ''} 
            onClick={() => setCurrentTab('announcements')}
          >
            <FiMic /> Announcements
          </button>
          <button 
            className={currentTab === 'staff' ? 'active' : ''} 
            onClick={() => setCurrentTab('staff')}
          >
            <FiUserCheck /> Staff Coordination
          </button>
          <button 
            className={currentTab === 'incidents' ? 'active' : ''} 
            onClick={() => setCurrentTab('incidents')}
          >
            <FiAlertOctagon /> Incident Reports
          </button>
          <button 
            className={currentTab === 'reports' ? 'active' : ''} 
            onClick={() => setCurrentTab('reports')}
          >
            <FiBarChart2 /> Reports
          </button>
          <button 
            className={currentTab === 'tools' ? 'active' : ''} 
            onClick={() => setCurrentTab('tools')}
          >
            <FiTool /> Tools & Settings
          </button>
        </div>

        {/* Tab Content based on selection */}
        <div className="tab-content">
          {/* 1. Dashboard Overview */}
          {currentTab === 'overview' && (
            <div className="dashboard-overview">
              <div className="stats-grid">
                <div className="stat-card arriving">
                  <h3>Trains Arriving Today</h3>
                  <div className="stat-value">{stationData.arrivingTrainsToday}</div>
                </div>
                <div className="stat-card departing">
                  <h3>Trains Departing Today</h3>
                  <div className="stat-value">{stationData.departingTrainsToday}</div>
                </div>
                <div className="stat-card occupancy">
                  <h3>Platform Occupancy</h3>
                  <div className="stat-value">{stationData.platformOccupancy}%</div>
                </div>
                <div className="stat-card delayed">
                  <h3>Delayed Trains</h3>
                  <div className="stat-value">{stationData.delayedTrains}</div>
                </div>
              </div>

              <div className="emergency-alerts">
                <h3><FiAlertOctagon /> Emergency Alerts</h3>
                {stationData.emergencyAlerts > 0 ? (
                  <div className="alert alert-danger">
                    <strong>Medical emergency at Platform 3</strong>
                    <p>Passenger requiring medical assistance. Medical team dispatched.</p>
                    <div className="alert-actions">
                      <button>View Details</button>
                      <button className="danger">Escalate</button>
                    </div>
                  </div>
                ) : (
                  <div className="no-alerts">No current emergency alerts</div>
                )}
              </div>

              <div className="overview-panels">
                <div className="next-arrivals panel">
                  <h3>Next Arrivals</h3>
                  <table className="mini-table">
                    <thead>
                      <tr>
                        <th>Train</th>
                        <th>Time</th>
                        <th>Platform</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainSchedule.slice(0, 3).map(train => (
                        <tr key={train.id}>
                          <td>{train.id} - {train.name}</td>
                          <td>{train.arrival}</td>
                          <td>{train.platform}</td>
                          <td className={train.status === "On Time" ? "on-time" : "delayed"}>
                            {train.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="next-departures panel">
                  <h3>Next Departures</h3>
                  <table className="mini-table">
                    <thead>
                      <tr>
                        <th>Train</th>
                        <th>Time</th>
                        <th>Platform</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainSchedule.slice(0, 3).map(train => (
                        <tr key={train.id}>
                          <td>{train.id} - {train.name}</td>
                          <td>{train.departure}</td>
                          <td>{train.platform}</td>
                          <td className={train.status === "On Time" ? "on-time" : "delayed"}>
                            {train.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="platform-usage panel">
                <h3>Platform Occupancy Timeline</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={platformOccupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="occupancy" name="Occupancy %" fill="#4a90e2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* 2. Train Schedule */}
          {currentTab === 'schedule' && (
            <div className="schedule-container">
              <div className="schedule-controls">
                <div className="search-box">
                  <FiSearch />
                  <input 
                    type="text" 
                    placeholder="Search train by ID or name..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-controls">
                  <select defaultValue="all">
                    <option value="all">All Trains</option>
                    <option value="arriving">Arriving</option>
                    <option value="departing">Departing</option>
                    <option value="delayed">Delayed</option>
                  </select>
                  <select defaultValue="24hours">
                    <option value="12hours">Next 12 Hours</option>
                    <option value="24hours">Next 24 Hours</option>
                    <option value="today">Today</option>
                  </select>
                </div>
              </div>

              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Train ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Arrival</th>
                    <th>Departure</th>
                    <th>Platform</th>
                    <th>Status</th>
                    <th>Delay</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrains.map(train => (
                    <tr key={train.id} className={train.status !== "On Time" ? "delayed-row" : ""}>
                      <td>{train.id}</td>
                      <td>{train.name}</td>
                      <td>{train.type}</td>
                      <td>{train.arrival}</td>
                      <td>{train.departure}</td>
                      <td>{train.platform}</td>
                      <td className={train.status === "On Time" ? "on-time" : "delayed"}>
                        {train.status}
                      </td>
                      <td>{train.delay > 0 ? `${train.delay} min` : '-'}</td>
                      <td className="actions">
                        <button className="action-btn" title="Announce">
                          <FiBell />
                        </button>
                        <button className="action-btn" title="View Details">
                          <FiSearch />
                        </button>
                        <button className="action-btn" title="Update Status">
                          <FiClock />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 3. Platform Management */}
          {currentTab === 'platforms' && (
            <div className="platforms-container">
              <div className="platform-status">
                <h3>Current Platform Status</h3>
                <div className="platform-grid">
                  {platformData.map(platform => (
                    <div 
                      key={platform.platform} 
                      className={`platform-card ${platform.status.toLowerCase()}`}
                    >
                      <h4>Platform {platform.platform}</h4>
                      <div className="platform-details">
                        {platform.train ? (
                          <>
                            <p className="train-id">{platform.train}</p>
                            <p>Arrival: {platform.arrivalTime}</p>
                            <p>Departure: {platform.departureTime}</p>
                          </>
                        ) : (
                          <p className="no-train">
                            {platform.status === "Maintenance" ? "Under Maintenance" : "No Train Assigned"}
                          </p>
                        )}
                      </div>
                      <div className="platform-actions">
                        <button className="btn" onClick={() => handlePlatformChange(platform.platform, {status: 'Reassigned'})}>
                          Reassign
                        </button>
                        <button className="btn">Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="platform-timeline">
                <h3>Platform Timeline (Next 6 Hours)</h3>
                <div className="timeline-chart">
                  {/* Simplified Gantt chart representation */}
                  <div className="timeline-header">
                    <div className="timeline-platform-label">Platform</div>
                    <div className="timeline-hours">
                      <span>Now</span>
                      <span>+1h</span>
                      <span>+2h</span>
                      <span>+3h</span>
                      <span>+4h</span>
                      <span>+5h</span>
                      <span>+6h</span>
                    </div>
                  </div>
                  {platformData.map(platform => (
                    <div key={platform.platform} className="timeline-row">
                      <div className="timeline-platform-number">P-{platform.platform}</div>
                      <div className="timeline-slots">
                        {/* This would be dynamically generated based on schedule */}
                        {platform.train && (
                          <div 
                            className={`timeline-train ${platform.status.toLowerCase()}`}
                            style={{ 
                              width: '120px', 
                              left: '50px'
                            }}
                          >
                            {platform.train}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="platform-management">
                <h3>Platform Management Tools</h3>
                <div className="management-actions">
                  <div className="action-group">
                    <h4>Quick Actions</h4>
                    <button className="btn">Reassign Platform</button>
                    <button className="btn">Mark Platform Unavailable</button>
                    <button className="btn">Send Platform Alert</button>
                  </div>
                  <div className="action-group">
                    <h4>Platform Settings</h4>
                    <button className="btn">Configure Defaults</button>
                    <button className="btn">Platform Capacity</button>
                    <button className="btn">Maintenance Schedule</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Live Train Tracking */}
          {currentTab === 'tracking' && (
            <div className="tracking-container">
              <div className="tracking-header">
                <h3>Live Train Tracking</h3>
                <div className="tracking-legend">
                  <span className="legend-item on-platform"><span className="dot"></span>On Platform</span>
                  <span className="legend-item approaching"><span className="dot"></span>Approaching (&lt;15 min)</span>
                  <span className="legend-item en-route"><span className="dot"></span>En Route</span>
                  <span className="legend-item delayed"><span className="dot"></span>Delayed</span>
                </div>
              </div>

              <div className="map-container">
                {/* For demo purposes. In a real app, you'd use a proper map */}
                <div className="map-placeholder">
                  <p>Station location is at 6.9271, 79.8612</p>
                  <p>Real implementation would use the MapContainer from react-leaflet here</p>
                  <p>Or integrate with your GPS tracking system</p>
                </div>
                {/* Uncomment and use actual map component in real implementation */}
                {/* 
                <MapContainer 
                  center={[6.9271, 79.8612]} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {trackingData.map(train => (
                    <Marker 
                      key={train.id}
                      position={[train.lat, train.lng]}
                    >
                      <Popup>
                        {train.id} - {train.eta}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
                */}
              </div>

              <div className="tracking-info">
                <table className="tracking-table">
                  <thead>
                    <tr>
                      <th>Train ID</th>
                      <th>Current Location</th>
                      <th>Speed</th>
                      <th>ETA</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trackingData.map(train => {
                      const scheduledTrain = trainSchedule.find(t => t.id === train.id);
                      return (
                        <tr key={train.id}>
                          <td>{train.id}</td>
                          <td>{train.eta === "On Platform" ? "At Station" : `${train.lat}, ${train.lng}`}</td>
                          <td>{train.speed} km/h</td>
                          <td>{train.eta}</td>
                          <td className={scheduledTrain?.status === "On Time" ? "on-time" : "delayed"}>
                            {scheduledTrain?.status || "Unknown"}
                          </td>
                          <td className="actions">
                            <button className="action-btn" title="Center on Map">
                              <FiMap />
                            </button>
                            <button className="action-btn" title="Details">
                              <FiSearch />
                            </button>
                            <button className="action-btn" title="Announce">
                              <FiBell />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. Train Details Lookup */}
          {currentTab === 'trainDetails' && (
            <div className="train-details-container">
              <div className="train-lookup">
                <h3>Train Lookup</h3>
                <div className="search-controls">
                  <div className="search-box">
                    <input type="text" placeholder="Enter train number or name" />
                    <button className="btn search-btn">
                      <FiSearch /> Search
                    </button>
                  </div>
                  <div className="recent-searches">
                    <h4>Recent Searches:</h4>
                    <div className="search-tags">
                      <span className="search-tag">EXP101</span>
                      <span className="search-tag">INT202</span>
                      <span className="search-tag">LOC303</span>
                    </div>
                  </div>
                </div>

                <div className="train-details">
                  <div className="train-header">
                    <h3>EXP101 - Colombo Express</h3>
                    <span className="train-type express">Express</span>
                  </div>

                  <div className="train-info-grid">
                    <div className="info-card">
                      <h4>Route</h4>
                      <p><strong>From:</strong> Colombo Fort</p>
                      <p><strong>To:</strong> Kandy</p>
                      <p><strong>Via:</strong> Gampaha, Peradeniya</p>
                    </div>
                    <div className="info-card">
                      <h4>Schedule</h4>
                      <p><strong>Departure:</strong> 10:30</p>
                      <p><strong>Arrival at Destination:</strong> 13:15</p>
                      <p><strong>Platform:</strong> 2</p>
                    </div>
                    <div className="info-card">
                      <h4>Coach Composition</h4>
                      <div className="coach-layout">
                        <span className="coach engine">ENG</span>
                        <span className="coach first">1FC</span>
                        <span className="coach ac">AC1</span>
                        <span className="coach ac">AC2</span>
                        <span className="coach sleeper">SL1</span>
                        <span className="coach general">GN1</span>
                        <span className="coach general">GN2</span>
                      </div>
                    </div>
                    <div className="info-card">
                      <h4>Passenger Count</h4>
                      <div className="passenger-stats">
                        <div className="stat">
                          <span className="number">127</span>
                          <span className="label">Total</span>
                        </div>
                        <div className="stat">
                          <span className="number">85%</span>
                          <span className="label">Capacity</span>
                        </div>
                        <div className="stat">
                          <span className="number">23</span>
                          <span className="label">Boarding</span>
                        </div>
                        <div className="stat">
                          <span className="number">31</span>
                          <span className="label">Alighting</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="train-actions">
                    <button className="btn"><FiBell /> Announce</button>
                    <button className="btn"><FiMapPin /> Track</button>
                    <button className="btn"><FiFileText /> View Report</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. Announcement Panel */}
          {currentTab === 'announcements' && (
            <div className="announcements-container">
              <div className="create-announcement">
                <h3>Create New Announcement</h3>
                <div className="announcement-form">
                  <div className="form-group">
                    <label>Type</label>
                    <select>
                      <option value="general">General</option>
                      <option value="trainSpecific">Train Specific</option>
                      <option value="delay">Delay</option>
                      <option value="platform">Platform Change</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Select Train (optional)</label>
                    <select>
                      <option value="">All Trains</option>
                      {trainSchedule.map(train => (
                        <option key={train.id} value={train.id}>
                          {train.id} - {train.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Announcement Message</label>
                    <textarea rows="4" placeholder="Type announcement message..."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Announcement Language</label>
                    <div className="language-options">
                      <label>
                        <input type="checkbox" checked readOnly />
                        English
                      </label>
                      <label>
                        <input type="checkbox" />
                        Sinhala
                      </label>
                      <label>
                        <input type="checkbox" />
                        Tamil
                      </label>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="btn preview-btn">Preview</button>
                    <button className="btn announce-btn" onClick={() => addAnnouncement({
                      message: "New test announcement",
                      type: "General"
                    })}>Make Announcement</button>
                  </div>
                </div>
              </div>

              <div className="auto-announcements">
                <h3>Auto Announcements</h3>
                <div className="auto-settings">
                  <label>
                    <input type="checkbox" checked />
                    Train arrivals (5 min before)
                  </label>
                  <label>
                    <input type="checkbox" checked />
                    Train departures (10 min before)
                  </label>
                  <label>
                    <input type="checkbox" checked />
                    Platform changes
                  </label>
                  <label>
                    <input type="checkbox" />
                    Delay updates
                  </label>
                </div>
              </div>

              <div className="announcement-history">
                <h3>Recent Announcements</h3>
                <table className="announcement-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Message</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.map(announcement => (
                      <tr key={announcement.id}>
                        <td>{announcement.time}</td>
                        <td>{announcement.type}</td>
                        <td>{announcement.message}</td>
                        <td className="actions">
                          <button className="action-btn" title="Repeat Announcement">
                            <FiMic />
                          </button>
                          <button className="action-btn" title="Edit">
                            <FiEdit />
                          </button>
                          <button className="action-btn" title="Delete">
                            <FiTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. Staff Coordination Panel */}
          {currentTab === 'staff' && (
            <div className="staff-container">
              <h3>Staff Roster</h3>
              <table className="staff-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Shift</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffData.map(staff => (
                    <tr key={staff.id}>
                      <td>{staff.name}</td>
                      <td>{staff.role}</td>
                      <td>{staff.shift}</td>
                      <td>{staff.contact}</td>
                      <td>On Duty</td>
                      <td className="actions">
                        <button className="action-btn" title="Call">
                          <FiPhone />
                        </button>
                        <button className="action-btn" title="Message">
                          <FiMail />
                        </button>
                        <button className="action-btn" title="Edit">
                          <FiEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="staff-management">
                <h3>Shift Management</h3>
                <div className="calendar-container">
                  <Calendar />
                </div>
                <div className="shift-actions">
                  <button className="btn">Assign Shift</button>
                  <button className="btn">Request Staff</button>
                  <button className="btn">View All Staff</button>
                </div>
              </div>
            </div>
          )}
          
          {/* 8. Incident Reporting */}
          {currentTab === 'incidents' && (
            <div className="incidents-container">
              <div className="report-incident">
                <h3>Report New Incident</h3>
                <div className="incident-form">
                  <div className="form-group">
                    <label>Incident Type</label>
                    <select>
                      <option>Medical Emergency</option>
                      <option>Security Issue</option>
                      <option>Technical Problem</option>
                      <option>Signal Fault</option>
                      <option>Passenger Issue</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Brief description of incident" />
                  </div>
                  <div className="form-group">
                    <label>Details</label>
                    <textarea rows="4" placeholder="Describe the incident in detail..."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <select>
                      <option>Platform 1</option>
                      <option>Platform 2</option>
                      <option>Platform 3</option>
                      <option>Platform 4</option>
                      <option>Platform 5</option>
                      <option>Platform 6</option>
                      <option>Platform 7</option>
                      <option>Platform 8</option>
                      <option>Ticket Counter</option>
                      <option>Waiting Area</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Severity</label>
                    <select>
                      <option value="Low">Low - No immediate action needed</option>
                      <option value="Medium">Medium - Requires attention soon</option>
                      <option value="High">High - Urgent attention required</option>
                      <option value="Critical">Critical - Emergency response needed</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button className="btn" onClick={() => addIncident({
                      title: "Test incident",
                      description: "This is a test incident report",
                      severity: "Medium"
                    })}>Report Incident</button>
                    <button className="btn danger">Emergency Alert</button>
                  </div>
                </div>
              </div>

              <div className="incident-history">
                <h3>Recent Incidents</h3>
                <table className="incident-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Time</th>
                      <th>Title</th>
                      <th>Severity</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incidents.map(incident => (
                      <tr key={incident.id}>
                        <td>{incident.id}</td>
                        <td>{incident.time}</td>
                        <td>{incident.title}</td>
                        <td className={`severity-${incident.severity.toLowerCase()}`}>{incident.severity}</td>
                        <td className={
                          incident.status === "Resolved" ? "status-resolved" :
                          incident.status === "In Progress" ? "status-inprogress" :
                          "status-reported"
                        }>
                          {incident.status}
                        </td>
                        <td className="actions">
                          <button className="action-btn" title="View Details">
                            <FiSearch />
                          </button>
                          <button className="action-btn" title="Update Status">
                            <FiEdit />
                          </button>
                          <button className="action-btn" title="Alert Staff">
                            <FiBell />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* 9. Daily Reports */}
          {currentTab === 'reports' && (
            <div className="reports-container">
              <div className="report-controls">
                <h3>Daily Performance Reports</h3>
                <div className="report-filters">
                  <div className="date-picker">
                    <label>Date:</label>
                    <input type="date" value="2025-05-15" />
                  </div>
                  <div className="report-actions">
                    <button className="btn">Generate Report</button>
                    <button className="btn">Export PDF</button>
                    <button className="btn">Export CSV</button>
                  </div>
                </div>
              </div>
              
              <div className="report-metrics">
                <div className="metric-card">
                  <h4>Trains Handled</h4>
                  <div className="metric-value">52</div>
                  <div className="metric-change positive">+2 from yesterday</div>
                </div>
                <div className="metric-card">
                  <h4>On-Time Performance</h4>
                  <div className="metric-value">94%</div>
                  <div className="metric-change positive">+1% from yesterday</div>
                </div>
                <div className="metric-card">
                  <h4>Avg. Delay</h4>
                  <div className="metric-value">12 min</div>
                  <div className="metric-change negative">+3 min from yesterday</div>
                </div>
                <div className="metric-card">
                  <h4>Platform Utilization</h4>
                  <div className="metric-value">76%</div>
                  <div className="metric-change positive">+3% from yesterday</div>
                </div>
              </div>
              
              <div className="report-charts">
                <div className="chart-panel">
                  <h4>On-Time Performance (Last 7 Days)</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                      data={[
                        { day: "Mon", value: 92 },
                        { day: "Tue", value: 88 },
                        { day: "Wed", value: 91 },
                        { day: "Thu", value: 87 },
                        { day: "Fri", value: 94 },
                        { day: "Sat", value: 96 },
                        { day: "Sun", value: 94 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#4a90e2" name="On-Time %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="delay-summary">
                  <h4>Delay Causes Summary</h4>
                  <table className="mini-table">
                    <thead>
                      <tr>
                        <th>Cause</th>
                        <th>Incidents</th>
                        <th>Total Delay</th>
                        <th>Avg. Delay</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Signal Fault</td>
                        <td>1</td>
                        <td>25 min</td>
                        <td>25 min</td>
                      </tr>
                      <tr>
                        <td>Technical Issue</td>
                        <td>2</td>
                        <td>35 min</td>
                        <td>17.5 min</td>
                      </tr>
                      <tr>
                        <td>Weather Conditions</td>
                        <td>1</td>
                        <td>18 min</td>
                        <td>18 min</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* 10. Tools & Settings */}
          {currentTab === 'tools' && (
            <div className="tools-container">
              <h3>Tools & Settings</h3>
              <div className="settings-panel">
                <div className="setting-section">
                  <h4>Station Settings</h4>
                  <div className="setting-group">
                    <label>Default Platform for Express Trains</label>
                    <select>
                      <option>Platform 1</option>
                      <option>Platform 2</option>
                      <option selected>Platform 3</option>
                      <option>Platform 4</option>
                    </select>
                  </div>
                  <div className="setting-group">
                    <label>Default Platform for Local Trains</label>
                    <select>
                      <option selected>Platform 5</option>
                      <option>Platform 6</option>
                      <option>Platform 7</option>
                      <option>Platform 8</option>
                    </select>
                  </div>
                  <div className="setting-group">
                    <label>Minimum Platform Clearance Time</label>
                    <select>
                      <option>5 minutes</option>
                      <option selected>10 minutes</option>
                      <option>15 minutes</option>
                      <option>20 minutes</option>
                    </select>
                  </div>
                </div>
                
                <div className="setting-section">
                  <h4>Notification Settings</h4>
                  <div className="setting-group checkbox">
                    <label>
                      <input type="checkbox" checked readOnly />
                      Receive alerts for train delays
                    </label>
                  </div>
                  <div className="setting-group checkbox">
                    <label>
                      <input type="checkbox" checked readOnly />
                      Receive alerts for platform changes
                    </label>
                  </div>
                  <div className="setting-group checkbox">
                    <label>
                      <input type="checkbox" checked readOnly />
                      Receive alerts for emergency incidents
                    </label>
                  </div>
                </div>
                
                <div className="setting-section">
                  <h4>Emergency Contacts</h4>
                  <div className="contact-list">
                    <div className="contact-item">
                      <div className="contact-role">Railway Control</div>
                      <div className="contact-number">011-2695722</div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-role">Emergency Services</div>
                      <div className="contact-number">119</div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-role">Medical Services</div>
                      <div className="contact-number">110</div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-role">IT Support</div>
                      <div className="contact-number">011-2698755</div>
                    </div>
                  </div>
                </div>
                
                <div className="settings-actions">
                  <button className="btn">Save Settings</button>
                  <button className="btn">Reset to Default</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StationDashboard;