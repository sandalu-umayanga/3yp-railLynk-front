import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import API from "../api";

const StationRegister = () => {
  const [formData, setFormData] = useState({
    station_ID: "",
    station_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.station_ID) newErrors.station_ID = "Station ID is required";
    if (!formData.station_name) newErrors.station_name = "Station name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setMessage("");

    const registerData = {
      station_ID: formData.station_ID,
      station_name: formData.station_name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      await API.post("signup/station/", registerData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/adminDashboard"), 2000);
    } catch (error) {
      setErrors(error.response?.data || {});
      setMessage(error.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-register-container">
      <div className="register-card">
        <div className="register-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        
        <h2>STATION SIGNUP</h2>

        <div className="input-group">
          <label htmlFor="station_ID">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Station ID
          </label>
          <input type="text" name="station_ID" value={formData.station_ID} onChange={handleChange} placeholder="Station ID" />
          {errors.station_ID && <p className="error-text">{errors.station_ID}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="station_name">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Station Name
          </label>
          <input type="text" name="station_name" value={formData.station_name} onChange={handleChange} placeholder="Station Name" />
          {errors.station_name && <p className="error-text">{errors.station_name}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Email
          </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92V19.92C22 20.52 21.39 21 20.8 21C9.28 21 0 11.72 0 0.2C0 -0.39 0.48 -1 1.08 -1H4.08C4.68 -1 5.28 -0.39 5.28 0.2V3.72C5.28 4.32 4.89 4.92 4.29 4.92H2.58C3.73 8.37 6.63 11.27 10.08 12.42V10.71C10.08 10.11 10.68 9.72 11.28 9.72H14.8C15.4 9.72 16 10.32 16 10.92V13.92C16 14.52 15.39 15 14.8 15C14.8 15 13.72 15 13.72 15" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Phone
          </label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="password">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="16" r="1" fill="currentColor"/>
              <path d="M7 11V7C7 4.23858 9.23858 2 12 2S17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Password
          </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="16" r="1" fill="currentColor"/>
              <path d="M7 11V7C7 4.23858 9.23858 2 12 2S17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Confirm Password
          </label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
        </div>

        <button className="register-button" onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p className="register-message">{message}</p>}
      </div>
    </div>
  );
};

export default StationRegister;