// StationDashboard.test.js
import { render, screen } from "@testing-library/react";
import StationDashboard from "../components/StationDashboard";
import { BrowserRouter as Router } from "react-router-dom";

test("renders Station Dashboard", () => {
  render(
    <Router>
      <StationDashboard />
    </Router>
  );
  
  // Check if station dashboard elements are rendered
  const dashboardTitle = screen.getByText(/station dashboard/i);
  expect(dashboardTitle).toBeInTheDocument();
});
