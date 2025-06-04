import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PassengerTransactionPage from "../../pages/PassengerTransactionPage";
import { BrowserRouter as Router } from "react-router-dom";
import API from "../../api";
import { PASSENGER_ID } from "../../constants";

// Manual mock for localStorage
beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (key) => {
        if (key === PASSENGER_ID) return "123";
        return null;
      },
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    },
    writable: true,
  });
});

// Manual mock for API.get
const originalAPIGet = API.get;

afterEach(() => {
  API.get = originalAPIGet; // Restore original API method after each test
});

const renderPage = () =>
  render(
    <Router>
      <PassengerTransactionPage title="My Transactions" />
    </Router>
  );

test("renders title and date picker", () => {
  renderPage();
  expect(screen.getByText("My Transactions")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
});

test("shows loading and then transactions", async () => {
  API.get = async () => ({
    data: [
      {
        id: 1,
        S_station: "Gampaha",
        E_station: "Colombo Fort",
        amount: 120,
        date: new Date().toISOString(),
      },
    ],
  });

  renderPage();

  expect(screen.getByText(/loading transactions/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Gampaha")).toBeInTheDocument();
    expect(screen.getByText("Colombo Fort")).toBeInTheDocument();
    expect(screen.getByText(/Rs. 120/)).toBeInTheDocument();
  });
});

test("shows message for no transactions", async () => {
  API.get = async () => ({ data: [] });

  renderPage();

  await waitFor(() => {
    expect(screen.getByText("No transactions found.")).toBeInTheDocument();
  });
});

test("handles API error gracefully", async () => {
  API.get = async () => {
    throw new Error("Failed");
  };

  renderPage();

  await waitFor(() => {
    expect(screen.getByText("No transactions found.")).toBeInTheDocument();
  });
});

test("fetches again on date change and button click", async () => {
  let callCount = 0;

  API.get = async () => {
    callCount++;
    if (callCount === 1) return { data: [] }; // initial
    return {
      data: [
        {
          id: 2,
          S_station: "Jaffna",
          E_station: "Anuradhapura",
          amount: 200,
          date: new Date().toISOString(),
        },
      ],
    };
  };

  renderPage();

  // Initial empty
  await waitFor(() => {
    expect(screen.getByText("No transactions found.")).toBeInTheDocument();
  });

  // Change date
  const newDate = new Date().toISOString().split("T")[0];
  const dateInput = screen.getByDisplayValue(newDate);
  fireEvent.change(dateInput, { target: { value: newDate } });

  // Click Search
  fireEvent.click(screen.getByRole("button", { name: /search/i }));

  // Wait for new data
  await waitFor(() => {
    expect(screen.getByText("Jaffna")).toBeInTheDocument();
    expect(screen.getByText("Anuradhapura")).toBeInTheDocument();
    expect(screen.getByText(/Rs. 200/)).toBeInTheDocument();
  });
});
