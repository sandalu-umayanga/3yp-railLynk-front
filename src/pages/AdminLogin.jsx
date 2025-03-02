import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminLogin.css";
import API from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_TYPE } from "../constants";



const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setMessage(""); // Clear previous messages

    // Validate form
    if (!username || !password) {
      setMessage("Both fields are required.");
      setLoading(false);
      return;
    }

    const loginData = { username, password };

    try {
      console.log(localStorage.getItem(ACCESS_TOKEN));
      console.log("hello");
      console.log("Login data:", loginData); // Check the credentials

    try {
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

        console.log("user type:", response.data.user_type);

      setMessage("Login successful!");
      alert("Login successful!");

        navigate("/adminregister");
    } catch (error) {
        console.log(error);
      setMessage(
        error.response?.data?.error ||
          error.message ||
          "Invalid username or password"
      );
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setMessage(
        error.response?.data?.error ||
        error.message ||
        "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-login-container">
      <div className="login-container">
        <h2>Admin Login</h2>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <button
          className="login-button"
          onClick={handleLogin}
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
