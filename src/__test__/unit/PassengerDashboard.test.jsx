// PassengerDashboard.test.js
import { render, screen } from "@testing-library/react";
import PassengerDashboard from "../../components/PassengerDashboard";
import { BrowserRouter as Router } from "react-router-dom";

test("renders Passenger Dashboard page", () => {
  render(
    <Router>
      <PassengerDashboard />
    </Router>
  );
  
  // Check if dashboard elements are rendered
  const dashboardTitle = screen.getByText(/passenger dashboard/i);
  expect(dashboardTitle).toBeInTheDocument();
});