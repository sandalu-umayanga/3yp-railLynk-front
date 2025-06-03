import { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  GeoJSON,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "../styles/liveTracking.css";

const trainIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61212.png',
  iconSize: [32, 32],
});

const stationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [16, 16], // Smaller
  iconAnchor: [8, 8], // Center the icon
  className: 'station-icon' // Add class for opacity
});


const STATION_STOP_DURATION = 30; // seconds
const POLLING_INTERVAL = 3000; // ms

function LiveTracking() {
  const [trainPath, setTrainPath] = useState([]);
  const [trainPosition, setTrainPosition] = useState(null);
  const [railwayData, setRailwayData] = useState(null);
  const [stations, setStations] = useState([]);
  const [eta, setEta] = useState(null);
  const [useDummy, setUseDummy] = useState(true);

  const markerRef = useRef(null);
  const trainIndexRef = useRef(0);
  const coordsRef = useRef([]);

  // Load GeoJSON
  useEffect(() => {
    fetch('/railways_with_dummy_line.geojson')
      .then(res => res.json())
      .then(data => {
        setRailwayData(data);

        const stationFeatures = data.features.filter(
          f => f.properties?.railway === 'station' && f.geometry?.type === 'Point'
        );

        const stationCoords = stationFeatures.map(f => ({
          name: f.properties.name || 'Unnamed',
          position: f.geometry.coordinates.slice().reverse(),
        }));
        setStations(stationCoords);

        const line = data.features.find(f => f.geometry?.type === 'LineString');
        if (line) {
          const coordinates = line.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          coordsRef.current = coordinates;
        }
      });
  }, []);

  // Poll backend
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/train-location') // Replace with your real endpoint
        .then(res => {
          if (!res.ok) throw new Error();
          setUseDummy(false);
          return res.json();
        })
        .then(data => {
          const { current_position, past_positions } = data;
          setTrainPosition(current_position);
          setTrainPath(past_positions);
          setEta(past_positions.length * STATION_STOP_DURATION);
        })
        .catch(() => {
          setUseDummy(true); // Use dummy animation if backend fails
        });
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Dummy mode animation
  useEffect(() => {
    if (!useDummy || coordsRef.current.length === 0) return;

    const interval = setInterval(() => {
      const coords = coordsRef.current;
      const i = trainIndexRef.current;
      const next = coords[i];

      setTrainPosition(next);
      setTrainPath(prev => {
        if (!prev.length || prev[prev.length - 1][0] !== next[0] || prev[prev.length - 1][1] !== next[1]) {
          return [...prev, next];
        }
        return prev;
      });

      const stopsRemaining = coords.length - i - 1;
      setEta(stopsRemaining * STATION_STOP_DURATION);

      trainIndexRef.current = (i + 1) % coords.length;
    }, 2000);

    return () => clearInterval(interval);
  }, [useDummy]);

  // Sync marker
  useEffect(() => {
    if (trainPosition && markerRef.current) {
      markerRef.current.setLatLng(trainPosition);
    }
  }, [trainPosition]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[7.2906, 80.6337]}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {railwayData && (
          <GeoJSON data={railwayData} style={{ color: '#555' }} />
        )}

        {stations.map((station, idx) => (
          <Marker key={idx} position={station.position} icon={stationIcon} />
        ))}

        {trainPosition && (
          <Marker position={trainPosition} icon={trainIcon} ref={markerRef} />
        )}

        {trainPath.length > 1 && (
          <Polyline positions={trainPath} pathOptions={{ color: 'red', weight: 4 }} />
        )}
      </MapContainer>

      <div className="info-panel">
        <h3>🚆 Live Train Tracker</h3>
        {trainPosition && (
          <p>
            📍 Location: {trainPosition[0].toFixed(4)}, {trainPosition[1].toFixed(4)}
          </p>
        )}
        {eta !== null && <p>⏱️ ETA to final station: ~{eta}s</p>}
        <p>📡 Mode: {useDummy ? 'Dummy Data' : 'Live API'}</p>
        <button onClick={() => setUseDummy(prev => !prev)}>
          Toggle Mode
        </button>
      </div>
    </div>
  );
}

export default LiveTracking;
