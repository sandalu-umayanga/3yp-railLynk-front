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

      // Dispatch custom event to update navbar
      window.dispatchEvent(new Event('userTypeChanged'));


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
      <div className="login-card">
        <div className="login-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L22 7L12 12L2 7L12 2Z" fill="currentColor"/>
            <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h2>LOG IN</h2>

        <div className="input-group">
          <label htmlFor="userType">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Login as
          </label>
          <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="passenger">Passenger</option>
            <option value="station">Station</option>
          </select>
        </div>

        {userType === "station" && (
          <div className="input-group">
            <label htmlFor="stationName">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Station Name
            </label>
            <select id="stationName" value={stationName} onChange={(e) => setStationName(e.target.value)}>
              <option value="">Select Station</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
            </select>
          </div>
        )}

        <div className="input-group">
          <label htmlFor="email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Username
          </label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username" />
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
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>

        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
