import { useEffect, useState } from 'react';
import LiveTracking from './LiveTracking';
import "../styles/passengerTrainTracking.css";
import API from "../api"; // Import the API utility

function PassengerTrainTracking() {
  const [stations, setStations] = useState([]);
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [availableTrains, setAvailableTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Fetch station list from backend using API utility
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await API.get('/station/list');
        console.log('Fetched stations:', response.data);
        const sorted = response.data.sort((a, b) =>
          a.station_name.localeCompare(b.station_name)
        );
        setStations(sorted);
      } catch (err) {
        console.error('Failed to load station list:', err);
        setError(err.response?.data?.error || 'Error loading station list.');
      }
    };

    fetchStations();
  }, []);

  // ✅ Fetch trains for selected route using API utility
  const fetchAvailableTrains = async () => {
    if (!startStation || !endStation) {
      setError('Please select both stations.');
      return;
    }

    setError('');
    setSelectedTrain(null);
    setAvailableTrains([]);
    setLoading(true);

    try {
      const response = await API.post('paths/route', {
        from: startStation,
        to: endStation
      });

      const data = response.data;
      if (data.length === 0) {
        setError('No trains available for this route.');
      } else {
        setAvailableTrains(data);
      }
    } catch (err) {
      console.error('Failed to fetch trains:', err);
      setError(err.response?.data?.error || 'Failed to fetch trains. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tracking-container">
      <h2 className="section-title">🚆 Select Your Journey</h2>

      {/* Station Selection */}
      <div className="station-selection">
        <div className="select-wrapper">
          <select
            value={startStation}
            onChange={e => setStartStation(e.target.value)}
            className="station-select"
          >
            <option value="">Start Station</option>
            {stations.map((station, idx) => (
              <option key={idx} value={station.station_name}>
                {station.station_name}
              </option>
            ))}
          </select>
        </div>

        <div className="select-wrapper">
          <select
            value={endStation}
            onChange={e => setEndStation(e.target.value)}
            className="station-select"
          >
            <option value="">End Station</option>
            {stations.map((station, idx) => (
              <option key={idx} value={station.station_name}>
                {station.station_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={fetchAvailableTrains}
        className="search-button"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search Trains"}
      </button>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Available Trains List */}
      {availableTrains.length > 0 && (
        <div className="trains-container">
          <h3 className="trains-heading">Available Trains</h3>
          <ul className="train-list">
            {availableTrains.map(train => (
              <li
                key={train.Train_id}
                className={`train-card ${selectedTrain?.Train_id === train.Train_id ? 'selected' : ''}`}
                onClick={() => setSelectedTrain(train)}
              >
                <div className="train-name">{train.Train_name}</div>
                <div className="train-info">
                  <span className="departure">Departure: {train.departure_time_from_start}</span>
                  <span className="arrival">Arrival: {train.arrival_time_at_end}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Train Tracking Map */}
      {selectedTrain && (
        <div className="live-tracking-container">
          <h3 className="tracking-header">
            Live Tracking for: {selectedTrain.Train_name}
          </h3>
          <div className="map-container">
            <LiveTracking trainId={selectedTrain.Train_id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PassengerTrainTracking;
