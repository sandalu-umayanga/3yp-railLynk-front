import { useEffect, useState } from "react";
import API from "../api";
import { ACCESS_TOKEN } from "../constants";


const PassengerManage = () => {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load passenger list on component mount
  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await API.get("passengers/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
          }
        });
        setPassengers(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load passengers");
      } finally {
        setLoading(false);
      }
    };

    fetchPassengers();
  }, []);

  // Delete passenger handler
  const deletePassenger = async (id) => {
    if (!window.confirm("Are you sure you want to delete this passenger?")) return;
    if (!id) {
    console.error("Invalid passenger ID");
    return;
  }
    try {
      await API.delete(`passengers/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      });
      // Remove passenger from local state
      setPassengers(prev => prev.filter((p) => p.id !== id));

    } catch (err) {
      console.error(err);
      alert("Failed to delete passenger");
    }
  };

  return (
    <div className="manage-container">
      <h2>Manage Passengers</h2>
      {loading ? (
        <p>Loading passengers...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : passengers.length === 0 ? (
        <p>No passengers found.</p>
      ) : (
        <table className="passenger-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>NIC</th>
              <th>DOB</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((p) => (
              <tr key={p.id} onClick={() => console.log("Passenger ID:", p.id)}>

                <td>{p.email}</td>
                <td>{p.first_name} {p.last_name}</td>
                <td>{p.nic_number}</td>
                <td>{p.dob}</td>
                <td>{p.phone}</td>
                <td>
                  <button className="delete-btn" onClick={() => deletePassenger(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PassengerManage;
