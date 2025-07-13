import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AnnouncementCard from "../../components/AnnouncementCard";

// Mock the alert function
const mockAlert = vi.fn();
global.alert = mockAlert;

describe("AnnouncementCard", () => {
  const mockProps = {
    title: "Service Update",
    message: "Train services will be delayed by 15 minutes due to signal maintenance.",
    date: "2025-07-12"
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<AnnouncementCard {...mockProps} />);
  });

  it("should display the title", () => {
    render(<AnnouncementCard {...mockProps} />);
    
    expect(screen.getByRole("heading", { name: /service update/i })).toBeInTheDocument();
  });

  it("should display the message", () => {
    render(<AnnouncementCard {...mockProps} />);
    
    expect(screen.getByText(/train services will be delayed/i)).toBeInTheDocument();
  });

  it("should display the date", () => {
    render(<AnnouncementCard {...mockProps} />);
    
    expect(screen.getByText("2025-07-12")).toBeInTheDocument();
  });

  it("should have a Read More button", () => {
    render(<AnnouncementCard {...mockProps} />);
    
    const readMoreButton = screen.getByRole("button", { name: /read more/i });
    expect(readMoreButton).toBeInTheDocument();
  });

  it("should show alert with message when Read More is clicked", () => {
    render(<AnnouncementCard {...mockProps} />);
    
    const readMoreButton = screen.getByRole("button", { name: /read more/i });
    fireEvent.click(readMoreButton);
    
    expect(mockAlert).toHaveBeenCalledWith(mockProps.message);
  });

  it("should handle empty props gracefully", () => {
    render(<AnnouncementCard />);
    
    // Should render without crashing
    expect(screen.getByRole("button", { name: /read more/i })).toBeInTheDocument();
  });

  it("should handle missing title", () => {
    const propsWithoutTitle = {
      message: "Test message",
      date: "2025-07-12"
    };
    
    render(<AnnouncementCard {...propsWithoutTitle} />);
    
    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.getByText("2025-07-12")).toBeInTheDocument();
  });

  it("should handle missing message", () => {
    const propsWithoutMessage = {
      title: "Test Title",
      date: "2025-07-12"
    };
    
    render(<AnnouncementCard {...propsWithoutMessage} />);
    
    const readMoreButton = screen.getByRole("button", { name: /read more/i });
    fireEvent.click(readMoreButton);
    
    expect(mockAlert).toHaveBeenCalledWith(undefined);
  });

  it("should handle missing date", () => {
    const propsWithoutDate = {
      title: "Test Title",
      message: "Test message"
    };
    
    render(<AnnouncementCard {...propsWithoutDate} />);
    
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("should have correct CSS class", () => {
    const { container } = render(<AnnouncementCard {...mockProps} />);
    
    expect(container.querySelector(".announcement-card")).toBeInTheDocument();
  });

  it("should handle long messages", () => {
    const longMessageProps = {
      title: "Long Message Test",
      message: "This is a very long message that contains multiple sentences and should be handled properly by the component. It includes detailed information about train schedules, maintenance, and other important railway announcements.",
      date: "2025-07-12"
    };
    
    render(<AnnouncementCard {...longMessageProps} />);
    
    const readMoreButton = screen.getByRole("button", { name: /read more/i });
    fireEvent.click(readMoreButton);
    
    expect(mockAlert).toHaveBeenCalledWith(longMessageProps.message);
  });

  it("should handle special characters in props", () => {
    const specialCharProps = {
      title: "Special Characters: @#$%^&*()",
      message: "Message with émojis 🚂 and special chars: <>&\"'",
      date: "2025-07-12"
    };
    
    render(<AnnouncementCard {...specialCharProps} />);
    
    expect(screen.getByText(specialCharProps.title)).toBeInTheDocument();
    expect(screen.getByText(specialCharProps.message)).toBeInTheDocument();
  });
});
