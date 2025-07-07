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
      // Make API request to update the backend
      console.log("Edited passenger:", editedPassenger);
      
      // Use the correct endpoint that matches your backend
      const response = await API.put(
        `passengers/${passenger.nic_number}/`, 
        editedPassenger
      );

      console.log("Update profile response:", response);

      if (response.status === 200 || response.status === 201) {
        setPassenger(editedPassenger);

        // Update localStorage with new profile data
        const updatedUserData = { ...storedUserData, profile: editedPassenger };
        localStorage.setItem(USER_DATA, JSON.stringify(updatedUserData));

        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      console.error("Error details:", error.response?.data);
      alert(`An error occurred while updating your profile: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleChange = (e) => {
    setEditedPassenger({ ...editedPassenger, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchPassengerData = async () => {
      try {
        const response = await API.get(`passengers/${storedUserData.profile.nic_number}/`);
        console.log("Fetch passenger response:", response.data);

        if (response.status === 200) {
          const passengerData = response.data.passenger;
          const cardData = response.data.cards && response.data.cards.length > 0 ? response.data.cards[0] : null;
          
          setPassenger(passengerData);
          setEditedPassenger(passengerData);
          
          if (cardData) {
            setBalance(cardData.balance || 0);
          } else {
            console.warn("No card data found for passenger");
            setBalance(0);
          }
        }
      } catch (error) {
        console.error("Error fetching passenger data:", error);
        console.error("Error details:", error.response?.data);
        
        // Fallback to stored data if API fails
        if (storedUserData.profile) {
          setPassenger(storedUserData.profile);
          setEditedPassenger(storedUserData.profile);
          setBalance(storedUserData.profile.balance || 0);
        }
      }
    };

    // Only fetch if we have stored user data
    if (storedUserData.profile && storedUserData.profile.nic_number) {
      fetchPassengerData();
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header-content">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your personal information and account settings</p>
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="cancel-button" onClick={() => {
                setEditedPassenger(passenger);
                setIsEditing(false);
              }}>
                Cancel
              </button>
              <button className="save-button" onClick={handleSaveClick}>
                <FiSave /> Save Changes
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={handleEditClick}>
              <FiEdit2 /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        {/* Profile Avatar Section */}
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            <FiUser size={60} className="avatar-icon" />
          </div>
          <div className="profile-basic-info">
            <h2 className="user-name">{passenger.first_name} {passenger.last_name}</h2>
            <p className="user-email">{passenger.email}</p>
            <div className="balance-chip">
              <FiCreditCard className="balance-icon" />
              <span>Rs. {balance.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Profile Details Cards */}
        <div className="profile-cards-grid">
          {/* Personal Information Card */}
          <div className="profile-card">
            <div className="card-header">
              <h3 className="card-title">Personal Information</h3>
            </div>
            <div className="card-content">
              <div className="form-group">
                <label className="field-label">
                  <FiUser className="field-icon" />
                  First Name
                </label>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="first_name" 
                    value={editedPassenger.first_name || ''} 
                    onChange={handleChange}
                    className="modern-input"
                    placeholder="Enter your first name"
                  />
                ) : (
                  <p className="field-value">{passenger.first_name}</p>
                )}
              </div>

              <div className="form-group">
                <label className="field-label">
                  <FiUser className="field-icon" />
                  Last Name
                </label>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="last_name" 
                    value={editedPassenger.last_name || ''} 
                    onChange={handleChange}
                    className="modern-input"
                    placeholder="Enter your last name"
                  />
                ) : (
                  <p className="field-value">{passenger.last_name}</p>
                )}
              </div>

              <div className="form-group">
                <label className="field-label">
                  <FiCalendar className="field-icon" />
                  Date of Birth
                </label>
                {isEditing ? (
                  <input 
                    type="date" 
                    name="dob" 
                    value={editedPassenger.dob || ''} 
                    onChange={handleChange}
                    className="modern-input"
                  />
                ) : (
                  <p className="field-value">{passenger.dob}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="profile-card">
            <div className="card-header">
              <h3 className="card-title">Contact Information</h3>
            </div>
            <div className="card-content">
              <div className="form-group">
                <label className="field-label">
                  <FiMail className="field-icon" />
                  Email Address
                </label>
                <p className="field-value readonly">{passenger.email}</p>
                <small className="field-note">Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label className="field-label">
                  <FiPhone className="field-icon" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input 
                    type="tel" 
                    name="phone" 
                    value={editedPassenger.phone || ''} 
                    onChange={handleChange}
                    className="modern-input"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="field-value">{passenger.phone}</p>
                )}
              </div>

              <div className="form-group">
                <label className="field-label">
                  <FiMapPin className="field-icon" />
                  Address
                </label>
                {isEditing ? (
                  <textarea 
                    name="address" 
                    value={editedPassenger.address || ''} 
                    onChange={handleChange}
                    className="modern-input modern-textarea"
                    placeholder="Enter your address"
                    rows="3"
                  />
                ) : (
                  <p className="field-value">{passenger.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Information Card */}
          <div className="profile-card">
            <div className="card-header">
              <h3 className="card-title">Account Information</h3>
            </div>
            <div className="card-content">
              <div className="form-group">
                <label className="field-label">
                  <FiCreditCard className="field-icon" />
                  NIC Number
                </label>
                <p className="field-value readonly">{passenger.nic_number}</p>
                <small className="field-note">NIC cannot be changed</small>
              </div>

              <div className="form-group">
                <label className="field-label">
                  <FiCreditCard className="field-icon" />
                  Current Balance
                </label>
                <div className="balance-display">
                  <span className="balance-amount">Rs. {balance.toFixed(2)}</span>
                  <span className="balance-status">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerProfile;