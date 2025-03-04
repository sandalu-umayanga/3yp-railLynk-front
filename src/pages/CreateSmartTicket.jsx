import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { USER_TYPE } from "../constants";
import "../styles/ticket.css";

const CreateSmartTicket = () => {
    const [formData, setFormData] = useState({
        nic_number: "",
        balance: "",
        card_type: "normal",
        issued_station: "",
        issued_date: "", // New field for issued date
        card_num: "", // New field for card number
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
        if (!formData.issued_date) newErrors.issued_date = "Issued date is required"; // Validation for issued date
        if (!formData.card_num) newErrors.card_num = "Card number is required"; // Validation for card number

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateTicket = async () => {
        if (!validateForm()) return;
        setLoading(true);
        setMessage("");

        try {
            console.log("Create ticket data:", formData);
            const response = await API.post("card/create/", formData, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Create ticket response:", response.data);
            setMessage("Smart ticket created successfully!");

            const userType = localStorage.getItem(USER_TYPE);
            if (userType === "admin") {
                setTimeout(() => navigate("/adminDashboard"), 2000);
            } else if (userType === "station") {
                setTimeout(() => navigate("/stationDashboard"), 2000);
            }
        } catch (error) {
            setErrors(error.response?.data || {});
            setMessage(error.response?.data?.error || "Failed to create ticket. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-ticket-container">
            <div className="ticket-container">
                <h2>Create Smart Ticket</h2>

                <label htmlFor="nic_number">NIC Number:</label>
                <input type="text" name="nic_number" value={formData.nic_number} onChange={handleChange} placeholder="Enter NIC" />
                {errors.nic_number && <p className="error-text">{errors.nic_number}</p>}

                <label htmlFor="balance">Balance:</label>
                <input type="number" name="balance" value={formData.balance} onChange={handleChange} placeholder="Enter Balance" />
                {errors.balance && <p className="error-text">{errors.balance}</p>}

                <label htmlFor="card_type">Card Type:</label>
                <select name="card_type" value={formData.card_type} onChange={handleChange}>
                    <option value="normal">Normal</option>
                    <option value="student">Student</option>
                </select>

                <label htmlFor="issued_station">Issued Station:</label>
                <input type="text" name="issued_station" value={formData.issued_station} onChange={handleChange} placeholder="Enter Station" />
                {errors.issued_station && <p className="error-text">{errors.issued_station}</p>}

                <label htmlFor="issued_date">Issued Date:</label>
                <input type="date" name="issued_date" value={formData.issued_date} onChange={handleChange} />
                {errors.issued_date && <p className="error-text">{errors.issued_date}</p>}

                <label htmlFor="card_num">Card Number:</label>
                <input type="text" name="card_num" value={formData.card_num} onChange={handleChange} placeholder="Enter Card Number" />
                {errors.card_num && <p className="error-text">{errors.card_num}</p>}

                <button className="ticket-button" onClick={handleCreateTicket} disabled={loading}>
                    {loading ? "Creating..." : "Create Ticket"}
                </button>

                {message && <p className="ticket-message">{message}</p>}
            </div>
        </div>
    );
};

export default CreateSmartTicket;