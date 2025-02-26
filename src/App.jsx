import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the protected route

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Admin-only routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} redirectPath="/" />}>
            <Route path="/adminregister" element={<Register />} />
          </Route>
          <Route path="/adminLogin" element={<AdminLogin />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
