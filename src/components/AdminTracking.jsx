import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import API from '../api';
import '../styles/adminTracking.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const trainIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3066/3066259.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

const stationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

// Component to auto-update map bounds only on initial load
function FitBounds({ bounds, shouldFit }) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds && bounds.length > 0 && shouldFit) {
      map.fitBounds(bounds);
    }
  }, [bounds, map, shouldFit]);
  
  return null;
}

function AdminTracking() {
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedTrainDetails, setSelectedTrainDetails] = useState(null);
  const [bounds, setBounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const pollingRef = useRef(null);
  const POLLING_INTERVAL = 10000; // Poll every 10 seconds

  // Fetch all stations using the correct API endpoint
  useEffect(() => {
    const fetchStations = async () => {
      try {
        // Using the proper station list endpoint
        const response = await API.get('station/list/');
        
        console.log("Station data response:", response.data);
        
        // Map with safety checks and unique IDs
        const stationsData = response.data.map((station, index) => ({
          id: station.station_id || `station-index-${index}`,
          name: station.station_name || `Station ${index + 1}`,
          position: [
            parseFloat(station.lat || 0), 
            parseFloat(station.lon || 0)
          ]
        }));
        
        setStations(stationsData);
      } catch (err) {
        console.error('Error loading stations:', err);
        // Set empty array instead of leaving as undefined
        setStations([]);
      }
    };
    
    fetchStations();
  }, []);

  // Load all train positions and set up polling
  useEffect(() => {
    const fetchAllTrains = async () => {
      try {
        setLoading(true);
        
        const response = await API.get('trains/locations/');
        console.log("All trains data:", response.data);
        
        const trainsData = response.data.map(train => ({
          name: train.train_name,
          position: train.location.split(',').map(coord => parseFloat(coord.trim()))
        }));
        
        setTrains(trainsData);
        
        // Calculate bounds to include all trains only on initial load
        if (isInitialLoad) {
          const allPositions = trainsData.map(train => train.position);
          if (allPositions.length > 0) {
            setBounds(allPositions);
          }
          setIsInitialLoad(false);
        }
        
        setError(null);
        setLastUpdated(new Date());
      } catch (err) {
        console.error('Error loading trains:', err);
        setError('Failed to load train data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    // Initial fetch
    fetchAllTrains();
    
    // Set up polling
    pollingRef.current = setInterval(fetchAllTrains, POLLING_INTERVAL);
    
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  // Fetch details for a selected train
  useEffect(() => {
    if (!selectedTrain) {
      setSelectedTrainDetails(null);
      return;
    }
    
    const fetchTrainDetails = async () => {
      try {
        const response = await API.post('find/train/details/', {
          train_name: selectedTrain
        });
        
        setSelectedTrainDetails(response.data);
      } catch (err) {
        console.error(`Error loading details for train ${selectedTrain}:`, err);
        // Just clear the selection on error
        setSelectedTrainDetails(null);
      }
    };
    
    fetchTrainDetails();
  }, [selectedTrain]);

  if (loading && trains.length === 0) {
    return <div className="loading-indicator">Loading train data...</div>;
  }

  if (error && trains.length === 0) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-tracking-container">
      <div className="admin-header">
        <h2>Railway Network - Live Train Tracking</h2>
        <div className="header-controls">
          <div className="train-count">
            Active Trains: <span>{trains.length}</span>
          </div>
          {lastUpdated && (
            <div className="last-updated">
              Last Updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          <button 
            className="reset-view-btn"
            onClick={() => {
              if (trains.length > 0) {
                const allPositions = trains.map(train => train.position);
                setBounds(allPositions);
                setIsInitialLoad(true); // Trigger bounds fitting
                setTimeout(() => setIsInitialLoad(false), 100); // Reset after fitting
              }
            }}
          >
            Reset View
          </button>
        </div>
      </div>
      
      <div className="admin-layout">
        <div className="train-list-container">
          <h3>Active Trains</h3>
          <ul className="train-list">
            {trains.map((train, index) => (
              <li 
                key={`train-${index}`}
                className={`train-item ${selectedTrain === train.name ? 'selected' : ''}`}
                onClick={() => setSelectedTrain(train.name)}
              >
                <div className="train-name">{train.name}</div>
                <div className="train-status">
                  <span className="status-indicator active"></span>
                  Running
                </div>
              </li>
            ))}
          </ul>
          
          {selectedTrainDetails && (
            <div className="train-details">
              <h4>Train Details</h4>
              <div className="detail-item">
                <strong>Train:</strong> {selectedTrainDetails.train_name}
              </div>
              {selectedTrainDetails.starting_station && (
                <div className="detail-item">
                  <strong>From:</strong> {selectedTrainDetails.starting_station.station_name}
                </div>
              )}
              {selectedTrainDetails.last_station && (
                <div className="detail-item">
                  <strong>To:</strong> {selectedTrainDetails.last_station.station_name}
                </div>
              )}
              {selectedTrainDetails.stations && (
                <div className="detail-item">
                  <strong>Stops:</strong> {selectedTrainDetails.stations.length}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="map-container">
          <MapContainer
            center={[7.8731, 80.7718]} // Center of Sri Lanka
            zoom={8}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Station Markers - Fixed the key issue */}
            {stations && stations.length > 0 && stations.map((station, index) => (
              <Marker 
                key={`station-${station.id || index}`}
                position={station.position}
                icon={stationIcon}
              >
                <Popup>
                  <div className="popup-content">
                    <strong>{station.name || `Station ${index + 1}`}</strong>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* Train Markers */}
            {trains.map((train, index) => (
              <Marker 
                key={`train-marker-${index}`}
                position={train.position}
                icon={trainIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedTrain(train.name);
                  },
                }}
                className={selectedTrain === train.name ? 'train-icon-highlighted' : 'train-icon-normal'}
              >
                <Popup>
                  <div className="popup-content">
                    <strong>{train.name}</strong>
                    <div>Click for more details</div>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* Selected Train Path */}
            {selectedTrainDetails && selectedTrainDetails.stations && (
              <Polyline
                positions={selectedTrainDetails.stations
                  .sort((a, b) => a.sequence - b.sequence)
                  .map(station => [station.lat, station.lon])}
                color="#ef4444"
                weight={4}
                opacity={0.7}
              />
            )}
            
            <FitBounds bounds={bounds} shouldFit={isInitialLoad} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminTracking;