import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";


const mockLocalStorage = (accessToken, userType) => {
  window.localStorage.clear();
  window.localStorage.setItem("access_token", accessToken);
  window.localStorage.setItem("user_type", userType);
};

const renderWithRouter = (role, token = "mockToken") => {
  mockLocalStorage(token, role); 

  return render(
    <MemoryRouter initialEntries={["/adminDashboard"]}>
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

test("Admin can access the Admin Dashboard", async () => {
  renderWithRouter("admin"); 
  await waitFor(() => expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument());
});


