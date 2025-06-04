import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

beforeEach(() => {
  localStorage.clear();
});

const renderNavbar = () =>
  render(
    <Router>
      <Navbar />
    </Router>
  );

test("renders logo and default navigation links", () => {
  renderNavbar();
  expect(screen.getByText("RailLynk")).toBeInTheDocument();
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();
  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("Admin")).toBeInTheDocument();
});


test("toggles hamburger menu visibility", () => {
  renderNavbar();
  const hamburger = screen.getByText("☰");
  const navLinks = screen.getByRole("list");

  // Initially, nav-links should not have class "open"
  expect(navLinks.className).not.toContain("open");

  // Click hamburger
  fireEvent.click(hamburger);
  expect(navLinks.className).toContain("open");

  // Click again to close
  fireEvent.click(hamburger);
  expect(navLinks.className).not.toContain("open");
});
