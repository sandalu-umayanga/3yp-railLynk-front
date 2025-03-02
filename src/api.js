import axios from "axios";


const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/users/", // Adjust to your API's base URL
});

// Attach Authorization header to every request
API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

export default API;
