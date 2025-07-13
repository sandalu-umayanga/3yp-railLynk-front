import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminMain from "../../components/AdminMain";

describe("AdminMain", () => {
  it("should render without crashing", () => {
    render(<AdminMain />);
  });

  it("should display the dashboard title", () => {
    render(<AdminMain />);
    const title = screen.getByRole("heading", { name: /admin dashboard/i });
    expect(title).toBeInTheDocument();
  });

  it("should display stats cards with correct content", () => {
    render(<AdminMain />);
    
    // Check for Total Users card
    const totalUsersHeading = screen.getByRole("heading", { name: /total users/i });
    expect(totalUsersHeading).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();
    
    // Check for Active Tickets card
    const activeTicketsHeading = screen.getByRole("heading", { name: /active tickets/i });
    expect(activeTicketsHeading).toBeInTheDocument();
    expect(screen.getByText("567")).toBeInTheDocument();
  });

  it("should have correct CSS classes", () => {
    const { container } = render(<AdminMain />);
    
    expect(container.querySelector(".main-content")).toBeInTheDocument();
    expect(container.querySelector(".dashboard-title")).toBeInTheDocument();
    expect(container.querySelector(".stats-container")).toBeInTheDocument();
    expect(container.querySelectorAll(".stats-card")).toHaveLength(2);
  });

  it("should display stats in the correct structure", () => {
    render(<AdminMain />);
    
    const statsContainer = screen.getByText("Total Users").closest(".stats-container");
    expect(statsContainer).toBeInTheDocument();
    
    const statsCards = statsContainer.querySelectorAll(".stats-card");
    expect(statsCards).toHaveLength(2);
  });
});
