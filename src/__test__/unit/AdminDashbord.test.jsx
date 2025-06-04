import { describe, it, beforeEach, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminDashboard from "../../components/AdminDashboard";
import API from "../../api";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});


vi.mock("../../api", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockResponse = {
  data: {
    totalProcedures: 10,
    procedureCountByType: { PCI: 5, Angiography: 5 },
  },
};

describe("AdminDashboard Component", () => {
  beforeEach(() => {
    API.get.mockResolvedValue(mockResponse);
  });

  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeDefined();
  });

});
