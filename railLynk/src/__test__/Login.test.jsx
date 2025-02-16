import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";

describe("Login Component", () => {
  test("renders login form with default passenger option", () => {
    render(<Login />);

    expect(screen.getByLabelText("Login as:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email or Phone:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
  });

  test("switches to station login form when selected", () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText("Login as:"), { target: { value: "station" } });

    expect(screen.getByLabelText("Station Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
  });
});
