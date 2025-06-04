import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import API from "../../api";

// Mocks for localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => (store[key] = value),
    clear: () => (store = {}),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock API post
vi.mock("../../api", () => ({
  default: {
    post: vi.fn(),
  },
}));

// Helper to wrap with Router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Login Integration Test", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("logs in a passenger and redirects to /passengerDashboard", async () => {
    API.post.mockResolvedValue({
      data: {
        access: "access_token",
        refresh: "refresh_token",
        user_type: "passenger",
        profile: {
          nic_number: "123456789V",
        },
      },
    });

    renderWithRouter(<Login />);

    // Fill the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "passenger@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for success message
    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(localStorage.getItem("passenger_ID")).toBe("123456789V");
      expect(localStorage.getItem("user_type")).toBe("passenger");
    });
  });

  it("logs in a station user and redirects to /stationDashboard", async () => {
    API.post.mockResolvedValue({
      data: {
        access: "access_token_station",
        refresh: "refresh_token_station",
        user_type: "station",
        profile: {
          station_ID: "station_001",
        },
      },
    });

    renderWithRouter(<Login />);

    // Change role to station
    fireEvent.change(screen.getByLabelText(/login as/i), {
      target: { value: "station" },
    });

    fireEvent.change(screen.getByLabelText(/station name/i), {
      target: { value: "Colombo" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "station@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "stationpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(localStorage.getItem("station_ID")).toBe("station_001");
      expect(localStorage.getItem("user_type")).toBe("station");
    });
  });
});
