import { useState, useEffect } from "react";
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
  const [stations, setStations] = useState([]);
  const [loadingStations, setLoadingStations] = useState(false);
  const navigate = useNavigate();

  // Fallback stations list in case API fails
  const fallbackStations = [
    { station_ID: '21', station_name: 'Alawwa' },
    { station_ID: '5', station_name: 'Ambalangoda' },
    { station_ID: '20', station_name: 'Ambepussa' },
    { station_ID: '76', station_name: 'Anuradhapura' },
    { station_ID: '69', station_name: 'Avissawella' },
    { station_ID: '40', station_name: 'Badulla' },
    { station_ID: '107', station_name: 'Batticaloa' },
    { station_ID: '13', station_name: 'Beliatta' },
    { station_ID: '4', station_name: 'Bentota' },
    { station_ID: '51', station_name: 'Bolawatta' },
    { station_ID: '52', station_name: 'Borelessa' },
    { station_ID: '84', station_name: 'Chavakachcheri' },
    { station_ID: '109', station_name: 'Cheddikulam' },
    { station_ID: '104', station_name: 'Chenkalady' },
    { station_ID: '55', station_name: 'Chilaw' },
    { station_ID: '95', station_name: 'ChinaBay' },
    { station_ID: '1', station_name: 'Colombo' },
    { station_ID: '2', station_name: 'Dehiwala' },
    { station_ID: '82', station_name: 'ElephantPass' },
    { station_ID: '39', station_name: 'ella' },
    { station_ID: '105', station_name: 'Eravur' },
    { station_ID: '31', station_name: 'Galboda' },
    { station_ID: '74', station_name: 'Galgamuwa' },
    { station_ID: '7', station_name: 'Galle' },
    { station_ID: '92', station_name: 'GalOyaJunction' },
    { station_ID: '28', station_name: 'Gampola' },
    { station_ID: '18', station_name: 'Ganemulla' },
    { station_ID: '27', station_name: 'Gelioya' },
    { station_ID: '91', station_name: 'Habarana' },
    { station_ID: '38', station_name: 'Haputale' },
    { station_ID: '33', station_name: 'Hatton' },
    { station_ID: '6', station_name: 'Hikkaduwa' },
    { station_ID: '98', station_name: 'Hingurakgoda' },
    { station_ID: '800', station_name: 'hiripokuna' },
    { station_ID: '64', station_name: 'Homagama' },
    { station_ID: '16', station_name: 'Hunupitiya' },
    { station_ID: '24', station_name: 'Ihalakotte' },
    { station_ID: '47', station_name: 'Ja-Ela' },
    { station_ID: '85', station_name: 'Jaffna' },
    { station_ID: '25', station_name: 'Kadugannawa' },
    { station_ID: '88', station_name: 'Kalawewa' },
    { station_ID: '42', station_name: 'Kandy' },
    { station_ID: 'ST001', station_name: 'Kandy Central' },
    { station_ID: '93', station_name: 'Kantale' },
    { station_ID: '43', station_name: 'Katugastota' },
    { station_ID: '49', station_name: 'Katunayake' },
    { station_ID: '19', station_name: 'Keenawala' },
    { station_ID: '89', station_name: 'Kekirawa' },
    { station_ID: '15', station_name: 'Kelaniya' },
    { station_ID: '81', station_name: 'Kilinochchi' },
    { station_ID: '106', station_name: 'Koddaikallar' },
    { station_ID: '9', station_name: 'Koggala' },
    { station_ID: '86', station_name: 'Konwewa' },
    { station_ID: '67', station_name: 'Kosgama' },
    { station_ID: '34', station_name: 'Kotagala' },
    { station_ID: '63', station_name: 'Kottawa' },
    { station_ID: '70', station_name: 'Kurunegala' },
    { station_ID: '54', station_name: 'Madampe' },
    { station_ID: '110', station_name: 'MadhuRoad' },
    { station_ID: '58', station_name: 'Madurankuliya' },
    { station_ID: '62', station_name: 'Maharagama' },
    { station_ID: '73', station_name: 'Maho' },
    { station_ID: '100', station_name: 'Manampitiya' },
    { station_ID: '80', station_name: 'Mankulam' },
    { station_ID: '114', station_name: 'Mannar' },
    { station_ID: '56', station_name: 'Manuwangama' },
    { station_ID: '14', station_name: 'Maradana' },
    { station_ID: '46', station_name: 'Matale' },
    { station_ID: '12', station_name: 'Matara' },
    { station_ID: '112', station_name: 'Mathotam' },
    { station_ID: '77', station_name: 'Medawachchiya' },
    { station_ID: '97', station_name: 'Minneriya' },
    { station_ID: '11', station_name: 'Mirissa' },
    { station_ID: '87', station_name: 'Moragollagama' },
    { station_ID: '111', station_name: 'Murunkan' },
    { station_ID: '71', station_name: 'Muttettugala' },
    { station_ID: '36', station_name: 'Nanuoya' },
    { station_ID: '60', station_name: 'Narahenpita' },
    { station_ID: '53', station_name: 'Nattandiya' },
    { station_ID: '30', station_name: 'Nawalapitiya' },
    { station_ID: '50', station_name: 'Negombo' },
    { station_ID: '108', station_name: 'Neriyakulam' },
    { station_ID: '61', station_name: 'Nugegoda' },
    { station_ID: '37', station_name: 'Ohiya' },
    { station_ID: '79', station_name: 'Omanthai' },
    { station_ID: '65', station_name: 'Padukka' },
    { station_ID: '83', station_name: 'Pallai' },
    { station_ID: '90', station_name: 'Palugaswewa' },
    { station_ID: '26', station_name: 'Peradeniya' },
    { station_ID: '116', station_name: 'Pesalai' },
    { station_ID: '66', station_name: 'Pinnawala' },
    { station_ID: '22', station_name: 'Polgahawela' },
    { station_ID: '99', station_name: 'Polonnaruwa' },
    { station_ID: '57', station_name: 'Pulichchakulama' },
    { station_ID: '102', station_name: 'Punani' },
    { station_ID: '59', station_name: 'Puttalam' },
    { station_ID: '68', station_name: 'Puwakpitiya' },
    { station_ID: '17', station_name: 'Ragama' },
    { station_ID: '23', station_name: 'Rambukkana' },
    { station_ID: '41', station_name: 'SarasaviUyana' },
    { station_ID: '48', station_name: 'Seeduwa' },
    { station_ID: '117', station_name: 'Talaimannar' },
    { station_ID: '118', station_name: 'TalaimannarPier' },
    { station_ID: '35', station_name: 'Talawakelle' },
    { station_ID: '500', station_name: 'test station 1' },
    { station_ID: '600', station_name: 'test_station_0' },
    { station_ID: '601', station_name: 'test_station_1' },
    { station_ID: '610', station_name: 'test_station_10' },
    { station_ID: '602', station_name: 'test_station_2' },
    { station_ID: '603', station_name: 'test_station_3' },
    { station_ID: '604', station_name: 'test_station_4' },
    { station_ID: '605', station_name: 'test_station_5' },
    { station_ID: '606', station_name: 'test_station_6' },
    { station_ID: '607', station_name: 'test_station_7' },
    { station_ID: '608', station_name: 'test_station_8' },
    { station_ID: '609', station_name: 'test_station_9' },
    { station_ID: '94', station_name: 'Thambalagamuwa' },
    { station_ID: '75', station_name: 'Thambuttegama' },
    { station_ID: '113', station_name: 'Thirukketiswaram' },
    { station_ID: '115', station_name: 'Thoddaveli' },
    { station_ID: '96', station_name: 'Trincomalee' },
    { station_ID: '45', station_name: 'Ukuwela' },
    { station_ID: '29', station_name: 'Ulapane' },
    { station_ID: '8', station_name: 'Unawatuna' },
    { station_ID: '103', station_name: 'Valaichchenai' },
    { station_ID: '78', station_name: 'Vavuniya' },
    { station_ID: '3', station_name: 'Wadduwa' },
    { station_ID: '32', station_name: 'Watawala' },
    { station_ID: '44', station_name: 'Wattegama' },
    { station_ID: '10', station_name: 'Weligama' },
    { station_ID: '101', station_name: 'Welikanda' },
    { station_ID: '72', station_name: 'Wellawa' }
  ];

  // Fetch stations when component mounts or when userType changes to station
  useEffect(() => {
    const fetchStations = async () => {
      if (userType === "station") {
        setLoadingStations(true);
        try {
          const response = await API.get("stations/");
          console.log("Stations API response:", response);
          console.log("Stations data:", response.data);
          
          if (response.status === 200 && response.data && Array.isArray(response.data) && response.data.length > 0) {
            // Sort stations alphabetically by station name
            const sortedStations = response.data.sort((a, b) => 
              a.station_name.localeCompare(b.station_name)
            );
            console.log("Sorted stations count:", sortedStations.length);
            setStations(sortedStations);
          } else {
            console.warn("API returned empty or invalid data, using fallback stations");
            const sortedFallbackStations = fallbackStations.sort((a, b) => 
              a.station_name.localeCompare(b.station_name)
            );
            setStations(sortedFallbackStations);
          }
        } catch (error) {
          console.error("Error fetching stations:", error);
          console.error("Error response:", error.response);
          
          // Use fallback stations list
          console.warn("Using fallback stations due to API error");
          const sortedFallbackStations = fallbackStations.sort((a, b) => 
            a.station_name.localeCompare(b.station_name)
          );
          setStations(sortedFallbackStations);
        } finally {
          setLoadingStations(false);
        }
      }
    };

    fetchStations();
  }, [userType]);

  const handleLogin = async () => {
    setLoading(true);
    setMessage(""); // Clear previous messages
    
    // Validation
    if (!email || !password) {
      setMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    
    if (userType === "station" && !stationName) {
      setMessage("Please select a station.");
      setLoading(false);
      return;
    }

    const loginData = {
      "username": email,
      "password": password,
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
            <select 
              id="stationName" 
              value={stationName} 
              onChange={(e) => setStationName(e.target.value)}
              disabled={loadingStations}
            >
              <option value="">
                {loadingStations ? "Loading stations..." : "Select Station"}
              </option>
              {stations.map((station) => (
                <option key={station.station_ID} value={station.station_name}>
                  {station.station_name}
                </option>
              ))}
            </select>
            {loadingStations && (
              <div className="loading-indicator">
                <small>Loading stations...</small>
              </div>
            )}
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
