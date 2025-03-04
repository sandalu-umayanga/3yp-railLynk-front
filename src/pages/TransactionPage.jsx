import { useEffect, useState } from "react";
import "../styles/transactionPage.css";
import API from "../api"; // Make sure to import your API instance
import { STATION_ID } from "../constants"; // Import the constant for station ID

const TransactionPage = (props) => {
  const [arrivingTransactions, setArrivingTransactions] = useState([]);
  const [departingTransactions, setDepartingTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [showArriving, setShowArriving] = useState(true); // State to toggle between arriving and departing transactions

  const fetchTransactions = async (date) => {
    setLoading(true);
    const stationId = localStorage.getItem(STATION_ID); // Retrieve station ID from local storage
    try {
      const response = await API.get(`transactions/?date=${date}&station_id=${stationId}`);
      const { arriving, departing } = response.data;
      setArrivingTransactions(arriving);
      setDepartingTransactions(departing);
      console.log(response);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setArrivingTransactions([]);
      setDepartingTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(selectedDate);
  }, []);

  return (
    <div className="transaction-container">
      <h2>{props.title || "Transactions"}</h2>

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

      {/* Toggle Button */}
      <div className="toggle-container">
        <button onClick={() => setShowArriving(true)} className={`toggle-button ${showArriving ? "active" : ""}`}>
          Arriving Transactions
        </button>
        <button onClick={() => setShowArriving(false)} className={`toggle-button ${!showArriving ? "active" : ""}`}>
          Departing Transactions
        </button>
      </div>

      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <>
          {arrivingTransactions.length === 0 && departingTransactions.length === 0 ? (
            <p>No transactions found for the selected date.</p>
          ) : (
            <>
              {showArriving ? (
                <>
                  <h3>Arriving Transactions</h3>
                  <table className="transaction-table">
                    <thead>
                      <tr>
                        <th>Card Number</th>
                        <th>Start Station</th>
                        <th>End Station</th>
                        <th>Amount</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arrivingTransactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.card_num}</td>
                          <td>{transaction.start_station}</td>
                          <td>{transaction.end_station}</td>
                          <td>Rs. {transaction.amount}</td>
                          <td>{new Date(transaction.date).toLocaleTimeString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <h3>Departing Transactions</h3>
                  <table className="transaction-table">
                    <thead>
                      <tr>
                        <th>Card Number</th>
                        <th>Start Station</th>
                        <th>End Station</th>
                        <th>Amount</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departingTransactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.card_num}</td>
                          <td>{transaction.start_station}</td>
                          <td>{transaction.end_station}</td>
                          <td>Rs. {transaction.amount}</td>
                          <td>{new Date(transaction.date).toLocaleTimeString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionPage;