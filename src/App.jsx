import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PassengerRegister from "./pages/PassengerRegister";
import StationRegister from "./pages/StationRegister";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the protected route
import AdminDashboard from "./components/AdminDashboard";
import StationDashboard from "./components/StationDashboard";
import PassengerProfile from "./pages/PassengerProfile";
import PassengerDashboard from "./components/PassengerDashboard";
import PassengersPage from "./pages/PassengersPage";
import CreateSmartTicket from "./pages/CreateSmartTicket";
import RechargePage from "./pages/RechargePage";
import TransactionPageHolderForStation from "./pages/TransactionPageHolderForStation";
import PassengerTransactionPage from "./pages/PassengerTransactionPage";
import RechargeHistory from "./pages/RechargeHistory";
import LiveTracking from "./components/LiveTracking";
import PassengerTrainTracking from "./components/PassengerTrainTracking";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Admin-only routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "station"]} redirectPath="/" />}>
            <Route path="/passengerRegister" element={<PassengerRegister />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} redirectPath="/" />}>
            <Route path="/stationRegister" element={<StationRegister />} />
          </Route>

          <Route path="/adminLogin" element={<AdminLogin />} />

          <Route element={<ProtectedRoute allowedRoles={["admin"]} redirectPath="/" />}>
            <Route path="/adminDashboard" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin", "station"]} redirectPath="/" />}>
            <Route path="/passengersPage" element={<PassengersPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin", "station"]} redirectPath="/" />}>
            <Route path="/createTicket" element={<CreateSmartTicket />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["station"]} redirectPath="/" />}>
            <Route path="/stationDashboard" element={<StationDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["passenger"]} redirectPath="/" />}>
            <Route path="/passengerProfile" element={<PassengerProfile />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["passenger"]} redirectPath="/" />}>
            <Route path="/passengerDashboard" element={<PassengerDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin", "station"]} redirectPath="/" />}>
            <Route path="/recharging" element={<RechargePage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["passenger"]} redirectPath="/" />}>
            <Route path="/passengerTracking" element={<PassengerTrainTracking />} />
          </Route>
          

          <Route element={<ProtectedRoute allowedRoles={["station"]} redirectPath="/" />}>
            <Route path="/stationTransaction" element={<TransactionPageHolderForStation />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["passenger"]} redirectPath="/" />}>
            <Route path="/passengerTransaction" element={<PassengerTransactionPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["passenger"]} redirectPath="/" />}>
            <Route path="/passengerRecharge" element={<RechargeHistory />} />
          </Route>

          <Route path="/tracking" element={<LiveTracking />} />

          <Route path="*" element={<h1>Not Found</h1>} />
          
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
