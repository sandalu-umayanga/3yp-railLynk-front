import React, { useState } from "react";
import API from "../api"; 
function RouteUpdater() {
  const [trainName, setTrainName] = useState("");
  const [routeId, setRouteId] = useState("");
  const [stationIds, setStationIds] = useState([]);
  const [stationNames, setStationNames] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("route/update/", {
        state: 0,
        train_name: trainName,
        route_id: routeId,
      });
      const stations = res.data.station_list;
      setStationIds(Object.keys(stations));
      setStationNames(stations);
      setStarted(true);
      setCurrentIndex(0);
    } catch (err) {
      alert("Error fetching station list.");
      console.error(err);
    }
  };

  const handleMarkStation = async () => {
    const stationId = stationIds[currentIndex];

    try {
      await API.post("route/update/", {
        state: 1,
        train_name: trainName,
        route_id: routeId,
        station_id: stationId,
      });

      const nextIndex = currentIndex + 1;

      if (nextIndex < stationIds.length) {
        setCurrentIndex(nextIndex);
      } else {
        await API.post("route/update/", {
          state: 2,
          train_name: trainName,
          route_id: routeId,
        });
        alert("✅ All stations marked successfully.");
        setStarted(false);
        setTrainName("");
        setRouteId("");
      }
    } catch (err) {
      alert("Error marking station.");
      console.error(err);
    }
  };

  return (
    <div className="container"
      style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }}
    >
      {!started ? (
        <form onSubmit={handleInitialSubmit}>
          <h2 >
            Enter Train and Route
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Train Name:
            </label>
            <input
              type="text"
              value={trainName}
              onChange={(e) => setTrainName(e.target.value)}
              placeholder="e.g. Podimanike"
              style={{ color: "black", backgroundColor: "white", borderWidth: "4px"}}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Route ID:
            </label>
            <input
              type="text"
              value={routeId}
              onChange={(e) => setRouteId(e.target.value)}
              placeholder="e.g. 1"
              style={{ color: "black", backgroundColor: "white", borderWidth: "4px" }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Mark Stations for Route
          </h2>
          <p className="text-gray-600">
            Marking station {currentIndex + 1} of {stationIds.length}
          </p>
          <div className="p-4 border rounded bg-gray-100 text-lg font-semibold text-center">
            {stationNames[stationIds[currentIndex]]}
          </div>
          <button
            onClick={handleMarkStation}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Mark & Continue
          </button>
        </div>
      )}
    </div>
  );
}

export default RouteUpdater;
