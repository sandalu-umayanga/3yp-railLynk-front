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
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrors(error.response?.data || {});
      setMessage(error.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-register-container">
      <div className="register-container">
        <h2>Station Signup</h2>

        <label htmlFor="station_ID">Station ID:</label>
        <input type="text" name="station_ID" value={formData.station_ID} onChange={handleChange} placeholder="Enter Station ID" />
        {errors.station_ID && <p className="error-text">{errors.station_ID}</p>}

        <label htmlFor="station_name">Station Name:</label>
        <input type="text" name="station_name" value={formData.station_name} onChange={handleChange} placeholder="Enter Station Name" />
        {errors.station_name && <p className="error-text">{errors.station_name}</p>}

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label htmlFor="phone">Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Phone Number" />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

        <button className="register-button" onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p className="register-message">{message}</p>}
      </div>
    </div>
  );
};

export default StationRegister;