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
  total_cards_issued_today: 12,
  total_passengers: 120,
  daily_revenue: 4500,
  monthly_revenue_last_6_months: {
    May: 12000,
    Apr: 11000,
    Mar: 9000,
    Feb: 10000,
    Jan: 8000,
    Dec: 7500,
  },
  station_usage_percentages: [
    { station: "Colombo Fort", percentage: 70 },
    { station: "Kandy", percentage: 60 },
    { station: "Galle", percentage: 50 },
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
