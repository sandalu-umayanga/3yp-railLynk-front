// StationDashboard.test.js
import { render, screen } from "@testing-library/react";
import StationDashboard from "../../components/StationDashboard";
import { BrowserRouter as Router } from "react-router-dom";


beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test("renders Station Dashboard", () => {
  render(
    <Router>
      <StationDashboard />
    </Router>
  );
  
  // Check if station dashboard elements are rendered
  const dashboardTitle = screen.getByText(/Dashboard Overview/i);
  expect(dashboardTitle).toBeInTheDocument();
});