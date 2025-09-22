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
import { STATION_ID } from "../constants";
// You'll need to install these packages:
// npm install react-calendar recharts leaflet react-leaflet

import Calendar from 'react-calendar';
import { 
  LineChart, Line, BarChart, Bar, ResponsiveContainer, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-calendar/dist/Calendar.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons for different train statuses
const trainIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2741/2741469.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const stationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

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
  const [stationStats, setStationStats] = useState(null); // New state for station statistics
const sampleStationData = {
  station_id: "STN001",
  station_name: "Colombo Fort",
  issued_today: 42,

  incoming_passengers: 120,
  top_incoming_sources: [
    { S_station: "Kandy", count: 30 },
    { S_station: "Galle", count: 25 },
    { S_station: "Matara", count: 20 },
    { S_station: "Kurunegala", count: 18 },
    { S_station: "Jaffna", count: 15 }
  ],

  outgoing_passengers: 95,
  top_outgoing_destinations: [
    { E_station: "Kandy", count: 22 },
    { E_station: "Anuradhapura", count: 20 },
    { E_station: "Badulla", count: 19 },
    { E_station: "Matale", count: 17 },
    { E_station: "Vavuniya", count: 17 }
  ],

  trains_through_station: [
    { train_name: "Ruhunu Kumari", location: "Kalutara", last_station: "Galle", route: "R01" },
    { train_name: "Udarata Menike", location: "Colombo Fort", last_station: "Kandy", route: "R02" },
    { train_name: "Yal Devi", location: "Colombo Fort", last_station: "Vavuniya", route: "R03" }
  ]
};

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

  useEffect(() => {
  const fetchStationStatistics = async () => {
    const stationId = localStorage.getItem(STATION_ID); // ✅ Get inside function

    if (!stationId) {
      setError("Station ID not found. Please log in again.");
      setStationStats(sampleStationData); // Show dummy data even without station ID
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await API.get(`station/statistics/${stationId}/`);
      
      // Check if response has valid data
      if (response.data && Object.keys(response.data).length > 0) {
        setStationStats(response.data);
      } else {
        // No data returned, use dummy data
        console.log("No station statistics data received, using dummy data");
        setStationStats(sampleStationData);
      }
    } catch (err) {
      console.error("Failed to fetch station statistics:", err);
      setError("API connection failed. Displaying sample data.");
      // Always show dummy data when API fails
      setStationStats(sampleStationData);
    } finally {
      setLoading(false);
    }
  };

  fetchStationStatistics();
  const interval = setInterval(fetchStationStatistics, 300000);
  return () => clearInterval(interval);
}, []);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch all data using API service
        const response = await API.get('station/dashboard-data');
        
        // Check if response has valid data
        if (response.data && Object.keys(response.data).length > 0) {
          // Update all state with fetched data
          setStationData(response.data.stationData || stationData);
          setTrainSchedule(response.data.trainSchedule || []);
          setPlatformData(response.data.platformData || []);
          setTrackingData(response.data.trackingData || []);
          setStaffData(response.data.staffData || []);
          setAnnouncements(response.data.announcements || []);
          setIncidents(response.data.incidents || []);
          setPlatformOccupancyData(response.data.platformOccupancyData || []);
          setWeatherData(response.data.weatherData || weatherData);
        } else {
          // No data returned, use dummy data
          console.log("No dashboard data received, using dummy data");
          setExampleData();
        }
      } catch (error) {
        console.error("Failed to fetch station dashboard data:", error);
        setError("API connection failed. Displaying sample data for demonstration.");
        
        // Always use example data if API fails
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

  // Separate useEffect for real-time tracking data
  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await API.get('station/live-tracking');
        
        if (response.data && response.data.length > 0) {
          setTrackingData(response.data);
        } else {
          // Keep existing dummy data if no real tracking data
          console.log("No live tracking data received, keeping existing data");
        }
      } catch (error) {
        console.error("Failed to fetch live tracking data:", error);
        // Keep existing dummy data on error
      }
    };
    
    // Initial fetch
    fetchTrackingData();
    
    // Set up interval for real-time updates every 15 seconds
    const trackingIntervalId = setInterval(fetchTrackingData, 15000);
    
    return () => clearInterval(trackingIntervalId);
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

    // Tracking data - All positions within Sri Lanka railway network
    setTrackingData([
      { id: "EXP101", lat: 6.9271, lng: 79.8612, eta: "On Platform", speed: 0 }, // Colombo Fort
      { id: "INT202", lat: 7.2906, lng: 80.6337, eta: "5 min", speed: 45 }, // Kandy
      { id: "LOC303", lat: 6.0329, lng: 80.2168, eta: "On Platform", speed: 0 }, // Galle
      { id: "EXP404", lat: 7.9403, lng: 81.0188, eta: "25 min", speed: 60 }, // Anuradhapura
      { id: "LOC505", lat: 6.8211, lng: 79.9553, eta: "40 min", speed: 50 } // Ragama
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
    String(train.id || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    String(train.name || '').toLowerCase().includes(searchTerm.toLowerCase())
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
        

        {/* Station Header with Controls */}
        {stationStats && (
        <div className="station-header">
          <div className="station-info">
            <h1>{stationStats.station_name} <span className="station-id">#{stationStats.station_id}</span></h1>
            <p className="datetime">{formattedDate} • {formattedTime}</p>
          </div>
          <div className="weather-widget">
            <span className="weather-icon">{weatherData.icon}</span>
            <span className="weather-temp">{weatherData.temp}</span>
            <span className="weather-cond">{weatherData.condition}</span>
          </div>
        </div>
        )};

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading dashboard data...</p>
          </div>
        )}

        {/* Error State with Dummy Data Notice */}
        {error && (
          <div className="error-notice">
            <div className="error-content">
              <FiAlertOctagon className="error-icon" />
              <div className="error-message">
                <h4>Using Demo Data</h4>
                <p>{error}</p>
                <small>The data shown below is sample data for demonstration purposes.</small>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={currentTab === 'overview' ? 'active' : ''} 
            onClick={() => setCurrentTab('overview')}
          >
            <FiClipboard /> Dashboard Overview
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
            className={currentTab === 'reports' ? 'active' : ''} 
            onClick={() => setCurrentTab('reports')}
          >
            <FiBarChart2 /> Reports
          </button>
        </div>

        {/* Tab Content based on selection */}
        {stationStats && (
        <div className="tab-content">
          {/* 1. Dashboard Overview */}
          {currentTab === 'overview' && (
            <div className="dashboard-overview">
              <div className="stats-grid">
                <div className="stat-card arriving">
                  <h3>Trains Arriving Today</h3>
                  <div className="stat-value">{stationStats.trains_through_station.length}</div>
                </div>
                <div className="stat-card departing">
                  <h3>Trains Departing Today</h3>
                  <div className="stat-value">{stationStats.trains_through_station.length}</div>
                </div>
                <div className="stat-card occupancy">
                  <h3>Platform Occupancy</h3>
                  <div className="stat-value">{stationData.platformOccupancy}%</div>
                </div>
                <div className="stat-card delayed">
                  <h3>Cards Issued Today</h3>
                  <div className="stat-value">{stationStats.issued_today}</div>
                </div>
                  <div className="stat-card delayed">
                  <h3>Incoming Passengers</h3>
                  <div className="stat-value">{stationStats.incoming_passengers}</div>
                </div>
                  <div className="stat-card delayed">
                  <h3>Outgoing Passengers</h3>
                  <div className="stat-value">{stationStats.outgoing_passengers}</div>
                </div>
              </div>
         
              <div className="overview-panels">
            <div className="next-arrivals panel">
              <h3>Top Incoming Sources</h3>
              <table className="mini-table">
                <thead>
                  <tr>
                    <th>Source Station</th>
                    <th>Passenger Count</th>
                  </tr>
                </thead>
                <tbody>
                  {stationStats.top_incoming_sources.map((source, index) => (
                    <tr key={index}>
                      <td>{source.S_station}</td>
                      <td>{source.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            <div className="overview-panels">
              <div className="next-arrivals panel">
                <h3>Top Outgoing Destinations</h3>
                <table className="mini-table">
                  <thead>
                    <tr>
                      <th>Destination Station</th>
                      <th>Passenger Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stationStats.top_outgoing_destinations.map((destination, index) => (
                      <tr key={index}>
                        <td>{destination.E_station}</td>
                        <td>{destination.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="overview-panels">
              <div className="next-arrivals panel">
                <h3>Trains Through Station</h3>
                <table className="mini-table">
                  <thead>
                    <tr>
                      <th>Train Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stationStats.trains_through_station.map((train, index) => (
                      <tr key={index}>
                        <td>{train.train_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

             <div className="platform-usage panel">
                <h3>Top Incoming Sources</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stationStats.top_incoming_sources}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="S_station" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#4CAF50" />
                    </BarChart>
                  </ResponsiveContainer>
              </div>

                <div className="platform-usage panel">
                <h3>Top Outgoing Sources</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stationStats.top_incoming_sources}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="S_station" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#4CAF50" />
                    </BarChart>
                  </ResponsiveContainer>
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
                <MapContainer 
                  center={[7.8731, 80.7718]} 
                  zoom={8} 
                  style={{ height: '400px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Station marker */}
                  <Marker 
                    position={[6.9271, 79.8612]}
                    icon={stationIcon}
                  >
                    <Popup>
                      <div>
                        <strong>{stationData.stationName}</strong><br/>
                        <small>Station ID: {stationData.stationId}</small>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Train markers */}
                  {trackingData.map(train => (
                    <Marker 
                      key={train.id}
                      position={[train.lat, train.lng]}
                      icon={trainIcon}
                    >
                      <Popup>
                        <div>
                          <strong>{train.id}</strong><br/>
                          ETA: {train.eta}<br/>
                          Speed: {train.speed} km/h<br/>
                          <small>Click to view details</small>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
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
          


        </div>
             )};
      </div>

      
    </div>
  );
};

export default StationDashboard;