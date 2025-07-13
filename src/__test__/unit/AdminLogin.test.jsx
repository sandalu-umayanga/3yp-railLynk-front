import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminLogin from "../../pages/AdminLogin";

// Mock the useNavigate hook
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the API
vi.mock("../../api", () => ({
  default: {
    post: vi.fn(),
  },
}));

// Import API after mocking
import API from "../../api";

// Mock constants
vi.mock("../../constants", () => ({
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_TYPE: "user_type",
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock alert
const mockAlert = vi.fn();
global.alert = mockAlert;

// Mock window.dispatchEvent
const mockDispatchEvent = vi.fn();
global.window.dispatchEvent = mockDispatchEvent;

describe("AdminLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console methods
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  const renderWithRouter = (component) => {
    return render(
      <MemoryRouter>
        {component}
      </MemoryRouter>
    );
  };

  it("should render without crashing", () => {
    renderWithRouter(<AdminLogin />);
    expect(screen.getByText(/admin login/i)).toBeInTheDocument();
  });

  it("should display username and password fields", () => {
    renderWithRouter(<AdminLogin />);
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("should display login button", () => {
    renderWithRouter(<AdminLogin />);
    
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should allow typing in username field", () => {
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    
    expect(usernameInput.value).toBe("admin");
  });

  it("should allow typing in password field", () => {
    renderWithRouter(<AdminLogin />);
    
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    expect(passwordInput.value).toBe("password123");
  });

  it("should show validation error when fields are empty", async () => {
    renderWithRouter(<AdminLogin />);
    
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
    });
  });

  it("should show validation error when only username is filled", async () => {
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
    });
  });

  it("should show validation error when only password is filled", async () => {
    renderWithRouter(<AdminLogin />);
    
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
    });
  });

  it("should handle successful login", async () => {
    const mockLoginResponse = {
      data: {
        access: "mock_access_token",
        refresh: "mock_refresh_token",
        user_type: "admin"
      }
    };
    
    vi.mocked(API.post).mockResolvedValue(mockLoginResponse);
    
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(API.post).toHaveBeenCalledWith("login/", {
        username: "admin",
        password: "password123"
      });
    });
    
    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith("access_token", "mock_access_token");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith("refresh_token", "mock_refresh_token");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith("user_type", "admin");
    });
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/adminDashboard");
    });
  });

  it("should handle login failure", async () => {
    vi.mocked(API.post).mockRejectedValue({
      response: {
        data: {
          error: "Invalid credentials"
        }
      }
    });
    
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("should show loading state during login", async () => {
    vi.mocked(API.post).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ data: {} }), 100))
    );
    
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    
    expect(screen.getByText(/logging in/i)).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it("should clear localStorage before login", async () => {
    vi.mocked(API.post).mockResolvedValue({
      data: {
        access: "mock_access_token",
        refresh: "mock_refresh_token",
        user_type: "admin"
      }
    });
    
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(mockLocalStorage.clear).toHaveBeenCalled();
    });
  });

  it("should dispatch userTypeChanged event after successful login", async () => {
    vi.mocked(API.post).mockResolvedValue({
      data: {
        access: "mock_access_token",
        refresh: "mock_refresh_token",
        user_type: "admin"
      }
    });
    
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(mockDispatchEvent).toHaveBeenCalledWith(expect.any(Event));
    });
  });

  it("should handle missing tokens in response", async () => {
    vi.mocked(API.post).mockResolvedValue({
      data: {
        // Missing access and refresh tokens
        user_type: "admin"
      }
    });
    
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });

  it("should handle network errors", async () => {
    vi.mocked(API.post).mockRejectedValue(new Error("Network error"));
    
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });
});
