import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUserPlus, FiTrash2, FiSearch } from "react-icons/fi";
import API from "../api";
import "../styles/passengersPage.css";

const PassengersPage = () => {
  const [passenger, setPassenger] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (nicNumber) => {
    if (window.confirm("Are you sure you want to delete this passenger?")) {
      try {
        await API.delete(`passengers/${nicNumber}`);
        setPassenger(null);
        setCards([]);
        setErrorMessage("Passenger deleted successfully.");
      } catch (error) {
        console.error("Error deleting passenger:", error);
        setErrorMessage("Failed to delete passenger.");
      }
    }
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setErrorMessage("Please enter a NIC number.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await API.get(`passengers/${searchId}/`);
      setPassenger(response.data.passenger);
      setCards(response.data.cards || []);
    } catch (error) {
      console.error("Error fetching passenger:", error);
      setPassenger(null);
      setCards([]);
      setErrorMessage("Passenger not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="passenger-profile-container">
      <h1>Passenger Profile</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by NIC Number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch} className="search-btn" disabled={!searchId.trim()}>
          <FiSearch size={18} /> Search
        </button>
      </div>

      <Link to="/passengerRegister" className="add-passenger-btn">
        <FiUserPlus size={20} /> Add New Passenger
      </Link>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {loading ? (
        <p>Loading passenger...</p>
      ) : (
        passenger && (
          <div className="passenger-profile">
            <h2>{passenger.first_name} {passenger.last_name}</h2>
            <p><strong>NIC:</strong> {passenger.nic_number}</p>
            <p><strong>Email:</strong> {passenger.email}</p>
            <p><strong>Phone:</strong> {passenger.phone}</p>
            <p><strong>Address:</strong> {passenger.address}</p>
            <p><strong>Date of Birth:</strong> {passenger.dob}</p>

            {cards.length > 0 ? (
              <div className="cards-section">
                <h3>Cards</h3>
                {cards.map((card, index) => (
                  <div key={index} className="card-info">
                    <p><strong>Card Number:</strong> {card.card_num || "N/A"}</p>
                    <p><strong>Balance:</strong> {card.balance}</p>
                    <p><strong>Card Type:</strong> {card.card_type}</p>
                    <p><strong>Issued Date:</strong> {card.issued_date}</p>
                    <p><strong>Issued Station:</strong> {card.issued_station}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No cards found for this passenger.</p>
            )}

            <button className="delete-btn" onClick={() => handleDelete(passenger.nic_number)}>
              <FiTrash2 size={18} /> Delete
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default PassengersPage;
