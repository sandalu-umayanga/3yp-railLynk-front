import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PassengerRegister from "../../pages/PassengerRegister"; // update path
import API from "../../api";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const mockNavigate = vi.fn();

vi.mock('../../api', () => ({
  default: {
    post: vi.fn(),
  },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: actual.BrowserRouter,
    useNavigate: () => mockNavigate,
  };
});

describe("PassengerRegister Integration Test (Vitest)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
const fillAndSubmitForm = async () => {
  fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Confirm password/i), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Enter NIC/i), {
    target: { value: "123456789V" },
  });
  fireEvent.change(screen.getByPlaceholderText(/First Name/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Last Name/i), {
    target: { value: "Doe" },
  });

  const dobInput = document.querySelector('input[type="date"]');
  fireEvent.change(dobInput, {
    target: { value: "1990-01-01" },
  });

  fireEvent.change(screen.getByPlaceholderText(/Enter Address/i), {
    target: { value: "123 Main St" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Enter Phone/i), {
    target: { value: "0771234567" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Register/i }));
};



  it("should show API error message on failure", async () => {
    API.post.mockRejectedValueOnce({
      response: {
        data: { error: "Email already exists" },
      },
    });

    render(
      <BrowserRouter>
        <PassengerRegister />
      </BrowserRouter>
    );

    await fillAndSubmitForm();

    await waitFor(() => {
      expect(screen.getByText(/Email already exists/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Register/i })).not.toBeDisabled();
    });
  });
});
