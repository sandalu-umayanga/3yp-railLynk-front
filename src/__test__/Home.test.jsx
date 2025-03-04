import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

test("renders the Home page", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(screen.getByText(/Welcome to the Railway Ticketing System/i)).toBeInTheDocument();
  expect(screen.getByText(/Book tickets, track trains, and reserve seats with ease./i)).toBeInTheDocument();

});
