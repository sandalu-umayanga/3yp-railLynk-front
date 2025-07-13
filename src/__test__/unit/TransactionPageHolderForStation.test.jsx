import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TransactionPageHolderForStation from "../../pages/TransactionPageHolderForStation";

// Mock the API
vi.mock("../../api", () => ({
  default: {
    get: vi.fn(),
  },
}));

// Import the mocked API
import API from '../../api';
const mockAPI = vi.mocked(API);

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

describe("TransactionPageHolderForStation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue('123');
    mockAPI.get.mockResolvedValue({ data: { arriving: [], departing: [] } });
  });

  const renderWithRouter = (component) => {
    return render(
      <MemoryRouter>
        {component}
      </MemoryRouter>
    );
  };

  it("should render without crashing", () => {
    renderWithRouter(<TransactionPageHolderForStation />);
  });

  it("should render TransactionPage component", () => {
    renderWithRouter(<TransactionPageHolderForStation />);
    
    expect(screen.getByText("Transactions History")).toBeInTheDocument();
  });

  it("should pass correct title to TransactionPage", () => {
    renderWithRouter(<TransactionPageHolderForStation />);
    
    expect(screen.getByText("Transactions History")).toBeInTheDocument();
  });

  it("should have correct component structure", () => {
    const { container } = renderWithRouter(<TransactionPageHolderForStation />);
    
    expect(container.firstChild.tagName).toBe("DIV");
    expect(container.querySelector('.transaction-container')).toBeInTheDocument();
  });

  it("should be a wrapper component for TransactionPage", () => {
    renderWithRouter(<TransactionPageHolderForStation />);
    
    // Should contain the TransactionPage with specific title
    expect(screen.getByText(/transactions history/i)).toBeInTheDocument();
  });
});
