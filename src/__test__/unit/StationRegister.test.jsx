// StationRegister.test.js
import { render, screen } from "@testing-library/react";
import StationRegister from "../../pages/StationRegister";
import { BrowserRouter as Router } from "react-router-dom";

test("renders Station Register page", () => {
  render(
    <Router>
      <StationRegister />
    </Router>
  );
  
  // Check if registration form is rendered
  expect(screen.getByText(/Station Signup/i)).toBeInTheDocument();
  expect(screen.getByText(/Station ID:/i)).toBeInTheDocument();
});