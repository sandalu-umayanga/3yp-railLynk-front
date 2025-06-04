// In your axios setup file
import axios from 'axios';


const API = axios.create({
  baseURL: "http://192.168.43.192:8000/api/", // Adjust to your API's base URL

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