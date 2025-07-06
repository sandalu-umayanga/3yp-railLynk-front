// In your axios setup file (e.g., api.js)
import axios from 'axios';

const api = axios.create({
  baseURL: "http://54.83.76.56/api/", // Adjust to your API's base URL
});

// Add interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
