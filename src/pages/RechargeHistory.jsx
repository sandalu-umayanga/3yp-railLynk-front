import { useEffect, useState } from "react";
import "../styles/rechargeHistory.css";
import API from "../api";
import { PASSENGER_ID } from "../constants"; // Import constant for passenger ID

const RechargeHistory = (props) => {
  const [recharges, setRecharges] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecharges = async () => {
    setLoading(true);
    const passengerId = localStorage.getItem(PASSENGER_ID); // Retrieve passenger ID from local storage
    try {
      const response = await API.get(`recharges/?passenger_id=${passengerId}`);
      setRecharges(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching recharge history:", error);
      setRecharges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecharges();
  }, []);

  return (
    <div className="recharge-container">
      <h2>{props.title || "Recharge History"}</h2>

      {loading ? (
        <p>Loading recharge history...</p>
      ) : recharges.length === 0 ? (
        <p>No recharge history found.</p>
      ) : (
        <table className="recharge-table">
          <thead>
            <tr>
              <th>Recharge ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recharges.map((recharge, index) => (
              <tr key={index}>
                <td>{recharge.id}</td>
                <td>Rs. {recharge.amount}</td>
                <td>{new Date(recharge.date).toLocaleDateString()}</td>
                <td>{new Date(recharge.date).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RechargeHistory;