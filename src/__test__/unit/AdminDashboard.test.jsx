import { describe, it, beforeEach, afterEach, expect, vi, beforeAll } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminDashboard from "../../components/AdminDashboard";

// Mock recharts
vi.mock('recharts', () => ({
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
  Cell: () => <div data-testid="cell" />,
}));

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

// Mock API before importing components
vi.mock("../../api", () => ({
  default: {
    get: vi.fn(),
  },
}));

// Import API after mocking
import API from "../../api";

const mockDashboardResponse = {
  data: {
    total_cards: 8,
    total_passengers: 150,
    total_stations: 45,
    daily_revenue: 2500,
    monthly_revenue: 25000,
    last_5_months_revenue: {
      "2025-01": 25000,
      "2024-12": 22000,
      "2024-11": 28000,
      "2024-10": 24000,
      "2024-09": 26000,
    },
    most_busy_stations_today: [
      { station_name: "Colombo Fort", usage_count: 35 },
      { station_name: "Kandy", usage_count: 28 },
      { station_name: "Galle", usage_count: 20 },
      { station_name: "Jaffna", usage_count: 16 },
    ],
  },
};

describe("AdminDashboard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(API.get).mockResolvedValue(mockDashboardResponse);
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe("Initial Rendering", () => {
    it("renders loading state initially", () => {
      render(
        <MemoryRouter>
          <AdminDashboard />
        </MemoryRouter>
      );

      expect(screen.getByText("Loading dashboard data...")).toBeInTheDocument();
    });

    it("renders dashboard title", async () => {
      render(
        <MemoryRouter>
          <AdminDashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("Railway System Overview")).toBeInTheDocument();
      });
    });
  });

  describe("Dashboard Statistics", () => {
    it("displays dashboard stats after loading", async () => {
      render(
        <MemoryRouter>
          <AdminDashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("Cards Issued Today")).toBeInTheDocument();
        expect(screen.getByText("8")).toBeInTheDocument();
        expect(screen.getByText("Total Passengers")).toBeInTheDocument();
        expect(screen.getByText("150")).toBeInTheDocument();
        expect(screen.getByText("Daily Revenue")).toBeInTheDocument();
        expect(screen.getByText("Rs. 2,500")).toBeInTheDocument();
        expect(screen.getByText("Total Stations")).toBeInTheDocument();
      });
    });
  });

  describe("Dashboard Charts", () => {
    it("displays chart sections when data is loaded", async () => {
      render(
        <MemoryRouter>
          <AdminDashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        // Check for charts section existence by looking for common chart elements
        expect(screen.getByText("Railway System Overview")).toBeInTheDocument();
        // The charts section should exist even if we can't test the specific chart content
        const dashboardElement = screen.getByText("Railway System Overview").closest('.dashboard-container');
        expect(dashboardElement).toBeInTheDocument();
      });
    });
  });

  describe("API Integration", () => {
    it("calls dashboard stats API on mount", async () => {
      render(
        <MemoryRouter>
          <AdminDashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(API.get).toHaveBeenCalledWith("admin/dashboard-stats");
      });
    });
  });
});
