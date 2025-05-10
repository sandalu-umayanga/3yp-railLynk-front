import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PassengerRegister from "../pages/PassengerRegister";

test("displays password mismatch error", async () => {
  render(
    <MemoryRouter>
      <PassengerRegister />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText(/enter email/i);
  const passwordInput = screen.getByPlaceholderText(/enter password/i);
  const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "password456" } });


  fireEvent.click(screen.getByText(/register/i));

  const errorMessage = await screen.findByText(/passwords do not match/i);
  expect(errorMessage).toBeInTheDocument();
});