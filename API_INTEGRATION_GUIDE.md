# RailLynk API Integration Guide

## 🌐 API Overview

The RailLynk frontend integrates with a RESTful API backend hosted at `https://raillynk.site/api/`. This guide provides comprehensive information about API integration, authentication, error handling, and best practices.

## 🔧 API Configuration

### Base Configuration
```javascript
// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: "https://raillynk.site/api/",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});
```

### Request Interceptor
```javascript
// Automatic JWT token attachment
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Interceptor
```javascript
// Global error handling and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 🔐 Authentication Endpoints

### User Login
```javascript
// POST /auth/login
const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', {
      username: credentials.email,
      password: credentials.password,
      user_type: credentials.userType // 'passenger', 'station', 'admin'
    });
    
    // Store authentication data
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.setItem('user_type', response.data.user_type);
    localStorage.setItem('user_data', JSON.stringify(response.data.profile));
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
```

### Admin Login
```javascript
// POST /auth/admin/login
const adminLogin = async (credentials) => {
  try {
    const response = await api.post('/auth/admin/login', {
      username: credentials.username,
      password: credentials.password
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Admin login failed');
  }
};
```

### User Registration
```javascript
// POST /auth/register
const registerPassenger = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      email: userData.email,
      password: userData.password,
      first_name: userData.firstName,
      last_name: userData.lastName,
      nic_number: userData.nicNumber,
      dob: userData.dateOfBirth,
      address: userData.address,
      phone: userData.phone
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};
```

### Station Registration
```javascript
// POST /auth/station/register
const registerStation = async (stationData) => {
  try {
    const response = await api.post('/auth/station/register', {
      station_name: stationData.stationName,
      email: stationData.email,
      password: stationData.password,
      location: stationData.location,
      contact_number: stationData.contactNumber
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Station registration failed');
  }
};
```

## 👤 User Management Endpoints

### Get User Profile
```javascript
// GET /users/profile
const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};
```

### Update User Profile
```javascript
// PUT /users/profile
const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update profile');
  }
};
```

### Get All Passengers (Admin Only)
```javascript
// GET /users/passengers
const getAllPassengers = async () => {
  try {
    const response = await api.get('/users/passengers');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch passengers');
  }
};
```

## 💳 Transaction Endpoints

### Get Transaction History
```javascript
// GET /transactions/passenger/{passenger_id}
const getTransactionHistory = async (passengerId, date = null) => {
  try {
    const params = date ? { date } : {};
    const response = await api.get(`/transactions/passenger/${passengerId}`, { params });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch transaction history');
  }
};
```

### Process Recharge
```javascript
// POST /transactions/recharge
const processRecharge = async (rechargeData) => {
  try {
    const response = await api.post('/transactions/recharge', {
      passenger_id: rechargeData.passengerId,
      amount: rechargeData.amount,
      payment_method: rechargeData.paymentMethod
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Recharge failed');
  }
};
```

