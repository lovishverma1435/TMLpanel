// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend.kryptohas.com",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: add Bearer token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // dev/demo
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: response interceptor for 401 handling (simple)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // token expired or unauthorized
      // for interview: you can mention redirect to login or refresh logic
      localStorage.removeItem("token");
      // window.location.href = "/login"; // optional
    }
    return Promise.reject(err);
  }
);

export default api;
