# RailLynk Component Architecture Guide

## 🧩 Component Architecture Overview

The RailLynk application follows a modern React component architecture with clear separation of concerns, reusable components, and consistent patterns. This guide provides detailed information about the component structure, design patterns, and implementation guidelines.

## 📋 Table of Contents

1. [Component Categories](#component-categories)
2. [Layout Components](#layout-components)
3. [Dashboard Components](#dashboard-components)
4. [Form Components](#form-components)
5. [UI Components](#ui-components)
6. [Utility Components](#utility-components)
7. [Component Patterns](#component-patterns)
8. [State Management](#state-management)
9. [Styling Guidelines](#styling-guidelines)
10. [Best Practices](#best-practices)

## 🗂️ Component Categories

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── AdminDashboard.jsx
│   ├── AdminMain.jsx
│   ├── AdminTracking.jsx
│   ├── AnnouncementCard.jsx
│   ├── Footer.jsx
│   ├── GooglePayRecharge.jsx
│   ├── LiveTracking.jsx
│   ├── Navbar.jsx
│   ├── PassengerDashboard.jsx
│   ├── PassengerTrainTracking.jsx
│   ├── ProtectedRoute.jsx
│   └── StationDashboard.jsx
└── pages/              # Route-specific page components
    ├── About.jsx
    ├── AdminLogin.jsx
    ├── CreateSmartTicket.jsx
    ├── Home.jsx
    ├── Login.jsx
    ├── PassengerProfile.jsx
    ├── PassengerRegister.jsx
    ├── PassengerTransactionPage.jsx
    ├── PassengersPage.jsx
    ├── RechargeHistory.jsx
    ├── RechargePage.jsx
    ├── StationRegister.jsx
    ├── TransactionPage.jsx
    └── TransactionPageHolderForStation.jsx
```

### Component Classification

#### 🎨 Layout Components
- **Purpose**: Structure and navigation
- **Examples**: Navbar, Footer, ProtectedRoute
- **Characteristics**: Used across multiple pages, minimal business logic

#### 📊 Dashboard Components
- **Purpose**: Data visualization and administration
- **Examples**: AdminDashboard, PassengerDashboard, StationDashboard
- **Characteristics**: Complex state management, API integration, real-time updates

#### 📝 Form Components
- **Purpose**: User input and data submission
- **Examples**: Login, Registration forms, CreateSmartTicket
- **Characteristics**: Form validation, error handling, submission logic

#### 🖥️ UI Components
- **Purpose**: Reusable interface elements
- **Examples**: AnnouncementCard, Buttons, Modals
- **Characteristics**: Minimal state, configurable props, focused functionality

#### 🛠️ Utility Components
- **Purpose**: Helper and wrapper components
- **Examples**: ProtectedRoute, ErrorBoundary
- **Characteristics**: Logic-focused, minimal UI, enhanced functionality

## 🔧 Layout Components

### Navbar Component
```javascript
// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check user authentication status
    const storedUserType = localStorage.getItem('user_type');
    setUserType(storedUserType);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserType(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Navigation implementation */}
    </nav>
  );
};
```

**Key Features:**
- **Responsive Design**: Mobile hamburger menu
- **Dynamic Content**: Role-based navigation items
- **Authentication State**: Login/logout functionality
- **Route Integration**: React Router navigation

**Props Interface:**
```typescript
interface NavbarProps {
  // No props - global component
}
```

### Footer Component
```javascript
// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>RailLynk</h3>
          <p>Modern railway management system</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
};
```

**Key Features:**
- **Static Content**: Company information and links
- **Responsive Layout**: Multi-column design
- **Consistent Styling**: Matches site theme

### ProtectedRoute Component
```javascript
// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, redirectPath = "/" }) => {
  const userType = localStorage.getItem('user_type');
  const accessToken = localStorage.getItem('access_token');

  // Check authentication
  if (!accessToken || !userType) {
    alert('Please log in to access this page');
    return <Navigate to={redirectPath} replace />;
  }

  // Check authorization
  if (allowedRoles && !allowedRoles.includes(userType)) {
    alert('You do not have permission to access this page');
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
```

**Key Features:**
- **Authentication Check**: Validates user login status
- **Authorization Control**: Role-based access control
- **Route Protection**: Prevents unauthorized access
- **Flexible Configuration**: Customizable roles and redirect paths

**Props Interface:**
```typescript
interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectPath?: string;
}
```

## 📊 Dashboard Components

### AdminDashboard Component
```javascript
// src/components/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from 'recharts';
import API from "../api";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalCardsIssuedToday: 0,
    totalPassengers: 0,
    dailyRevenue: 0,
    monthlyRevenue: 0,
    stationUsagePercentages: [],
    trainsTracking: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await API.get('/dashboard/stats');
      setDashboardStats(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Dashboard implementation */}
    </div>
  );
};
```

**Key Features:**
- **Real-time Data**: Auto-refresh functionality
- **Data Visualization**: Charts and graphs using Recharts
- **Loading States**: User feedback during data fetching
- **Error Handling**: Graceful error display
- **Responsive Design**: Works on all screen sizes

**State Management:**
```javascript
// Dashboard state structure
{
  dashboardStats: {
    totalCardsIssuedToday: number,
    totalPassengers: number,
    dailyRevenue: number,
    monthlyRevenue: object,
    stationUsagePercentages: array,
    trainsTracking: array
  },
  isLoading: boolean,
  error: string | null
}
```

### PassengerDashboard Component
```javascript
// src/components/PassengerDashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "../styles/passengerDashboard.css";

const PassengerDashboard = () => {
  const [passengerData, setPassengerData] = useState({
    balance: 0,
    recentTransactions: [],
    upcomingTrips: [],
    announcements: []
  });

  useEffect(() => {
    fetchPassengerData();
  }, []);

  const fetchPassengerData = async () => {
    try {
      const passengerId = localStorage.getItem('passenger_ID');
      const [balanceRes, transactionsRes, announcementsRes] = await Promise.all([
        API.get(`/passengers/${passengerId}/balance`),
        API.get(`/transactions/passenger/${passengerId}/recent`),
        API.get('/announcements/')
      ]);

      setPassengerData({
        balance: balanceRes.data.balance,
        recentTransactions: transactionsRes.data,
        upcomingTrips: [],
        announcements: announcementsRes.data
      });
    } catch (error) {
      console.error('Failed to fetch passenger data:', error);
    }
  };

  return (
    <div className="passenger-dashboard">
      {/* Passenger dashboard implementation */}
    </div>
  );
};
```

**Key Features:**
- **Account Overview**: Balance and recent activity
- **Quick Actions**: Easy access to common functions
- **Personalized Content**: User-specific information
- **Navigation Links**: Quick access to features

## 📝 Form Components

### Login Component
```javascript
// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_TYPE } from "../constants";
import "../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'passenger'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await API.post('/auth/login', {
        username: formData.email,
        password: formData.password,
        user_type: formData.userType
      });

      // Store authentication data
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      localStorage.setItem(USER_TYPE, response.data.user_type);
      
      // Navigate based on user type
      switch (response.data.user_type) {
        case 'passenger':
          navigate('/passengerDashboard');
          break;
        case 'station':
          navigate('/stationDashboard');
          break;
        case 'admin':
          navigate('/adminDashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        {/* Form implementation */}
      </form>
    </div>
  );
};
```

**Form Validation Pattern:**
```javascript
const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
```

### Registration Component Pattern
```javascript
// Common registration component pattern
const RegistrationComponent = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitForm(formData);
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields with error display */}
    </form>
  );
};
```

## 🖥️ UI Components

### AnnouncementCard Component
```javascript
// src/components/AnnouncementCard.jsx
import { useState } from "react";
import "../styles/announcementCard.css";

const AnnouncementCard = ({ 
  title, 
  message, 
  date, 
  priority = 'normal',
  isExpandable = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityClass = {
    low: 'announcement-low',
    normal: 'announcement-normal',
    high: 'announcement-high',
    urgent: 'announcement-urgent'
  };

  return (
    <div className={`announcement-card ${priorityClass[priority]}`}>
      <div className="announcement-header">
        <h3 className="announcement-title">{title}</h3>
        <span className="announcement-date">{date}</span>
      </div>
      
      <div className="announcement-content">
        <p className={`announcement-message ${isExpandable && !isExpanded ? 'truncated' : ''}`}>
          {message}
        </p>
        
        {isExpandable && (
          <button 
            className="expand-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};
```

**Props Interface:**
```typescript
interface AnnouncementCardProps {
  title: string;
  message: string;
  date: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  isExpandable?: boolean;
}
```

### Button Component Pattern
```javascript
// Reusable button component pattern
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const className = `${baseClass} ${variantClass} ${sizeClass}`;

  return (
    <button
      type={type}
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};
```

## 🛠️ Utility Components

### ErrorBoundary Component
```javascript
// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>We apologize for the inconvenience. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Loading Component
```javascript
// src/components/Loading.jsx
const Loading = ({ message = 'Loading...', size = 'medium' }) => {
  return (
    <div className={`loading-container loading-${size}`}>
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};
```

## 🎨 Component Patterns

### Higher-Order Component (HOC) Pattern
```javascript
// HOC for authentication
const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const userType = localStorage.getItem('user_type');
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
      return <div>Access Denied</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

// Usage
const ProtectedComponent = withAuth(MyComponent, ['admin', 'station']);
```

### Custom Hook Pattern
```javascript
// Custom hook for API data fetching
const useApiData = (endpoint, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get(endpoint);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
};

// Usage in component
const MyComponent = () => {
  const { data, loading, error } = useApiData('/api/data');

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Render data */}</div>;
};
```

### Compound Component Pattern
```javascript
// Modal compound component
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Modal.Header = ({ children }) => (
  <div className="modal-header">{children}</div>
);

Modal.Body = ({ children }) => (
  <div className="modal-body">{children}</div>
);

Modal.Footer = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

// Usage
<Modal isOpen={isModalOpen} onClose={closeModal}>
  <Modal.Header>
    <h2>Modal Title</h2>
  </Modal.Header>
  <Modal.Body>
    <p>Modal content</p>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={closeModal}>Close</Button>
  </Modal.Footer>
</Modal>
```

## 🗃️ State Management

### Component State Patterns

#### Simple State
```javascript
const [value, setValue] = useState(initialValue);
```

#### Object State
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: ''
});

// Update specific field
const updateField = (field, value) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};
```

#### Array State
```javascript
const [items, setItems] = useState([]);

// Add item
const addItem = (newItem) => {
  setItems(prev => [...prev, newItem]);
};

// Remove item
const removeItem = (id) => {
  setItems(prev => prev.filter(item => item.id !== id));
};

// Update item
const updateItem = (id, updates) => {
  setItems(prev => prev.map(item => 
    item.id === id ? { ...item, ...updates } : item
  ));
};
```

### useReducer Pattern
```javascript
const initialState = {
  data: null,
  loading: false,
  error: null
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const MyComponent = () => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const fetchData = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await API.get('/data');
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  return (
    <div>
      {/* Component implementation */}
    </div>
  );
};
```

## 🎨 Styling Guidelines

### CSS Module Pattern
```css
/* component.module.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
}

.button {
  background-color: var(--button-bg);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: var(--button-hover-bg);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### CSS Variables
```css
:root {
  /* Colors */
  --primary-color: #1e40af;
  --secondary-color: #059669;
  --danger-color: #dc2626;
  --warning-color: #f59e0b;
  --success-color: #10b981;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Borders */
  --border-radius: 0.375rem;
  --border-width: 1px;
}
```

### Responsive Design Pattern
```css
.component {
  /* Mobile first */
  padding: 1rem;
}

@media (min-width: 768px) {
  .component {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .component {
    padding: 3rem;
  }
}
```

## ✅ Best Practices

### Component Structure
```javascript
// 1. Imports (grouped logically)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import Button from './Button';
import './ComponentName.css';

// 2. TypeScript interfaces (if using TypeScript)
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

// 3. Component definition
const ComponentName = ({ prop1, prop2 = 0 }) => {
  // 4. State declarations
  const [state, setState] = useState(initialValue);
  
  // 5. Hooks
  const navigate = useNavigate();
  
  // 6. Effect hooks
  useEffect(() => {
    // Side effects
  }, []);
  
  // 7. Event handlers
  const handleEvent = () => {
    // Event handling logic
  };
  
  // 8. Helper functions
  const helperFunction = () => {
    // Helper logic
  };
  
  // 9. Early returns
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  
  // 10. Main render
  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};

// 11. Default props (if needed)
ComponentName.defaultProps = {
  prop2: 0
};

// 12. Export
export default ComponentName;
```

### Performance Optimization
```javascript
// 1. Use React.memo for pure components
const PureComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// 2. Use useCallback for event handlers
const handleClick = useCallback(() => {
  // Click handler logic
}, [dependency]);

// 3. Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// 4. Lazy load components
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Usage with Suspense
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### Error Handling
```javascript
// 1. Error boundaries for catching JavaScript errors
<ErrorBoundary>
  <ComponentThatMightFail />
</ErrorBoundary>

// 2. Try-catch in async functions
const handleSubmit = async () => {
  try {
    await API.post('/endpoint', data);
    // Success handling
  } catch (error) {
    setError(error.message);
    // Error handling
  }
};

// 3. Conditional rendering for error states
{error && (
  <div className="error-message">
    {error}
  </div>
)}
```

### Accessibility
```javascript
// 1. Semantic HTML
<main role="main">
  <section aria-labelledby="section-title">
    <h2 id="section-title">Section Title</h2>
  </section>
</main>

// 2. Form labels
<label htmlFor="email">Email:</label>
<input 
  id="email" 
  type="email" 
  aria-required="true"
  aria-describedby="email-help"
/>
<div id="email-help">Enter your email address</div>

// 3. Button accessibility
<button 
  aria-label="Close modal"
  onClick={closeModal}
>
  <CloseIcon aria-hidden="true" />
</button>
```

---

*Component Architecture Guide Version: 1.0.0*  
*Last Updated: July 13, 2025*  
*Framework: React 19.0.0*
