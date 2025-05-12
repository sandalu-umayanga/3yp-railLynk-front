import { useState, useEffect } from "react";
import API from "../api"; // Import the API module
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiEdit2,
  FiSave,
  FiCreditCard,
} from "react-icons/fi";
import "../styles/passengerProfile.css";
import { USER_DATA } from "../constants";

const PassengerProfile = () => {
  const storedUserData = JSON.parse(localStorage.getItem(USER_DATA) || "{}");

  const [isEditing, setIsEditing] = useState(false);
  const [passenger, setPassenger] = useState(storedUserData.profile || {});
  const [editedPassenger, setEditedPassenger] = useState({ ...passenger });
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const updatedUserData = JSON.parse(localStorage.getItem(USER_DATA) || "{}");
    if (updatedUserData.profile) {
      setPassenger(updatedUserData.profile);
      setEditedPassenger(updatedUserData.profile);
      setBalance(updatedUserData.profile.balance || 0);
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = storedUserData.access; // Get JWT token

      // Make API request to update the backend

      console.log("Edited passenger:", editedPassenger);
      const response = await API.put(
        "passenger/update", editedPassenger,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authentication
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update profile response:", response);

      if (response.status === 200) {
        setPassenger(editedPassenger);

        // Update localStorage with new profile data
        const updatedUserData = { ...storedUserData, profile: editedPassenger };
        localStorage.setItem(USER_DATA, JSON.stringify(updatedUserData));

        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile.");
    }
  };

  const handleChange = (e) => {
    setEditedPassenger({ ...editedPassenger, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchPassengerData = async () => {
      try {
        const token = storedUserData.access; // Get JWT token
        const response = await API.get(`passengers/${storedUserData.profile.nic_number}/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authentication
            "Content-Type": "application/json",
          },
        });
        console.log("Fetch passenger response:", response);

        console.log("Fetch passenger response:", response);

        if (response.status === 200) {
          const passengerData = response.data.passenger;
          const cardData = response.data.cards[0]; // Assuming there's only one card
          setPassenger(passengerData);
          setEditedPassenger(passengerData);
          setBalance(cardData.balance); // Set balance state
        } else {
          console.error("Failed to fetch passenger data");
        }
      } catch (error) {
        console.error("Error fetching passenger data:", error);
      }
    };

    fetchPassengerData();
  }, []);

  return (
    <div className="profile-container">

      <h1 className="profile-title">Passenger Profile</h1>

      <div className="profile-card">
        
        <FiUser size={80} className="profile-icon" />

        <div className="profile-info">
          <label>Email:</label>
          <p><FiMail /> {passenger.email}</p>

          <label>NIC Number:</label>
          <p><FiCreditCard /> {passenger.nic_number}</p>

          <label>First Name:</label>
          {isEditing ? (
            <input type="text" name="first_name" value={editedPassenger.first_name} onChange={handleChange} />
          ) : (
            <p>{passenger.first_name}</p>
          )}

          <label>Last Name:</label>
          {isEditing ? (
            <input type="text" name="last_name" value={editedPassenger.last_name} onChange={handleChange} />
          ) : (
            <p>{passenger.last_name}</p>
          )}

          <label>Date of Birth:</label>
          {isEditing ? (
            <input type="date" name="dob" value={editedPassenger.dob} onChange={handleChange} />
          ) : (
            <p><FiCalendar /> {passenger.dob}</p>
          )}

          <label>Address:</label>
          {isEditing ? (
            <input type="text" name="address" value={editedPassenger.address} onChange={handleChange} />
          ) : (
            <p><FiMapPin /> {passenger.address}</p>
          )}

          <label>Phone:</label>
          {isEditing ? (
            <input type="text" name="phone" value={editedPassenger.phone} onChange={handleChange} />
          ) : (
            <p><FiPhone /> {passenger.phone}</p>
          )}

          <label>Balance:</label>
          <p>{balance}</p>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <button className="save-button" onClick={handleSaveClick}>
              <FiSave /> Save
            </button>
          ) : (
            <button className="edit-button" onClick={handleEditClick}>
              <FiEdit2 /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassengerProfile;