# RailLynk Frontend

A modern railway management system frontend built with React and Vite, providing comprehensive train tracking, passenger management, and administrative dashboard functionality for Sri Lankan railway operations.

## 🚂 Overview

RailLynk is a comprehensive railway management system that serves three main user types:
- **Passengers**: Register, manage profiles, recharge cards, track trains, and view transaction history
- **Station Masters**: Manage station operations, process transactions, and oversee passenger activities
- **Administrators**: Monitor system-wide operations, track revenue, and manage the entire railway network

## ✨ Key Features

### 🗺️ Interactive Map System
- **Live Train Tracking**: Real-time train positions with detailed information popups
- **Station Network**: Complete visualization of Sri Lankan railway stations using GeoJSON data
- **Route Visualization**: Interactive maps for both admin and passenger views
- **Blue Train Icons**: Modern Font Awesome train icons with smooth animations

### 👥 User Management
- **Multi-role Authentication**: Separate login flows for passengers, station masters, and admins
- **Protected Routes**: Role-based access control with route protection
- **Profile Management**: Comprehensive user profile and preference management

### 💳 Smart Card System
- **Digital Wallet**: Passenger card recharge and balance management
- **Transaction History**: Detailed transaction records and analytics
- **Google Pay Integration**: Seamless payment processing
- **Station-based Transactions**: Real-time transaction processing at stations

### 📊 Administrative Dashboard
- **Real-time Analytics**: Live revenue tracking and passenger statistics
- **Station Management**: Monitor all stations and their activities
- **Revenue Reports**: Daily, monthly, and historical revenue analysis
- **Busy Station Tracking**: Identify peak usage patterns and station performance

## 🛠️ Technology Stack

### Core Technologies
- **React 19.0.0**: Modern frontend framework with latest features
- **Vite**: Fast build tool and development server
- **React Router DOM 7.2.0**: Client-side routing and navigation

### UI & Styling
- **CSS3**: Custom styling with modern CSS features
- **Font Awesome**: Icon library for consistent iconography
- **React Icons 5.5.0**: Additional icon components
- **Responsive Design**: Mobile-first approach with responsive layouts

### Maps & Visualization
- **React Leaflet 5.0.0**: Interactive maps with OpenStreetMap
- **Leaflet 1.9.4**: Core mapping functionality
- **GeoJSON**: Station and route data visualization
- **Recharts 2.15.4**: Advanced data visualization and analytics

### API & Data
- **Axios 1.7.9**: HTTP client for API communication
- **RESTful APIs**: Backend integration for all operations
- **Real-time Updates**: Live data synchronization

### Development & Testing
- **Vitest 3.0.5**: Modern testing framework
- **React Testing Library 16.2.0**: Component testing utilities
- **ESLint**: Code quality and style enforcement
- **Jest DOM**: Extended DOM testing matchers

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd 3yp-railLynk-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run test` | Run test suite with Vitest |

## 🧪 Testing

The project includes a comprehensive test suite with 103 tests across 29 test files:

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test --watch

# Run tests with coverage
npm run test --coverage
```

### Test Structure
- **Unit Tests**: 91 tests covering individual components and utilities
- **Integration Tests**: 12 tests covering component interactions and workflows
- **Test Coverage**: Comprehensive coverage of critical functionality

### Test Categories
- Component rendering and interaction
- API integration and error handling
- User authentication and authorization
- Map functionality and data visualization
- Form validation and submission
- Route protection and navigation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AdminDashboard.jsx
│   ├── LiveTracking.jsx
│   ├── Navbar.jsx
│   └── ...
├── pages/              # Main application pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── PassengerDashboard.jsx
│   └── ...
├── styles/             # CSS stylesheets
│   ├── adminDashboard.css
│   ├── liveTracking.css
│   └── ...
├── __test__/           # Test files
│   ├── unit/           # Unit tests
│   └── integration/    # Integration tests
├── mocks/              # Test mocks and handlers
├── assets/             # Static assets and images
├── api.js              # API configuration
├── constants.js        # Application constants
└── main.jsx            # Application entry point
```

## 🗺️ Data Sources

### Railway Network Data
- **stations.geojson**: Complete Sri Lankan railway station network
- **railways_lka.geojson**: Railway line data and geographic information
- **Real-time APIs**: Live train positions and operational data

## 🔧 Configuration

### Environment Setup
The application uses Vite's built-in environment variable handling. Create a `.env` file for local configuration:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### API Integration
The application integrates with RailLynk backend APIs for:
- User authentication and management
- Train tracking and scheduling
- Transaction processing
- Administrative operations

## 📚 Documentation

- **[Test Documentation](TEST_DOCUMENTATION.md)**: Comprehensive testing guide and reference
- **[API Integration Guide](API_INTEGRATION_GUIDE.md)**: Backend API integration details
- **[Component Architecture](COMPONENT_ARCHITECTURE_GUIDE.md)**: UI component structure and design
- **[Developer Setup Guide](DEVELOPER_SETUP_GUIDE.md)**: Development environment setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write tests for new features and bug fixes
- Ensure all tests pass before submitting
- Update documentation for significant changes

## 📄 License

This project is part of the RailLynk railway management system.

## 🆘 Support

For support and questions:
- Check the documentation files in the repository
- Review test files for usage examples
- Consult the troubleshooting section in test documentation

---

**Built with ❤️ for Sri Lankan Railways**
