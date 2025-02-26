import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Add request interceptor to include Authorization header
API.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  console.log("Request Config →", config);
  return config;
});



export default API;
