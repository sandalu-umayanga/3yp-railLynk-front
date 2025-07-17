import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import AdminDashboard from "../../components/AdminDashboard";
import { BrowserRouter as Router } from "react-router-dom";
import API from "../../api";


beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});


// Manual mock for API.get
const originalAPIGet = API.get;

const mockStats = {
  total_cards: 12,
  total_passengers: 120,
  total_stations: 50,
  daily_revenue: 4500,
  monthly_revenue: 12000,
  last_5_months_revenue: {
    May: 12000,
    Apr: 11000,
    Mar: 9000,
    Feb: 10000,
    Jan: 8000,
  },
  most_busy_stations_today: [
    { station_name: "Colombo Fort", usage_count: 70 },
    { station_name: "Kandy", usage_count: 60 },
    { station_name: "Galle", usage_count: 50 },
  ],
};

beforeEach(() => {
  // Reset mocks before each test
  API.get = originalAPIGet;
  localStorage.clear();
});

afterEach(() => {
  // Restore API.get after each test
  API.get = originalAPIGet;
});

const renderDashboard = () =>
  render(
    <Router>
      <AdminDashboard />
    </Router>
  );

test("renders loading state initially", async () => {
  API.get = async () => ({ data: mockStats });

  renderDashboard();

  expect(screen.getByText(/Loading dashboard data.../i)).toBeInTheDocument();
});

test("renders dashboard stats after loading", async () => {
  API.get = async () => ({ data: mockStats });

  renderDashboard();

  await waitFor(() => {
    expect(screen.getByText(/Cards Issued Today/i)).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText(/Rs. 4,500/)).toBeInTheDocument();
    expect(screen.getByText(/Rs. 12,000/)).toBeInTheDocument();
  });
});
