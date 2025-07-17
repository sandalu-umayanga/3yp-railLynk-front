import { useEffect, useState } from "react";
import "../styles/transactionPage.css";
import API from "../api"; // Import API instance
import { PASSENGER_ID } from "../constants"; // Passenger ID constant

const PassengerTransactionPage = (props) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today

    const fetchTransactions = async (date) => {
        setLoading(true);
        const passengerId = localStorage.getItem(PASSENGER_ID); // Retrieve passenger ID from local storage
        try {
            console.log(passengerId);
            const response = await API.get(`passenger/transactions/?passenger_id=${passengerId}`);
            setTransactions(response.data);
            console.log(response);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions(selectedDate);
    }, [selectedDate]);

    return (
        <div className="transaction-container">
            <h2>{props.title || "My Transactions"}</h2>

            {/* Date Picker & Search Button */}
            <div className="search-container">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="date-picker"
                />
                <button onClick={() => fetchTransactions(selectedDate)} className="search-button">
                    Search
                </button>
            </div>

            {loading ? (
                <p>Loading transactions...</p>
            ) : transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Start Station</th>
                            <th>End Station</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={transaction.id}>
                                <td>{transaction.S_station_name || transaction.S_station}</td>
                                <td>{transaction.E_station_name || transaction.E_station}</td>
                                <td>Rs. {transaction.amount}</td>
                                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td>{new Date(transaction.date).toLocaleTimeString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PassengerTransactionPage;