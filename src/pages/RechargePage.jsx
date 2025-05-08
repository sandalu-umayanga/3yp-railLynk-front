import { useState } from "react";
import "../styles/rechargePage.css";
import API from "../api";
import { STATION_ID } from "../constants";

const RechargePage = () => {
    const [nicNumber, setNicNumber] = useState("");
    const [balance, setBalance] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRecharge = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await API.patch("card/recharge/", {
                nic_number: nicNumber,
                balance: parseInt(balance, 10),
                station_ID: localStorage.getItem(STATION_ID),
            });

            if (response.status === 200) {
                setMessage("Recharge Successful!");
            } else {
                setMessage("Recharge Failed. Try Again.");
            }
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.message || "Server not responding."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="recharge-container">
            <h2>Recharge Smart Card</h2>
            <form onSubmit={handleRecharge}>
                <label>NIC Number:</label>
                <input
                    type="text"
                    value={nicNumber}
                    onChange={(e) => setNicNumber(e.target.value)}
                    required
                />

                <label>Balance (Rs):</label>
                <input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Recharging..." : "Recharge"}
                </button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default RechargePage;