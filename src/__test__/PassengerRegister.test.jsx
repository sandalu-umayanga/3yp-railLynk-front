// PassengerRegister.test.js
import { render, screen } from "@testing-library/react";
import PassengerRegister from "../pages/PassengerRegister";
import { BrowserRouter as Router } from "react-router-dom";

test("renders Passenger Register page", () => {
  render(
    <Router>
      <PassengerRegister />
    </Router>
  );
  
  // Check if registration form is rendered
  const registerButton = screen.getByRole("button", { name: /register/i });
  expect(registerButton).toBeInTheDocument();
});
