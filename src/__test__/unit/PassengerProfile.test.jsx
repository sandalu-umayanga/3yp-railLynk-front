// PassengerProfile.test.js
import { render, screen } from "@testing-library/react";
import PassengerProfile from "../../pages/PassengerProfile";
import { BrowserRouter as Router } from "react-router-dom";

test("renders Passenger Profile page", () => {
  render(
    <Router>
      <PassengerProfile />
    </Router>
  );
  
  // Check if profile details are rendered
  const profileTitle = screen.getByText(/my profile/i);
  expect(profileTitle).toBeInTheDocument();
});