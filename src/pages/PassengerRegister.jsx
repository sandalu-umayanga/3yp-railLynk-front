import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import API from "../api";

const PassengerRegister = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nic_number: "",
    first_name: "",
    last_name: "",
    dob: "",
    address: "",
    phone: "",
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
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.nic_number) newErrors.nic_number = "NIC number is required";
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setMessage("");

    const registerData = {
      email: formData.email,
      password: formData.password,
      nic_number: formData.nic_number,
      first_name: formData.first_name,
      last_name: formData.last_name,
      dob: formData.dob,
      address: formData.address,
      phone: formData.phone,
    };

    try {
      console.log(registerData);
      
      await API.post("signup/passenger/", registerData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("hello checker");
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/admindashboard"), 2000);
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data || {});
      setMessage(error.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-register-container">
      <div className="register-container">
        <h2>Passenger Signup</h2>

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

        <label htmlFor="nic_number">NIC Number:</label>
        <input type="text" name="nic_number" value={formData.nic_number} onChange={handleChange} placeholder="Enter NIC" />
        {errors.nic_number && <p className="error-text">{errors.nic_number}</p>}

        <label htmlFor="first_name">First Name:</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
        {errors.first_name && <p className="error-text">{errors.first_name}</p>}

        <label htmlFor="last_name">Last Name:</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
        {errors.last_name && <p className="error-text">{errors.last_name}</p>}

        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        {errors.dob && <p className="error-text">{errors.dob}</p>}

        <label htmlFor="address">Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" />
        {errors.address && <p className="error-text">{errors.address}</p>}

        <label htmlFor="phone">Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Phone" />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <button className="register-button" onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p className="register-message">{message}</p>}
      </div>
    </div>
  );
};

export default PassengerRegister;