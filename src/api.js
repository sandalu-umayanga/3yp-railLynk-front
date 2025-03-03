import axios from "axios";


const API = axios.create({
  baseURL: "http://34.238.51.251/api/", // Adjust to your API's base URL
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
