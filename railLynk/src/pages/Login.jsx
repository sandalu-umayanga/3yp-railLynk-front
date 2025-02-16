import { useState } from "react";
import "../styles/login.css";

const Login = () => {
  const [userType, setUserType] = useState("passenger");
  const [stationName, setStationName] = useState("");

  return (
    <div className="main-login-container">
    <div className="login-container">
      <h2>Login</h2>

      {/* User Type Selection */}
      <label htmlFor="userType">Login as:</label>
      <select
        id="userType"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="passenger">Passenger</option>
        <option value="station">Station</option>
      </select>

      {/* Station Login Form */}
      {userType === "station" && (
        <>
          <label htmlFor="stationName">Station Name:</label>
          <select
            id="stationName"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
          >
            <option value="">Select Station</option>
            <option value="Colombo">Colombo</option>
            <option value="Kandy">Kandy</option>
            <option value="Galle">Galle</option>
          </select>

          <label htmlFor="stationEmail">Email:</label>
          <input type="email" id="stationEmail" placeholder="Enter email" />

          <label htmlFor="stationPassword">Password:</label>
          <input type="password" id="stationPassword" placeholder="Enter password" />
        </>
      )}

      {/* Passenger Login Form */}
      {userType === "passenger" && (
        <>
          <label htmlFor="passengerEmail">Email or Phone:</label>
          <input type="text" id="passengerEmail" placeholder="Enter email or phone" />

          <label htmlFor="passengerPassword">Password:</label>
          <input type="password" id="passengerPassword" placeholder="Enter password" />
        </>
      )}

      {/* Login Button */}
      <button className="login-button">Login</button>
    </div>
    </div>
  );
};

export default Login;
