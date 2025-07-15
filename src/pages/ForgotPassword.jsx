import { useState } from "react";
import API from "../api";
import "../styles/login.css"; // Use login styles

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await API.post("/password_reset/", { email });
      setMessage("If an account with that email exists, a password reset link has been sent.");
    } catch (error) {
      // Generic message to prevent user enumeration
      setMessage("If an account with that email exists, a password reset link has been sent.");
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
        
        <h2>FORGOT PASSWORD</h2>
        <p style={{color: "white", marginBottom: "20px"}}>Enter your email to receive a reset link.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
              </svg>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
