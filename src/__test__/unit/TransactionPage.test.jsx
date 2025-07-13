import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TransactionPage from "../../pages/TransactionPage";
import { BrowserRouter as Router } from "react-router-dom";
import API from "../../api";
import { STATION_ID } from "../../constants";

// Set up fake localStorage for STATION_ID
beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (key) => {
        if (key === STATION_ID) return "ST001";
        return null;
      },
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    },
    writable: true,
  });
});

// Backup original API.get
const originalGet = API.get;

// Reset API.get after each test
afterEach(() => {
  API.get = originalGet;
});

const renderComponent = () =>
  render(
    <Router>
      <TransactionPage title="Station Transactions" />
    </Router>
  );

test("renders title and loading state", async () => {
  API.get = async () => new Promise(() => {}); // never resolve

  renderComponent();

  expect(screen.getByText("Station Transactions")).toBeInTheDocument();
  expect(screen.getByText("Loading transactions...")).toBeInTheDocument();
});

test("shows 'No transactions found' when both lists are empty", async () => {
  API.get = async () => ({ data: { arriving: [], departing: [] } });

  renderComponent();

  await waitFor(() =>
    expect(
      screen.getByText("No transactions found for the selected date.")
    ).toBeInTheDocument()
  );
});

