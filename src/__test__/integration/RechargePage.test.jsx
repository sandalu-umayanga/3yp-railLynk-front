import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RechargePage from "../../pages/RechargePage";
import API from "../../api";
import { vi } from "vitest";

// Mock the API.patch method
vi.mock("../../api", () => ({
  default: {
    patch: vi.fn(),
  },
}));

describe("RechargePage Integration Test", () => {
  beforeEach(() => {
    API.patch.mockReset();
    localStorage.setItem("station_ID", "ST001"); // fake station ID
  });

  test("successfully recharges card", async () => {
    API.patch.mockResolvedValueOnce({ status: 200 });

    render(<RechargePage />);

    const inputs = screen.getAllByRole("textbox");
    const nicInput = inputs[0]; // first input is NIC
    const balanceInput = screen.getByRole("spinbutton"); // numeric input

    fireEvent.change(nicInput, { target: { value: "123456789V" } });
    fireEvent.change(balanceInput, { target: { value: "1000" } });

    const button = screen.getByRole("button", { name: /Recharge/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Recharge Successful!/i)).toBeInTheDocument();
    });

    expect(API.patch).toHaveBeenCalledWith("card/recharge/", {
      nic_number: "123456789V",
      balance: 1000,
      station_ID: "ST001",
    });
  });

  test("shows error when recharge fails", async () => {
    API.patch.mockRejectedValueOnce({
      response: { data: { message: "Invalid NIC" } },
    });

    render(<RechargePage />);

    const inputs = screen.getAllByRole("textbox");
    const nicInput = inputs[0];
    const balanceInput = screen.getByRole("spinbutton");

    fireEvent.change(nicInput, { target: { value: "987654321V" } });
    fireEvent.change(balanceInput, { target: { value: "500" } });

    const button = screen.getByRole("button", { name: /Recharge/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Invalid NIC/i)).toBeInTheDocument();
    });
  });
});
