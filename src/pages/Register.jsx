import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import API from "../api";

const Register = () => {
  const [userType, setUserType] = useState("passenger");
  const [stationName, setStationName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const stationOptions = ["Colombo Fort", "Kandy", "Galle"];

  const validateForm = () => {
    let newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (userType === "station" && !stationName) {
      newErrors.stationName = "Station name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
  
    setLoading(true);
    setMessage("");
  
    const registerData = {
      username,
      email,
      password,
      user_type: userType,
      ...(userType === "station" && { station_name: stationName }) // Only add station_name if it's a station
    };
  
    try {
      console.log(registerData);
      const response = await API.post("register/", registerData, {
        headers: { "Content-Type": "application/json" }, // ✅ Ensure JSON format
      });
  
      alert(response.data.message);
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
        <h2>Register</h2>

        <label htmlFor="userType">Register as:</label>
        <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="passenger">Passenger</option>
          <option value="station">Station</option>
        </select>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        {errors.username && <p className="error-text">{errors.username}</p>}

        {userType === "station" && (
          <>
            <label htmlFor="stationName">Station Name:</label>
            <select id="stationName" value={stationName} onChange={(e) => setStationName(e.target.value)}>
              <option value="">Select Station</option>
              {stationOptions.map((station, index) => (
                <option key={index} value={station}>
                  {station}
                </option>
              ))}
            </select>
            {errors.stationName && <p className="error-text">{errors.stationName}</p>}
          </>
        )}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

        <button className="register-button" onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p className="register-message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
