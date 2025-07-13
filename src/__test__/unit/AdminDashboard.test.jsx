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
    total_cards_issued_today: 8,
    total_passengers: 150,
    daily_revenue: 2500,
    monthly_revenue_last_6_months: {
      "2025-01": 25000,
      "2024-12": 22000,
      "2024-11": 28000,
      "2024-10": 24000,
      "2024-09": 26000,
      "2024-08": 23000,
    },
    station_usage_percentages: [
      { station: "Colombo Fort", percentage: 35.5 },
      { station: "Kandy", percentage: 28.2 },
      { station: "Galle", percentage: 20.1 },
      { station: "Jaffna", percentage: 16.2 },
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
      });
    });
  });

  describe("Live Train Tracking with Timestamps", () => {
    it("displays live train tracking table with timestamps", async () => {
      render(
        <MemoryRouter>
          <AdminDashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("Live Train Tracking")).toBeInTheDocument();
        expect(screen.getByText("Last Updated")).toBeInTheDocument();
      });
    });

    it("displays timestamp legend", async () => {
      render(
        <MemoryRouter>
          <AdminDashboard />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText("● Fresh (≤2 min)")).toBeInTheDocument();
        expect(screen.getByText("● Stale (2-5 min)")).toBeInTheDocument();
        expect(screen.getByText("● Old (>5 min)")).toBeInTheDocument();
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
