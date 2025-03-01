import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [], redirectPath = "/login" }) => {
    const token = localStorage.getItem("access_token");
    const userType = localStorage.getItem("user_type"); // Get logged-in user type

    console.log("User type:", userType);


    // If no token, redirect to login
    if (!token) {
        alert("You need to login to access this page");
        console.log("Redirecting to login");
        return <Navigate to={redirectPath} />;
    }

    // If the user type is not in the allowedRoles array, redirect
    if (!allowedRoles.includes(userType)) {
        alert("You do not have permission to access this page");
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
