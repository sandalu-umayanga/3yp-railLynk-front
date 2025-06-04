// PassengersPage.test.js
import { render, screen } from "@testing-library/react";
import PassengersPage from "../../pages/PassengersPage";
import { BrowserRouter as Router } from "react-router-dom";

test("renders Passengers page", () => {
  render(
    <Router>
      <PassengersPage />
    </Router>
  );
  
  // Check if passengers list is displayed
  const passengersList = screen.getByText(/Passenger Profile/i);
  expect(passengersList).toBeInTheDocument();
});