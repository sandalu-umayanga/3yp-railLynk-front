// AdminLogin.test.js
import { render, screen } from "@testing-library/react";
import AdminLogin from "../pages/AdminLogin";
import { BrowserRouter as Router } from "react-router-dom";

test("renders Admin Login page", () => {
  render(
    <Router>
      <AdminLogin />
    </Router>
  );
  
  // Check if admin login form is rendered
  const loginButton = screen.getByRole("button", { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});
