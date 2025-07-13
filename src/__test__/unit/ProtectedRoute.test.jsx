import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';

// Mock window.alert
Object.defineProperty(window, 'alert', {
  value: vi.fn(),
  configurable: true,
});

// Mock child component
const TestComponent = () => <div>Protected Content</div>;
const RedirectComponent = () => <div>Redirect Page</div>;

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock localStorage
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
  });

  describe('Authentication Check', () => {
    it('renders protected content when user has correct role', () => {
      global.localStorage.getItem.mockImplementation((key) => {
        if (key === 'user_type') return 'admin';
        if (key === 'access_token') return 'valid-token';
        return null;
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
            <Route path="/" element={<RedirectComponent />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('redirects when user lacks required role', () => {
      global.localStorage.getItem.mockImplementation((key) => {
        if (key === 'user_type') return 'passenger';
        if (key === 'access_token') return 'valid-token';
        return null;
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
            <Route path="/" element={<RedirectComponent />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Redirect Page')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('redirects when user is not authenticated', () => {
      global.localStorage.getItem.mockReturnValue(null);

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
            <Route path="/login" element={<RedirectComponent />} />
          </Routes>
        </MemoryRouter>
      );

      // Since the component redirects immediately, we won't see the protected content
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      // The component should have triggered window.alert for unauthorized access
      expect(window.alert).toHaveBeenCalled();
    });

    it('allows access for multiple allowed roles', () => {
      global.localStorage.getItem.mockImplementation((key) => {
        if (key === 'user_type') return 'station';
        if (key === 'access_token') return 'valid-token';
        return null;
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute allowedRoles={['admin', 'station']} />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
            <Route path="/" element={<RedirectComponent />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  describe('Custom Redirect Path', () => {
    it('redirects to custom path when specified', () => {
      global.localStorage.getItem.mockReturnValue(null);

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute allowedRoles={['admin']} redirectPath="/login" />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/" element={<RedirectComponent />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty allowed roles array', () => {
      global.localStorage.getItem.mockImplementation((key) => {
        if (key === 'user_type') return 'admin';
        if (key === 'access_token') return 'valid-token';
        return null;
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute allowedRoles={[]} />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
            <Route path="/" element={<RedirectComponent />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Redirect Page')).toBeInTheDocument();
    });

    it('handles null user type', () => {
      global.localStorage.getItem.mockImplementation((key) => {
        if (key === 'user_type') return null;
        if (key === 'access_token') return 'valid-token';
        return null;
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
            <Route path="/" element={<RedirectComponent />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Redirect Page')).toBeInTheDocument();
    });

    it('handles case-sensitive role checking', () => {
      global.localStorage.getItem.mockImplementation((key) => {
        if (key === 'user_type') return 'Admin'; // Different case
        if (key === 'access_token') return 'valid-token';
        return null;
      });

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
            <Route path="/" element={<RedirectComponent />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Redirect Page')).toBeInTheDocument();
    });
  });
});
