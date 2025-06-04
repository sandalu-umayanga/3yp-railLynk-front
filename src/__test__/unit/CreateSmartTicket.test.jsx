// CreateSmartTicket.test.js
import { render, screen } from "@testing-library/react";
import CreateSmartTicket from "../../pages/CreateSmartTicket";
import { BrowserRouter as Router } from "react-router-dom";

test("renders Create Smart Ticket page", () => {
  render(
    <Router>
      <CreateSmartTicket />
    </Router>
  );
  
  expect(screen.getByText(/Create Smart Ticket/i)).toBeInTheDocument();
  expect(screen.getByText(/NIC Number:/i)).toBeInTheDocument();
});