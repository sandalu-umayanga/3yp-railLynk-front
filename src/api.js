// In your axios setup file (e.g., api.js)
import axios from 'axios';


const api = axios.create({
  //baseURL: "https://raillynk.site/api/", // Adjust to your API's base URL
  baseURL: "http://127.0.0.1:8000/api/",
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
