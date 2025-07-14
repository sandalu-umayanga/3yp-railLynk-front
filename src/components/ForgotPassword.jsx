import { useState } from "react";
import API from "../api";
import "../styles/forgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await API.post("/reset_password/", { email });
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      setMessage("❌ " + (error.response?.data?.email || "Unable to send email."));
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-card">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
