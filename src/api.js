import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const API = axios.create({
  baseURL: "http://192.168.42.64:8000/api/", // Adjust to your API's base URL
});

// Attach Authorization header to every request
API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

export default API;