### Get Recharge History
```javascript
// GET /transactions/recharge/{passenger_id}
const getRechargeHistory = async (passengerId) => {
  try {
    const response = await api.get(`/transactions/recharge/${passengerId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recharge history');
  }
};
```

## 📊 Dashboard & Analytics Endpoints

### Get Dashboard Statistics
```javascript
// GET /dashboard/stats
const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch dashboard statistics');
  }
};
```

### Get Revenue Analytics
```javascript
// GET /dashboard/revenue
const getRevenueAnalytics = async (period = 'monthly') => {
  try {
    const response = await api.get('/dashboard/revenue', {
      params: { period }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch revenue data');
  }
};
```

### Get Train Tracking Data
```javascript
// GET /dashboard/trains/tracking
const getTrainTrackingData = async () => {
  try {
    const response = await api.get('/dashboard/trains/tracking');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch train tracking data');
  }
};
```

## 🚉 Station Management Endpoints

### Get All Stations
```javascript
// GET /stations/
const getAllStations = async () => {
  try {
    const response = await api.get('/stations/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch stations');
  }
};
```

### Get Station Details
```javascript
// GET /stations/{station_id}
const getStationDetails = async (stationId) => {
  try {
    const response = await api.get(`/stations/${stationId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch station details');
  }
};
```

### Get Station Transactions
```javascript
// GET /stations/{station_id}/transactions
const getStationTransactions = async (stationId) => {
  try {
    const response = await api.get(`/stations/${stationId}/transactions`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch station transactions');
  }
};
```

## 🎫 Ticketing Endpoints

### Create Smart Ticket
```javascript
// POST /tickets/create
const createSmartTicket = async (ticketData) => {
  try {
    const response = await api.post('/tickets/create', {
      passenger_id: ticketData.passengerId,
      start_station: ticketData.startStation,
      end_station: ticketData.endStation,
      travel_date: ticketData.travelDate,
      ticket_type: ticketData.ticketType
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to create ticket');
  }
};
```

### Get Passenger Tickets
```javascript
// GET /tickets/passenger/{passenger_id}
const getPassengerTickets = async (passengerId) => {
  try {
    const response = await api.get(`/tickets/passenger/${passengerId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};
```

## 🗺️ Train Tracking Endpoints

### Get Live Train Locations
```javascript
// GET /tracking/trains/live
const getLiveTrainLocations = async () => {
  try {
    const response = await api.get('/tracking/trains/live');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch live train locations');
  }
};
```

### Get Train Schedule
```javascript
// GET /tracking/schedule/{train_id}
const getTrainSchedule = async (trainId) => {
  try {
    const response = await api.get(`/tracking/schedule/${trainId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch train schedule');
  }
};
```

## 🔔 Notification Endpoints

### Get System Announcements
```javascript
// GET /announcements/
const getSystemAnnouncements = async () => {
  try {
    const response = await api.get('/announcements/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch announcements');
  }
};
```

### Create Announcement (Admin Only)
```javascript
// POST /announcements/create
const createAnnouncement = async (announcementData) => {
  try {
    const response = await api.post('/announcements/create', {
      title: announcementData.title,
      message: announcementData.message,
      priority: announcementData.priority,
      target_audience: announcementData.targetAudience
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to create announcement');
  }
};
```

## ⚠️ Error Handling

### Error Response Format
```javascript
// Standard error response structure
{
  "error": "Error message",
  "details": "Detailed error description",
  "code": "ERROR_CODE",
  "timestamp": "2025-07-13T10:30:00Z"
}
```

### Common Error Codes
| Code | Status | Description | Action |
|------|--------|-------------|---------|
| `INVALID_CREDENTIALS` | 401 | Invalid login credentials | Show error message |
| `TOKEN_EXPIRED` | 401 | JWT token expired | Redirect to login |
| `INSUFFICIENT_PERMISSIONS` | 403 | User lacks required permissions | Show access denied |
| `RESOURCE_NOT_FOUND` | 404 | Requested resource not found | Show not found message |
| `VALIDATION_ERROR` | 400 | Request validation failed | Show validation errors |
| `SERVER_ERROR` | 500 | Internal server error | Show generic error |

### Error Handling Implementation
```javascript
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        // Handle authentication errors
        localStorage.clear();
        window.location.href = '/login';
        break;
        
      case 403:
        // Handle authorization errors
        alert('You do not have permission to perform this action');
        break;
        
      case 404:
        // Handle not found errors
        alert('Requested resource not found');
        break;
        
      case 500:
        // Handle server errors
        alert('Server error. Please try again later.');
        break;
        
      default:
        // Handle other errors
        alert(data.error || 'An unexpected error occurred');
    }
  } else if (error.request) {
    // Network error
    alert('Network error. Please check your connection.');
  } else {
    // Other errors
    alert('An unexpected error occurred');
  }
};
```

## 🔄 API Request Patterns

### Loading State Management
```javascript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);

const fetchData = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await api.get('/endpoint');
    setData(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
```

### Form Submission Pattern
```javascript
const handleSubmit = async (formData) => {
  setIsSubmitting(true);
  setError(null);
  
  try {
    const response = await api.post('/endpoint', formData);
    // Handle success
    navigate('/success-page');
  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Pagination Pattern
```javascript
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const fetchPaginatedData = async (page = 1) => {
  try {
    const response = await api.get(`/endpoint?page=${page}&limit=10`);
    setData(response.data.results);
    setTotalPages(response.data.total_pages);
    setCurrentPage(page);
  } catch (error) {
    handleApiError(error);
  }
};
```

## 🚀 Performance Optimization

### Request Caching
```javascript
// Simple in-memory cache
const cache = new Map();

const getCachedData = async (endpoint, ttl = 300000) => { // 5 minutes TTL
  const cacheKey = endpoint;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  
  try {
    const response = await api.get(endpoint);
    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

### Request Debouncing
```javascript
import { debounce } from 'lodash';

const debouncedSearch = debounce(async (query) => {
  try {
    const response = await api.get(`/search?q=${query}`);
    setResults(response.data);
  } catch (error) {
    handleApiError(error);
  }
}, 300);
```

### Batch Requests
```javascript
const fetchMultipleData = async () => {
  try {
    const [userData, transactionData, announcementData] = await Promise.all([
      api.get('/users/profile'),
      api.get('/transactions/recent'),
      api.get('/announcements/')
    ]);
    
    return {
      user: userData.data,
      transactions: transactionData.data,
      announcements: announcementData.data
    };
  } catch (error) {
    handleApiError(error);
  }
};
```

## 🔒 Security Best Practices

### Token Security
```javascript
// Secure token storage
const setSecureToken = (token) => {
  // In a production environment, consider using secure HTTP-only cookies
  localStorage.setItem('access_token', token);
  
  // Set token expiration
  const expirationTime = Date.now() + (15 * 60 * 1000); // 15 minutes
  localStorage.setItem('token_expiration', expirationTime.toString());
};

const isTokenExpired = () => {
  const expirationTime = localStorage.getItem('token_expiration');
  return !expirationTime || Date.now() > parseInt(expirationTime);
};
```

### Input Sanitization
```javascript
const sanitizeInput = (input) => {
  // Basic input sanitization
  return input.trim().replace(/[<>]/g, '');
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Request Validation
```javascript
const validateRequest = (data, schema) => {
  // Implement client-side validation
  const errors = {};
  
  if (schema.email && !validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (schema.password && data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
```

## 📊 Monitoring & Logging

### Request Logging
```javascript
// Request logging interceptor
api.interceptors.request.use((config) => {
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`[API Error] ${error.response?.status} ${error.config?.url}`, error);
    return Promise.reject(error);
  }
);
```

### Performance Monitoring
```javascript
const measureApiPerformance = async (endpoint, requestFn) => {
  const startTime = performance.now();
  
  try {
    const result = await requestFn();
    const endTime = performance.now();
    
    console.log(`[Performance] ${endpoint}: ${endTime - startTime}ms`);
    return result;
  } catch (error) {
    const endTime = performance.now();
    console.error(`[Performance Error] ${endpoint}: ${endTime - startTime}ms`, error);
    throw error;
  }
};
```

## 🧪 Testing API Integration

### Mock API Responses
```javascript
// Test mock setup
import { vi } from 'vitest';

vi.mock('../api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock successful response
api.get.mockResolvedValue({
  data: { message: 'Success', data: mockData }
});

// Mock error response
api.post.mockRejectedValue({
  response: { status: 400, data: { error: 'Validation failed' } }
});
```

### Integration Testing
```javascript
// Integration test example
test('should fetch user profile successfully', async () => {
  const mockUserData = { id: 1, name: 'John Doe' };
  api.get.mockResolvedValue({ data: mockUserData });
  
  const result = await getUserProfile();
  
  expect(api.get).toHaveBeenCalledWith('/users/profile');
  expect(result).toEqual(mockUserData);
});
```

## 📝 API Documentation Standards

### Request Documentation Template
```javascript
/**
 * Get user transaction history
 * 
 * @param {string} passengerId - The passenger's unique identifier
 * @param {string} [date] - Optional date filter (YYYY-MM-DD)
 * @returns {Promise<Object>} Transaction history data
 * @throws {Error} When request fails
 * 
 * @example
 * const transactions = await getTransactionHistory('123', '2025-07-13');
 */
```

### Response Schema Documentation
```javascript
/**
 * Transaction History Response Schema
 * 
 * @typedef {Object} TransactionResponse
 * @property {Array<Transaction>} data - Array of transaction objects
 * @property {number} total - Total number of transactions
 * @property {number} page - Current page number
 * @property {number} limit - Number of items per page
 * 
 * @typedef {Object} Transaction
 * @property {number} id - Transaction ID
 * @property {string} S_station - Starting station
 * @property {string} E_station - Ending station
 * @property {number} amount - Transaction amount
 * @property {string} date - Transaction date (ISO string)
 */
```

---

*API Integration Guide Version: 1.0.0*  
*Last Updated: July 13, 2025*  
*API Base URL: https://raillynk.site/api/*
