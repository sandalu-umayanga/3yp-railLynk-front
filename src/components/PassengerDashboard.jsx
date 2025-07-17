import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSettings, FiMenu, FiUser, FiList, FiLogOut, FiDatabase, FiPause, FiCreditCard, FiTrendingUp, FiActivity, FiCalendar, FiMapPin } from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa"; // Alternative icon from FontAwesome
import "../styles/passengerDashboard.css";
import { useNavigate } from "react-router-dom";
import { USER_DATA, PASSENGER_ID } from "../constants";
import API from "../api";

const PassengerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [passengerData, setPassengerData] = useState({});
  const [balance, setBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionCount, setTransactionCount] = useState(0);
  const [favoriteRoute, setFavoriteRoute] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem(USER_DATA) || "{}");
        const passengerID = localStorage.getItem(PASSENGER_ID);
        
        if (storedUserData.profile) {
          setPassengerData(storedUserData.profile);
        }

        if (passengerID) {
          // Fetch updated passenger data including balance
          const response = await API.get(`passengers/${passengerID}/`);
          if (response.status === 200) {
            const passengerInfo = response.data.passenger;
            const cardData = response.data.cards && response.data.cards.length > 0 ? response.data.cards[0] : null;
            const transactionCount = response.data.transaction_count || 0;
            const favoriteRoute = response.data.favorite_route || null;

            console.log("response.data:", response.data);
            console.log("Passenger Info:", passengerInfo);
            console.log("Card Data:", cardData);
            console.log("Transaction Count:", transactionCount);
            console.log("Favorite Route:", favoriteRoute);

            setPassengerData(passengerInfo);
            setTransactionCount(transactionCount);
            setFavoriteRoute(favoriteRoute);
            
            if (cardData && cardData.balance !== undefined) {
              setBalance(cardData.balance);
            } else {
              // Handle case where no card exists or balance is not available
              setBalance(0);
              console.warn("No card found or balance unavailable");
            }
          }

          // Fetch recent transactions
          try {
            const transactionsResponse = await API.get(`passengers/${passengerID}/transactions/`);
            if (transactionsResponse.status === 200) {
              // Get the most recent 4 transactions
              const transactions = transactionsResponse.data.slice(0, 4);
              setRecentTransactions(transactions);
            }
          } catch (transactionError) {
            console.warn("Could not fetch transactions:", transactionError);
            // Set some fallback data if needed
            setRecentTransactions([]);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Fallback to stored data
        const storedUserData = JSON.parse(localStorage.getItem(USER_DATA) || "{}");
        console.log("Using stored user data:", storedUserData);
        if (storedUserData.profile) {
          setPassengerData(storedUserData.profile);
          setBalance(storedUserData.profile.balance || 0);
        }
        setRecentTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    // Dispatch custom event to update navbar
    window.dispatchEvent(new Event('userTypeChanged'));
    navigate("/");
  };

  // Helper function to format transaction data
  const formatTransactionTime = (timestamp) => {
    const now = new Date();
    const transactionTime = new Date(timestamp);
    const diffInMs = now - transactionTime;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays === 1) {
      return "1 day ago";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return transactionTime.toLocaleDateString();
    }
  };

  const getTransactionIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'recharge':
      case 'credit':
        return <FiCreditCard size={20} />;
      case 'ticket':
      case 'debit':
      case 'payment':
        return <FaTicketAlt size={20} />;
      default:
        return <FiActivity size={20} />;
    }
  };

  const getTransactionDescription = (transaction) => {
    if (transaction.type?.toLowerCase() === 'recharge' || transaction.type?.toLowerCase() === 'credit') {
      return `Added Rs. ${Math.abs(transaction.amount).toFixed(2)} to your card`;
    } else if (transaction.type?.toLowerCase() === 'ticket' || transaction.type?.toLowerCase() === 'debit') {
      return transaction.description || `Train ticket purchase - Rs. ${Math.abs(transaction.amount).toFixed(2)}`;
    }
    return transaction.description || 'Transaction';
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button
          className="menu-button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FiMenu size={24} />
        </button>

        <ul className="menu-list">
          <li>
            <Link to="/passengerProfile" className="menu-item">
              <FiUser size={20} /> {isSidebarOpen && "Profile"}
            </Link>
          </li>
          <li>
            <Link to="/passenger/tickets" className="menu-item">
              <FaTicketAlt size={20} /> {isSidebarOpen && "My Tickets"}
            </Link>
          </li>
          
          <li>
            <Link to="/passengerTransaction" className="menu-item">
              <FiDatabase size={20} /> {isSidebarOpen && "Transactions"}
            </Link>
          </li>
          <li>
            <Link to="/passengerRecharge" className="menu-item">
              <FiPause size={20} /> {isSidebarOpen && "Recharge History"}
            </Link>
          </li>
          <li>
            <Link to="/passengerGooglePayRecharge" className="menu-item">
              <FiCreditCard size={20} /> {isSidebarOpen && "Google Pay Recharge"}
            </Link>
          </li>
          <li>
            <Link to="/passengerTrainTracking" className="menu-item">
              <FiDatabase size={20} /> {isSidebarOpen && "Live Tracking"}
            </Link>
          </li>
          <li>
            <Link to="/passenger/settings" className="menu-item">
              <FiSettings size={20} /> {isSidebarOpen && "Settings"}
            </Link>
          </li>
          <li>
            <Link to="/passenger/MarkStation" className="menu-item">
              <FiSettings size={20} /> {isSidebarOpen && "Station mark"}
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="menu-item logout-button">
              <FiLogOut size={20} /> {isSidebarOpen && "Logout"}
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Welcome Header */}
        <div className="welcome-header">
          <div className="welcome-text">
            <h1 className="dashboard-title">
              Welcome back, {passengerData.first_name || 'Passenger'}!
            </h1>
            <p className="dashboard-subtitle">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            {balance === 0 && (
              <div className="alert-message">
                <p>📱 No travel card linked to your account. Visit a station to get your RailLynk card!</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-container">
          <div className="stats-card">
            <div className="stats-icon">
              <FiTrendingUp size={32} />
            </div>
            <div className="stats-content">
              <h3>Account Balance</h3>
              <p className="stats-value">
                {balance > 0 ? `Rs. ${balance.toFixed(2)}` : 'No card linked'}
              </p>
              <span className={`stats-change ${balance > 0 ? 'positive' : 'neutral'}`}>
                {balance > 0 ? 'Ready for travel' : 'Link a card to start'}
              </span>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon">
              <FaTicketAlt size={32} />
            </div>
            <div className="stats-content">
              <h3>Total Transactions</h3>
              <p className="stats-value">{transactionCount}</p>
              <span className="stats-change neutral">All time transactions</span>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon">
              <FiActivity size={32} />
            </div>
            <div className="stats-content">
              <h3>Card Status</h3>
              <p className="stats-value">{balance > 0 ? 'Active' : 'Inactive'}</p>
              <span className="stats-change neutral">
                {balance > 0 ? 'Ready to travel' : 'Needs recharge'}
              </span>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon">
              <FiMapPin size={32} />
            </div>
            <div className="stats-content">
              <h3>Favorite Route</h3>
              <p className="stats-value">
                {favoriteRoute 
                  ? `${favoriteRoute.start_station} - ${favoriteRoute.end_station}`
                  : 'No routes yet'
                }
              </p>
              <span className="stats-change">
                {favoriteRoute ? 'Most traveled' : 'Start traveling'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/passengerGooglePayRecharge" className="action-card">
              <div className="action-icon">
                <FiCreditCard size={28} />
              </div>
              <div className="action-content">
                <h3>Recharge Card</h3>
                <p>Add money to your travel card</p>
              </div>
            </Link>

            <Link to="/passenger/tickets" className="action-card">
              <div className="action-icon">
                <FaTicketAlt size={28} />
              </div>
              <div className="action-content">
                <h3>View Tickets</h3>
                <p>Check your ticket history</p>
              </div>
            </Link>

            <Link to="/passengerTrainTracking" className="action-card">
              <div className="action-icon">
                <FiDatabase size={28} />
              </div>
              <div className="action-content">
                <h3>Track Trains</h3>
                <p>Live train location tracking</p>
              </div>
            </Link>

            <Link to="/passengerProfile" className="action-card">
              <div className="action-icon">
                <FiUser size={28} />
              </div>
              <div className="action-content">
                <h3>Update Profile</h3>
                <p>Manage your account settings</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity
        <div className="recent-activity">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-list">
            {loading ? (
              <div className="loading-message">
                <p>Loading recent activities...</p>
              </div>
            ) : recentTransactions.length > 0 ? (
              recentTransactions.map((transaction, index) => (
                <div key={transaction.id || index} className="activity-item">
                  <div className="activity-icon">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="activity-content">
                    <h4>
                      {transaction.type?.toLowerCase() === 'recharge' || transaction.type?.toLowerCase() === 'credit' 
                        ? 'Card Recharged' 
                        : transaction.type?.toLowerCase() === 'ticket' || transaction.type?.toLowerCase() === 'debit'
                        ? 'Train Ticket'
                        : transaction.type || 'Transaction'
                      }
                    </h4>
                    <p>{getTransactionDescription(transaction)}</p>
                    <span className="activity-time">
                      {formatTransactionTime(transaction.timestamp || transaction.created_at || transaction.date)}
                    </span>
                  </div>
                  <div className={`activity-amount ${transaction.amount >= 0 ? 'positive' : 'negative'}`}>
                    {transaction.amount >= 0 ? '+' : ''}Rs. {Math.abs(transaction.amount || 0).toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-activity-message">
                <div className="activity-item">
                  <div className="activity-icon">
                    <FiActivity size={20} />
                  </div>
                  <div className="activity-content">
                    <h4>No Recent Activity</h4>
                    <p>You haven't made any transactions yet</p>
                    <span className="activity-time">Start by recharging your card</span>
                  </div>
                  <div className="activity-amount neutral">Rs. 0.00</div>
                </div>
              </div>
            )}
          </div>
          <Link to="/passengerTransaction" className="view-all-link">
            View All Transactions →
          </Link>
        </div> */}

        {/* Travel Tips */}
        <div className="travel-tips">
          <h2 className="section-title">Travel Tips</h2>
          <div className="tips-grid">
            

            <div className="tip-card">
              <div className="tip-icon">
                <FiCreditCard size={24} />
              </div>
              <div className="tip-content">
                <h4>Keep Your Card Charged</h4>
                <p>Maintain sufficient balance in your card for hassle-free travel.</p>
              </div>
            </div>

            <div className="tip-card">
              <div className="tip-icon">
                <FiActivity size={24} />
              </div>
              <div className="tip-content">
                <h4>Track Your Trains</h4>
                <p>Use live tracking to know exact train locations and arrival times.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDashboard;