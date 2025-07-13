# RailLynk - Railway Management System

## 🚂 Project Overview

RailLynk is a comprehensive railway management system designed to streamline train operations, passenger services, and administrative tasks. The system provides a modern web-based interface for managing railway operations, passenger registration, ticketing, and real-time train tracking.

### 🎯 Vision
To modernize railway operations through digital transformation, providing efficient, user-friendly, and reliable services for passengers, station operators, and administrators.

### 🌟 Mission
Deliver a robust, scalable railway management platform that enhances operational efficiency, improves passenger experience, and provides comprehensive administrative oversight.

## 📊 Project Information

| Property | Value |
|----------|-------|
| **Project Name** | RailLynk |
| **Version** | 0.0.0 |
| **Type** | Railway Management System (Frontend) |
| **Framework** | React 19.0.0 with Vite |
| **Status** | Development |
| **Last Updated** | July 13, 2025 |

## 🏗️ Architecture Overview

### System Architecture
```
┌─────────────────────────────────────────────┐
│                Frontend (React)              │
├─────────────────────────────────────────────┤
│  ┌─────────────┐ ┌──────────────┐ ┌────────┐ │
│  │   Admin     │ │  Passenger   │ │Station │ │
│  │ Dashboard   │ │  Interface   │ │Portal  │ │
│  └─────────────┘ └──────────────┘ └────────┘ │
├─────────────────────────────────────────────┤
│            API Layer (Axios)                │
├─────────────────────────────────────────────┤
│          Backend API (raillynk.site)        │
├─────────────────────────────────────────────┤
│  ┌─────────────┐ ┌──────────────┐ ┌────────┐ │
│  │  Database   │ │    Auth      │ │ Maps   │ │
│  │   Layer     │ │   Service    │ │Service │ │
│  └─────────────┘ └──────────────┘ └────────┘ │
└─────────────────────────────────────────────┘
```

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
├── pages/              # Route-specific page components
├── styles/             # CSS styling files
├── __test__/           # Test files (unit & integration)
├── mocks/              # Testing mock handlers
├── assets/             # Static assets
├── api.js              # API configuration
├── constants.js        # Application constants
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## 🚀 Key Features

### 👨‍💼 Administrator Features
- **Comprehensive Dashboard**: Real-time analytics and system overview
- **User Management**: Passenger and station registration/management
- **Revenue Analytics**: Financial reporting and revenue tracking
- **Live Train Tracking**: Real-time GPS monitoring with timestamps
- **System Administration**: Complete control over railway operations
- **Reports & Analytics**: Detailed operational reports

### 👥 Passenger Features
- **User Registration**: Simple and secure account creation
- **Smart Ticketing**: Digital ticket creation and management
- **Transaction History**: Complete payment and travel history
- **Account Management**: Profile updates and settings
- **Recharge System**: Balance top-up functionality
- **Train Tracking**: Real-time train location monitoring

### 🚉 Station Operator Features
- **Station Dashboard**: Station-specific operational overview
- **Transaction Management**: Handle passenger transactions
- **Train Schedule**: Monitor arrivals and departures
- **Passenger Services**: Assist with ticketing and queries
- **Real-time Updates**: Live operational information

### 🔧 System Features
- **Role-Based Access Control**: Secure multi-user authentication
- **Real-time Data**: Live updates and notifications
- **Responsive Design**: Mobile-friendly interface
- **Map Integration**: Google Maps and Leaflet integration
- **Payment Processing**: Secure transaction handling
- **API Integration**: RESTful API communication

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0.0 | UI Framework |
| **Vite** | 6.1.0 | Build Tool & Dev Server |
| **React Router DOM** | 7.2.0 | Client-side Routing |
| **Axios** | 1.7.9 | HTTP Client |
| **React Icons** | 5.5.0 | Icon Library |
| **Recharts** | 2.15.4 | Data Visualization |

### Mapping & Location
| Technology | Version | Purpose |
|------------|---------|---------|
| **Leaflet** | 1.9.4 | Interactive Maps |
| **React Leaflet** | 5.0.0 | React Leaflet Integration |
| **Google Maps API** | 2.20.6 | Google Maps Integration |

### UI & Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| **CSS3** | - | Component Styling |
| **React Calendar** | 5.1.0 | Date Selection |
| **Responsive Design** | - | Mobile Compatibility |

### Development & Testing
| Technology | Version | Purpose |
|------------|---------|---------|
| **Vitest** | 3.0.5 | Testing Framework |
| **React Testing Library** | 16.2.0 | Component Testing |
| **ESLint** | 9.19.0 | Code Linting |
| **jsdom** | 26.0.0 | DOM Testing Environment |

## 📁 Project Structure

### Root Directory
```
raillynk/
├── public/                    # Static assets
│   ├── railways_lka.geojson  # Sri Lankan railway map data
│   ├── railways_with_dummy_line.geojson
│   └── vite.svg              # Vite logo
├── src/                      # Source code
├── dist/                     # Build output
├── node_modules/             # Dependencies
├── .git/                     # Git repository
├── .github/                  # GitHub configurations
├── package.json              # Project configuration
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
└── README.md                # Project documentation
```

### Source Code Structure (`src/`)
```
src/
├── components/               # Reusable Components
│   ├── AdminDashboard.jsx   # Admin dashboard interface
│   ├── AdminMain.jsx        # Admin main navigation
│   ├── AdminTracking.jsx    # Admin train tracking
│   ├── AnnouncementCard.jsx # Announcement display
│   ├── Footer.jsx           # Site footer
│   ├── GooglePayRecharge.jsx # Payment integration
│   ├── LiveTracking.jsx     # Live train tracking
│   ├── Navbar.jsx           # Navigation bar
│   ├── PassengerDashboard.jsx # Passenger interface
│   ├── PassengerTrainTracking.jsx # Passenger tracking
│   ├── ProtectedRoute.jsx   # Route protection
│   └── StationDashboard.jsx # Station interface
├── pages/                   # Page Components
│   ├── About.jsx            # About page
│   ├── AdminLogin.jsx       # Admin login
│   ├── CreateSmartTicket.jsx # Ticket creation
│   ├── Home.jsx             # Landing page
│   ├── Login.jsx            # User login
│   ├── PassengerProfile.jsx # Passenger profile
│   ├── PassengerRegister.jsx # Passenger registration
│   ├── PassengerTransactionPage.jsx # Transaction history
│   ├── PassengersPage.jsx   # Passengers listing
│   ├── RechargeHistory.jsx  # Recharge history
│   ├── RechargePage.jsx     # Account recharge
│   ├── StationRegister.jsx  # Station registration
│   ├── TransactionPage.jsx  # Transactions
│   └── TransactionPageHolderForStation.jsx
├── styles/                  # CSS Stylesheets
│   ├── about.css           # About page styles
│   ├── adminDashboard.css  # Admin dashboard styles
│   ├── adminLogin.css      # Admin login styles
│   ├── adminMain.css       # Admin main styles
│   ├── adminTracking.css   # Admin tracking styles
│   ├── announcementCard.css # Announcement styles
│   ├── footer.css          # Footer styles
│   ├── googlePayRecharge.css # Payment styles
│   ├── home.css            # Home page styles
│   ├── liveTracking.css    # Live tracking styles
│   ├── login.css           # Login styles
│   ├── navbar.css          # Navigation styles
│   ├── passengerDashboard.css # Passenger dashboard styles
│   ├── passengerProfile.css # Passenger profile styles
│   ├── passengersPage.css  # Passengers page styles
│   ├── passengerTrainTracking.css # Passenger tracking styles
│   ├── rechargeHistory.css # Recharge history styles
│   ├── rechargePage.css    # Recharge page styles
│   ├── register.css        # Registration styles
│   ├── stationDashboard.css # Station dashboard styles
│   ├── ticket.css          # Ticket styles
│   └── transactionPage.css # Transaction styles
├── __test__/               # Test Files
│   ├── integration/        # Integration tests
│   ├── unit/              # Unit tests
│   └── mocks/             # Test mocks
├── assets/                 # Static Assets
│   ├── react.svg          # React logo
│   └── train_back.jpg     # Background image
├── api.js                 # API configuration
├── constants.js           # Application constants
├── App.jsx                # Main app component
├── App.css                # Global app styles
├── index.css              # Global styles
├── main.jsx               # App entry point
└── setupTests.js          # Test setup
```

## 🔐 Authentication & Authorization

### User Roles & Permissions

#### 🛡️ Admin Role
**Permissions:**
- Full system access
- User management (create, read, update, delete)
- Station management
- Financial reports and analytics
- System configuration
- Live train tracking oversight

**Protected Routes:**
- `/adminDashboard`
- `/stationRegister`
- `/passengersPage`
- Admin-specific features

#### 👤 Passenger Role
**Permissions:**
- Personal account management
- Ticket purchasing and management
- Transaction history viewing
- Profile updates
- Recharge account balance
- Train tracking access

**Protected Routes:**
- `/passengerDashboard`
- `/passengerProfile`
- `/passengerTransactionPage`
- `/rechargeHistory`
- `/rechargePage`

#### 🚉 Station Role
**Permissions:**
- Station-specific operations
- Passenger assistance
- Transaction processing
- Local train scheduling
- Station reports

**Protected Routes:**
- `/stationDashboard`
- `/transactionPageHolderForStation`
- Station-specific features

### Authentication Flow
```
1. User accesses login page
2. Credentials validated against API
3. JWT tokens stored in localStorage
4. User role determined and stored
5. Route access controlled by ProtectedRoute component
6. API requests include Bearer token
7. Token refresh handled automatically
```

## 🌐 API Integration

### API Configuration
```javascript
// Base URL: https://raillynk.site/api/
// Authentication: Bearer Token (JWT)
// Content-Type: application/json
```

### API Endpoints

#### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout

#### User Management
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/passengers` - List passengers (Admin)
- `POST /users/passenger/register` - Register passenger

#### Station Management
- `GET /stations/` - List all stations
- `POST /stations/register` - Register new station
- `GET /stations/{id}` - Get station details

#### Transaction Management
- `GET /transactions/` - Get transaction history
- `POST /transactions/recharge` - Process recharge
- `GET /transactions/passenger/{id}` - Passenger transactions

#### Dashboard & Analytics
- `GET /dashboard/stats` - Dashboard statistics
- `GET /dashboard/revenue` - Revenue analytics
- `GET /dashboard/trains` - Train tracking data

### API Request Interceptors
```javascript
// Automatic token attachment
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🗺️ Routing Architecture

### Route Structure
```javascript
// Public Routes (No authentication required)
/                    # Home page
/about              # About page
/login              # Login page
/adminLogin         # Admin login

// Admin Routes (Admin role required)
/adminDashboard     # Admin dashboard
/stationRegister    # Station registration
/passengersPage     # Passengers management

// Passenger Routes (Passenger role required)
/passengerDashboard        # Passenger dashboard
/passengerProfile          # Profile management
/passengerTransactionPage  # Transaction history
/rechargeHistory          # Recharge history
/rechargePage             # Account recharge
/createSmartTicket        # Ticket creation
/passengerTrainTracking   # Train tracking

// Station Routes (Station role required)
/stationDashboard                # Station dashboard
/transactionPageHolderForStation # Station transactions

// Shared Routes (Admin & Station access)
/passengerRegister       # Passenger registration
```

### Protected Route Implementation
```javascript
// Route protection based on user roles
<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
  <Route path="/adminDashboard" element={<AdminDashboard />} />
</Route>
```

## 💾 State Management

### Local Storage Usage
```javascript
// Authentication Data
localStorage.setItem('access_token', token);
localStorage.setItem('refresh_token', refreshToken);
localStorage.setItem('user_type', userType);
localStorage.setItem('user_data', userData);

// User-specific Data
localStorage.setItem('station_ID', stationId);
localStorage.setItem('passenger_ID', passengerId);
```

### Component State Patterns
- **useState**: Local component state
- **useEffect**: Side effects and API calls
- **React Router**: Navigation state
- **Context API**: Not currently implemented (potential enhancement)

## 🎨 UI/UX Design

### Design Principles
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and semantic HTML
- **Consistent Styling**: Modular CSS approach
- **User-Centric**: Intuitive navigation and workflows

### Color Scheme & Branding
```css
/* Primary Colors */
--primary-blue: #1e40af;
--primary-green: #059669;
--primary-red: #dc2626;

/* Secondary Colors */
--light-gray: #f8fafc;
--dark-gray: #374151;
--white: #ffffff;

/* Status Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Typography
- **Primary Font**: System default
- **Headings**: Bold, hierarchical sizing
- **Body Text**: Regular weight, optimal line height
- **Icons**: React Icons library

### Layout Patterns
- **Grid Layout**: CSS Grid for complex layouts
- **Flexbox**: Component-level alignment
- **Card Design**: Information grouping
- **Dashboard Layout**: Sidebar navigation with main content area

## 📱 Components Architecture

### Component Categories

#### 🧩 Layout Components
- **Navbar**: Global navigation with role-based menus
- **Footer**: Site information and links
- **ProtectedRoute**: Authentication and authorization wrapper

#### 📊 Dashboard Components
- **AdminDashboard**: Complete admin interface with analytics
- **PassengerDashboard**: Passenger-specific interface
- **StationDashboard**: Station operations interface
- **AdminMain**: Admin navigation and layout

#### 🎫 Transaction Components
- **TransactionPage**: Transaction display and management
- **RechargePage**: Account balance management
- **CreateSmartTicket**: Ticket creation interface

#### 🗺️ Tracking Components
- **LiveTracking**: Real-time train location monitoring
- **AdminTracking**: Admin train tracking interface
- **PassengerTrainTracking**: Passenger train tracking

#### 💳 Payment Components
- **GooglePayRecharge**: Google Pay integration
- **RechargeHistory**: Payment history display

#### 🔔 Information Components
- **AnnouncementCard**: System announcements display

### Component Props & State Patterns

#### Typical Component Structure
```javascript
const ComponentName = ({ prop1, prop2 }) => {
  // State management
  const [state, setState] = useState(initialValue);
  
  // API calls and side effects
  useEffect(() => {
    // Fetch data or setup subscriptions
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = () => {
    // Handle user interactions
  };
  
  // Render component
  return (
    <div className="component-container">
      {/* Component JSX */}
    </div>
  );
};
```

#### Common Props Patterns
- **Data Props**: `data`, `items`, `user`
- **Callback Props**: `onSubmit`, `onChange`, `onClick`
- **Configuration Props**: `isVisible`, `disabled`, `variant`
- **Navigation Props**: `redirectPath`, `allowedRoles`

## 🔧 Development Workflow

### Getting Started

#### Prerequisites
```bash
# Required software
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

#### Installation
```bash
# Clone repository
git clone <repository-url>
cd raillynk

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

#### Environment Setup
```bash
# Development environment
npm run dev        # Start dev server with hot reload

# Production build
npm run build      # Build for production
npm run preview    # Preview production build

# Testing
npm test           # Run test suite
npm test -- --coverage  # Run with coverage

# Code quality
npm run lint       # Run ESLint
```

### Development Standards

#### Code Style Guidelines
```javascript
// Use functional components with hooks
const ComponentName = () => {
  // Component logic
};

// Use arrow functions for event handlers
const handleClick = () => {
  // Handler logic
};

// Use descriptive variable names
const [isLoading, setIsLoading] = useState(false);
const [userData, setUserData] = useState(null);
```

#### File Naming Conventions
- **Components**: PascalCase (e.g., `AdminDashboard.jsx`)
- **Pages**: PascalCase (e.g., `PassengerProfile.jsx`)
- **Styles**: camelCase (e.g., `adminDashboard.css`)
- **Utilities**: camelCase (e.g., `api.js`, `constants.js`)

#### Import Organization
```javascript
// External libraries
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Internal components
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

// Utilities and constants
import API from '../api';
import { ACCESS_TOKEN } from '../constants';

// Styles
import '../styles/componentName.css';
```

### Git Workflow
```bash
# Feature development
git checkout -b feature/feature-name
git add .
git commit -m "Add: Feature description"
git push origin feature/feature-name

# Create pull request for code review
```

## 🧪 Testing Strategy

### Testing Framework
- **Test Runner**: Vitest 3.0.5
- **Testing Library**: React Testing Library 16.2.0
- **DOM Environment**: jsdom 26.0.0
- **Assertion Library**: Vitest with Jest-DOM matchers

### Test Coverage Summary
| Category | Files | Tests | Coverage |
|----------|-------|-------|----------|
| **Unit Tests** | 23 | 92 | 88.5% |
| **Integration Tests** | 6 | 12 | 11.5% |
| **Total** | 29 | 104 | 100% Pass Rate |

### Testing Categories

#### 🔐 Authentication Testing (30 tests)
- Login workflows for all user types
- Registration processes
- Route protection verification
- Token management validation

#### 📊 Dashboard Testing (14 tests)
- Admin dashboard functionality
- Real-time data display
- User interaction handling
- API integration verification

#### 🖥️ UI Component Testing (27 tests)
- Component rendering validation
- User interaction simulation
- Responsive behavior verification
- Accessibility compliance

#### 💳 Transaction Testing (13 tests)
- Payment processing workflows
- Transaction history display
- Error handling verification
- Balance management testing

### Running Tests
```bash
# Run all tests
npm test -- --run

# Run tests in watch mode
npm test

# Run with coverage report
npm test -- --coverage

# Run specific test file
npm test ComponentName.test.jsx
```

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Output directory: dist/
# Contains optimized, minified assets
```

### Deployment Checklist
- [ ] Run test suite (`npm test -- --run`)
- [ ] Build production bundle (`npm run build`)
- [ ] Verify environment variables
- [ ] Test API connectivity
- [ ] Validate authentication flows
- [ ] Check responsive design
- [ ] Verify map integrations
- [ ] Test payment processing

### Environment Configuration
```javascript
// Production API endpoint
const API_BASE_URL = 'https://raillynk.site/api/';

// Development API endpoint
const API_BASE_URL = 'http://localhost:8000/api/';
```

## 🔒 Security Considerations

### Authentication Security
- **JWT Token Storage**: Secure localStorage implementation
- **Token Refresh**: Automatic token renewal
- **Route Protection**: Role-based access control
- **API Security**: Bearer token authentication

### Data Security
- **Input Validation**: Client-side form validation
- **XSS Protection**: React's built-in XSS prevention
- **HTTPS**: Secure data transmission
- **API Endpoint Security**: Authenticated API requests

### Privacy Considerations
- **User Data Protection**: Minimal data storage
- **Session Management**: Secure session handling
- **Payment Security**: Secure payment processing
- **Data Encryption**: API communication encryption

## 🐛 Troubleshooting

### Common Issues

#### Development Server Issues
```bash
# Port already in use
Error: Port 5173 is already in use

# Solution
npm run dev -- --port 3000
# Or kill process using port 5173
```

#### API Connection Issues
```bash
# CORS errors
Access to fetch blocked by CORS policy

# Solution
# Check API server CORS configuration
# Verify API endpoint URLs
# Check network connectivity
```

#### Authentication Issues
```bash
# Token expired
401 Unauthorized

# Solution
# Clear localStorage
localStorage.clear();
# Re-login to get new tokens
```

#### Map Integration Issues
```bash
# Leaflet map not loading
Map container not found

# Solution
# Ensure map container has dimensions
# Check Leaflet CSS imports
# Verify map initialization timing
```

### Debug Tools
```bash
# React Developer Tools
# Browser extension for React debugging

# Network Tab
# Monitor API requests and responses

# Console Logging
console.log('Debug information');

# Error Boundaries
# Implement error boundaries for graceful error handling
```

## 📈 Performance Optimization

### Frontend Performance
- **Code Splitting**: Dynamic imports for route-based splitting
- **Lazy Loading**: Component lazy loading implementation
- **Bundle Optimization**: Vite's built-in optimization
- **Asset Optimization**: Image and static asset optimization

### API Performance
- **Request Caching**: Implement API response caching
- **Batch Requests**: Combine multiple API calls
- **Loading States**: User feedback during API calls
- **Error Handling**: Graceful error recovery

### User Experience
- **Loading Indicators**: Visual feedback for async operations
- **Responsive Design**: Optimal mobile experience
- **Accessibility**: Screen reader and keyboard navigation support
- **Progressive Enhancement**: Core functionality without JavaScript

## 🔮 Future Enhancements

### Planned Features
- **Real-time Notifications**: WebSocket integration
- **Offline Support**: Progressive Web App (PWA) features
- **Multi-language Support**: Internationalization (i18n)
- **Advanced Analytics**: Enhanced reporting and dashboard features
- **Mobile App**: React Native mobile application
- **Third-party Integrations**: Payment gateways, SMS services

### Technical Improvements
- **State Management**: Redux or Zustand implementation
- **Type Safety**: TypeScript migration
- **Testing**: Enhanced E2E testing with Playwright
- **Performance**: Server-side rendering (SSR) with Next.js
- **Monitoring**: Error tracking and performance monitoring
- **Documentation**: Interactive API documentation

### Scalability Considerations
- **Microservices**: API microservices architecture
- **CDN Integration**: Global content delivery
- **Caching Strategy**: Redis caching implementation
- **Database Optimization**: Query optimization and indexing
- **Load Balancing**: Horizontal scaling preparation

## 📞 Support & Maintenance

### Maintenance Schedule
- **Daily**: Monitor system health and user feedback
- **Weekly**: Review and fix critical bugs
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Major feature releases and system upgrades

### Support Channels
- **Technical Issues**: GitHub Issues
- **User Support**: In-app support system
- **Documentation**: Comprehensive documentation maintenance
- **Training**: User training and onboarding materials

### Contact Information
- **Project Repository**: [GitHub Repository]
- **API Documentation**: [API Docs URL]
- **Technical Lead**: [Contact Information]
- **Support Team**: [Support Email]

---

## 📚 Additional Documentation

### Related Documentation Files
- [Test Documentation](./TEST_DOCUMENTATION.md) - Comprehensive testing guide
- [Test Quick Reference](./TEST_QUICK_REFERENCE.md) - Developer testing reference
- [Test Coverage Report](./TEST_COVERAGE_REPORT.md) - Detailed coverage analysis
- [Test Cleanup Summary](./TEST_CLEANUP_SUMMARY.md) - Test maintenance history

### External Resources
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

*Documentation Version: 1.0.0*  
*Last Updated: July 13, 2025*  
*Project Status: Active Development*
