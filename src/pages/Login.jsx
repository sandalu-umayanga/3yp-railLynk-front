import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import API from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_TYPE, STATION_ID } from "../constants";

const Login = () => {
  const [userType, setUserType] = useState("passenger");
  const [stationName, setStationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const loginData = {
      "username":email,
      "password":password,
    };

    try {
      localStorage.clear();
      console.log(loginData);
      const response = await API.post("login/", loginData);
      console.log(response.data);

      const access_token = response.data.access;
      const refresh_token = response.data.refresh;

      // Store tokens and user type
      localStorage.setItem(ACCESS_TOKEN, access_token);
      localStorage.setItem(REFRESH_TOKEN, refresh_token);
      localStorage.setItem(USER_TYPE, response.data.user_type);
      localStorage.setItem("user_data", JSON.stringify(response.data));


      if (response.data.user_type === "station") {
        localStorage.setItem(STATION_ID, response.data.profile.station_ID);
      }

      if (response.data.user_type === "passenger") {
        localStorage.setItem("passenger_ID", response.data.profile.nic_number);
      }

      setMessage("Login successful!");

      // Redirect user based on type
      if (userType === "passenger") {
        navigate("/passengerDashboard");
      } else {
        navigate("/stationDashboard");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-login-container">
      <div className="login-container">
        <h2>Login</h2>

        <label htmlFor="userType">Login as:</label>
        <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="passenger">Passenger</option>
          <option value="station">Station</option>
        </select>

        {userType === "station" && (
          <>
            <label htmlFor="stationName">Station Name:</label>
            <select id="stationName" value={stationName} onChange={(e) => setStationName(e.target.value)}>
              <option value="">Select Station</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
            </select>
          </>
        )}

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />

        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
