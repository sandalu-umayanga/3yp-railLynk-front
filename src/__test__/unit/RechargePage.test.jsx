// RechargePage.test.js
import { render, screen } from "@testing-library/react";
import RechargePage from "../../pages/RechargePage";
import { BrowserRouter as Router } from "react-router-dom";

test("renders Recharge page", () => {
  render(
    <Router>
      <RechargePage />
    </Router>
  );
  
  // Check if recharge options are rendered
  const rechargeButton = screen.getByRole("button", { name: /recharge/i });
  expect(rechargeButton).toBeInTheDocument();
});