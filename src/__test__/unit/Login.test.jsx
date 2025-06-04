import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../pages/Login";

describe("Login Component", () => {
  test("renders login form with default passenger option", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Login as:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.queryByLabelText("Station Name:")).not.toBeInTheDocument();
  });

  test("switches to station login form when selected", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Login as:"), { target: { value: "station" } });

    expect(screen.getByLabelText("Station Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
  });

  test("does not show station-specific fields for passenger login", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.queryByLabelText("Station Name:")).not.toBeInTheDocument();
  });

  test("calls login function when login button is clicked", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email:"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "password123" } });

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    expect(loginButton).toBeDisabled(); // Ensuring button is disabled while loading
  });
});
