import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StationRegister from "../../pages/StationRegister";
import { vi } from "vitest";

// Define the mock inside the factory function
vi.mock("../../api", () => {
  return {
    default: {
      post: vi.fn(),
    },
  };
});

import API from "../../api";

describe("StationRegister Integration Test", () => {
  beforeEach(() => {
    API.post.mockReset(); // This will now work
  });

  it("registers a station successfully", async () => {
    API.post.mockResolvedValueOnce({ data: { message: "Success" } });

    render(
      <MemoryRouter>
        <StationRegister />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Station ID"), {
      target: { value: "ST001" },
    });
    fireEvent.change(screen.getByPlaceholderText("Station Name"), {
      target: { value: "Colombo Fort" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "station@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "0771234567" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
      expect(screen.getByText(/Registration successful/i)).toBeInTheDocument()
    );

    expect(API.post).toHaveBeenCalledWith(
      "signup/station/",
      {
        station_ID: "ST001",
        station_name: "Colombo Fort",
        email: "station@example.com",
        phone: "0771234567",
        password: "password123",
      },
      { headers: { "Content-Type": "application/json" } }
    );
  });

  it("shows validation errors when fields are empty", async () => {
    render(
      <MemoryRouter>
        <StationRegister />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findByText(/Station ID is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Station name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
  });
});
