import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit2, FiSave, FiCreditCard } from "react-icons/fi";
import "../styles/passengerProfile.css";

const PassengerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [passenger, setPassenger] = useState({
    email: "passenger@example.com",
    password: "******",
    confirmPassword: "******",
    nic_number: "123456789V",
    first_name: "John",
    last_name: "Doe",
    dob: "1995-06-15",
    address: "123 Main Street, Colombo",
    phone: "+94 77 123 4567",
  });

  const [editedPassenger, setEditedPassenger] = useState({ ...passenger });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setPassenger(editedPassenger);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedPassenger({ ...editedPassenger, [e.target.name]: e.target.value });
  };

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
