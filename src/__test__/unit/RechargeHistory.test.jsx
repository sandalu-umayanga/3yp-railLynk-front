import { render, screen, waitFor } from "@testing-library/react";
import RechargeHistory from "../../pages/RechargeHistory";
import { BrowserRouter as Router } from "react-router-dom";
import API from "../../api";
import { PASSENGER_ID } from "../../constants";

// Simulate localStorage
beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (key) => {
        if (key === PASSENGER_ID) return "123"; // mock passenger ID
        return null;
      },
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    },
    writable: true,
  });
});

const originalAPIGet = API.get;

afterEach(() => {
  API.get = originalAPIGet; // restore after each test
});

const renderComponent = () =>
  render(
    <Router>
      <RechargeHistory title="My Recharge History" />
    </Router>
 );

test("renders title and shows loading state", async () => {
  API.get = async () => {
    return new Promise(() => {}); // never resolve to simulate loading
  };

  renderComponent();

  expect(screen.getByText("My Recharge History")).toBeInTheDocument();
  expect(screen.getByText("Loading recharge history...")).toBeInTheDocument();
});

test("shows 'No recharge history found.' when data is empty", async () => {
  API.get = async () => ({ data: [] });

  renderComponent();

  await waitFor(() =>
    expect(screen.getByText("No recharge history found.")).toBeInTheDocument()
  );
});

test("displays recharge table with data", async () => {
  const mockData = [
    {
      id: 1,
      amount: 500,
      date: new Date("2024-01-01T08:00:00Z").toISOString(),
    },
    {
      id: 2,
      amount: 1000,
      date: new Date("2024-01-02T09:30:00Z").toISOString(),
    },
  ];

  API.get = async () => ({ data: mockData });

  renderComponent();

  await waitFor(() => {
    expect(screen.getByText("Rs. 500")).toBeInTheDocument();
    expect(screen.getByText("Rs. 1000")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});

test("handles API errors and shows empty message", async () => {
  API.get = async () => {
    throw new Error("Server error");
  };

  renderComponent();

  await waitFor(() =>
    expect(screen.getByText("No recharge history found.")).toBeInTheDocument()
  );
});
