import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { USER_TYPE } from "../constants";
import "../styles/login.css"; // Using login styles for consistency

const CreateSmartTicket = () => {
    const [formData, setFormData] = useState({
        nic_number: "",
        balance: "",
        card_type: "normal",
        issued_station: "",
        issued_date: "",
        card_num: "",
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
        if (!formData.nic_number) newErrors.nic_number = "NIC number is required";
        if (!formData.balance || isNaN(formData.balance) || formData.balance < 0)
            newErrors.balance = "Valid balance is required";
        if (!formData.issued_station) newErrors.issued_station = "Station is required";
        if (!formData.issued_date) newErrors.issued_date = "Issued date is required";
        if (!formData.card_num) newErrors.card_num = "Card number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateTicket = async () => {
        if (!validateForm()) return;
        setLoading(true);
        setMessage("");

        try {
            await API.post("card/create/", formData, {
                headers: { "Content-Type": "application/json" },
            });
            setMessage("Smart ticket created successfully!");

            const userType = localStorage.getItem(USER_TYPE);
            const redirectPath = userType === "admin" ? "/adminDashboard" : "/stationDashboard";
            setTimeout(() => navigate(redirectPath), 2000);
        } catch (error) {
            setErrors(error.response?.data || {});
            setMessage(error.response?.data?.error || "Failed to create ticket. Try again.");
        } finally {
            setLoading(false);
        }
    };

    // Custom style for error messages to make them visible on the dark background
    const errorStyle = {
        color: '#ffb3b3',
        fontSize: '12px',
        textAlign: 'left',
        marginTop: '4px',
    };

    return (
        <div className="main-login-container">
            <div className="login-card">
                <div className="login-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 9.5C2 8.11929 3.11929 7 4.5 7H19.5C20.8807 7 22 8.11929 22 9.5V18.5C22 19.8807 20.8807 21 19.5 21H4.5C3.11929 21 2 19.8807 2 18.5V9.5Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M5 3L19 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M8 3L8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16 3L16 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <h2>Create Smart Ticket</h2>

                <div className="input-group">
                    <label htmlFor="nic_number">NIC Number</label>
                    <input type="text" name="nic_number" value={formData.nic_number} onChange={handleChange} placeholder="Enter NIC" />
                    {errors.nic_number && <p style={errorStyle}>{errors.nic_number}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="balance">Balance</label>
                    <input type="number" name="balance" value={formData.balance} onChange={handleChange} placeholder="Enter Balance" />
                    {errors.balance && <p style={errorStyle}>{errors.balance}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="card_type">Card Type</label>
                    <select name="card_type" value={formData.card_type} onChange={handleChange}>
                        <option value="normal">Normal</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="issued_station">Issued Station</label>
                    <input type="text" name="issued_station" value={formData.issued_station} onChange={handleChange} placeholder="Enter Station" />
                    {errors.issued_station && <p style={errorStyle}>{errors.issued_station}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="issued_date">Issued Date</label>
                    <input type="date" name="issued_date" value={formData.issued_date} onChange={handleChange} />
                    {errors.issued_date && <p style={errorStyle}>{errors.issued_date}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="card_num">Card Number</label>
                    <input type="text" name="card_num" value={formData.card_num} onChange={handleChange} placeholder="Enter Card Number" />
                    {errors.card_num && <p style={errorStyle}>{errors.card_num}</p>}
                </div>

                <button className="login-button" onClick={handleCreateTicket} disabled={loading}>
                    {loading ? "Creating..." : "Create Ticket"}
                </button>

                {message && <p className="login-message">{message}</p>}
            </div>
        </div>
    );
};

export default CreateSmartTicket;