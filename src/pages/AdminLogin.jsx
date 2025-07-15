import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminLogin.css";
import API from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_TYPE } from "../constants";

const AdminLogin = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setMessage(""); // Clear previous messages

    const loginData = {
        username,
        password,
    };

    console.log("Logging in with:", loginData); // Debugging Step 1

    try {
        localStorage.clear();
        alert("hello checker");
        console.log(loginData)
        const response = await API.post("login/", loginData);

        alert("hello checker2");

        console.log(response)
        // Check if tokens exist
        const access_token = response.data.access;
        const refresh_token = response.data.refresh;

        if (!access_token || !refresh_token) {
            alert("hello checker3");
            throw new Error("Invalid credentials or missing tokens");
        }

        // Store tokens and user type
        localStorage.setItem(ACCESS_TOKEN, access_token);
        localStorage.setItem(REFRESH_TOKEN, refresh_token);
        localStorage.setItem(USER_TYPE, response.data.user_type);

        // Dispatch custom event to update navbar
        window.dispatchEvent(new Event('userTypeChanged'));

        console.log("user type:", response.data.user_type);

        setMessage("Login successful!");
        alert("Login successful!");

        navigate("/adminDashboard");
    } catch (error) {
        setMessage(error.response?.data?.error || "Invalid username or password");
    } finally {
        setLoading(false);
    }
 };


  const validateForm = () => {
    if (!username || !password) {
      setMessage("Please fill in all fields.");
      return false;
    }

    return true;
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
            
            <h2>ADMIN LOGIN</h2>

            <div className="input-group">
                <label htmlFor="username">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    placeholder="Username"
                />
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
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>

            <button
                className="login-button"
                onClick={async () => {
                    if (validateForm()) {
                        await handleLogin();
                    }
                }}
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"} 
            </button>

            {message && <p className="login-message">{message}</p>}
        </div>
    </div>
);
};

export default AdminLogin;
