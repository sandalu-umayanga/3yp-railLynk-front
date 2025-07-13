
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import API from '../api';
import '../styles/liveTracking.css';

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
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18]

});

const stationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',

  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

// Component to auto-update map bounds
function FitBounds({ bounds }) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);
  
  return null;
}

function LiveTracking({ trainId }) {
  const [railwayData, setRailwayData] = useState(null);
  const [trainPosition, setTrainPosition] = useState(null);
  const [stations, setStations] = useState([]);
  const [trainPath, setTrainPath] = useState([]);
  const [eta, setEta] = useState(null);
  const [nextStation, setNextStation] = useState(null);
  const [bounds, setBounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pollingRef = useRef(null);
  const POLLING_INTERVAL = 10000; // Poll every 10 seconds

  // Load initial railway data from API
  useEffect(() => {
    const fetchRailwayData = async () => {
      try {
        // Validate trainId before making the API call
        if (!trainId) {
          setError("No train ID provided");
          setLoading(false);
          return;
        }
        
        console.log("Fetching train details for:", trainId);
        
        const response = await API.post(`find/train/details/`, {
          train_id: trainId,
          train_name: trainId
        });
        
        const data = response.data;
        console.log("Train data received:", data);
        
        if (data.stations && data.train_location) {
          // Parse train location from string
          const [lat, lng] = data.train_location.split(',').map(coord => parseFloat(coord.trim()));
          setTrainPosition([lat, lng]);
          
          // Create station markers from API data
          const stationsData = data.stations.map(station => ({
            id: station.station_id,
            name: station.station_name,
            position: [station.lat, station.lon],
            sequence: station.sequence
          }));
          setStations(stationsData);
          
          // Create path from station coordinates, sorted by sequence
          const sortedStations = [...stationsData].sort((a, b) => a.sequence - b.sequence);
          const path = sortedStations.map(station => station.position);
          setTrainPath(path);
          
          // Calculate bounds to fit all elements
          setBounds(path);
          
          // Determine next station
          const currentStationIndex = findCurrentStationIndex(stationsData, [lat, lng]);
          if (currentStationIndex < stationsData.length - 1) {
            const next = stationsData[currentStationIndex + 1];
            setNextStation(next.name);
            
            // Simple ETA calculation
            const now = new Date();
            now.setMinutes(now.getMinutes() + Math.floor(Math.random() * 10) + 5);
            setEta(now.toLocaleTimeString());
          } else if (data.last_station) {
            setNextStation(data.last_station.station_name + " (Destination)");
            setEta("Arriving");
          }
        } else {
          setError("Incomplete train data received");
        }
      } catch (err) {
        console.error('Error loading railway data:', err);
        setError('Failed to load train data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRailwayData();
  }, [trainId]);

  // Helper function to find closest station index
  const findCurrentStationIndex = (stations, position) => {
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    stations.forEach((station, index) => {
      const distance = calculateDistance(position, station.position);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    return closestIndex;
  };
  
  // Simple distance calculation
  const calculateDistance = (pos1, pos2) => {
    const [lat1, lon1] = pos1;
    const [lat2, lon2] = pos2;
    return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
  };

  // Poll train position updates
  useEffect(() => {
    if (!trainId || trainPath.length === 0) return;
    
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }
    
    const fetchTrainPosition = async () => {
      try {
        const response = await API.post(`find/train/details/`, {
          train_id: trainId,
          train_name: trainId
        });
        
        const data = response.data;
        
        if (data.train_location) {
          const [lat, lng] = data.train_location.split(',').map(coord => parseFloat(coord.trim()));
          setTrainPosition([lat, lng]);
          
          if (data.stations) {
            const stationsData = data.stations.map(station => ({
              id: station.station_id,
              name: station.station_name,
              position: [station.lat, station.lon],
              sequence: station.sequence
            }));
            
            const currentStationIndex = findCurrentStationIndex(stationsData, [lat, lng]);
            if (currentStationIndex < stationsData.length - 1) {
              const next = stationsData[currentStationIndex + 1];
              setNextStation(next.name);
              
              const now = new Date();
              now.setMinutes(now.getMinutes() + Math.floor(Math.random() * 10) + 5);
              setEta(now.toLocaleTimeString());
            } else if (data.last_station) {
              setNextStation(data.last_station.station_name + " (Destination)");
              setEta("Arriving");
            }
          }
        }
      } catch (err) {
        console.error('Error fetching train position:', err);
        // Just log the error, don't use fallback data
      }
    };
    
    fetchTrainPosition();
    pollingRef.current = setInterval(fetchTrainPosition, POLLING_INTERVAL);
    
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [trainId, trainPath, stations]);

  if (loading) {
    return <div className="loading-indicator">Loading train data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // If we have no data after loading, show an appropriate message
  if (!trainPosition || stations.length === 0 || trainPath.length === 0) {
    return <div className="error-message">No train data available. Please try again later.</div>;
  }

  return (
    <div className="live-tracking-container">
      <div className="tracking-info">
        <div>Train: <span>{trainId}</span></div>
        {nextStation && <div>Next: <span>{nextStation}</span></div>}
        {eta && <div>ETA: <span>{eta}</span></div>}
      </div>
      
      <div className="map-container">
        <MapContainer
          center={trainPosition || [7.8731, 80.7718]}
          zoom={8}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {trainPath.length > 0 && (
            <Polyline 
              positions={trainPath} 
              color="#3b82f6" 
              weight={4} 
              opacity={0.7}
            />
          )}
          
          {stations.map(station => (
            <Marker 
              key={station.id} 
              position={station.position}
              icon={stationIcon}
            >
              <Popup>
                <div className="popup-content">
                  <strong>{station.name}</strong>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {trainPosition && (
            <Marker 
              position={trainPosition} 
              icon={trainIcon}
              className="train-icon-animated"
            >
              <Popup>
                <div className="popup-content">
                  <strong>Train: {trainId}</strong>
                  {nextStation && <div>Next: {nextStation}</div>}
                  {eta && <div>ETA: {eta}</div>}
                </div>
              </Popup>
            </Marker>
          )}
          
          <FitBounds bounds={bounds} />
        </MapContainer>

      </div>
    </div>
  );
}


export default LiveTracking;

