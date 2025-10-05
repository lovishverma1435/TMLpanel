import axios from "axios";
import { tokenStore } from "./tokenStore";

const baseURL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_BACKEND_URL);

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: false,
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = tokenStore.get();
    if (token) {
      config.headers.Authorization = token;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      tokenStore.clear();
    }

    return Promise.reject({
      status: err?.response?.status,
      message: err?.response?.data?.message || err.message || "Request failed",
      data: err?.response?.data,
      config: err?.config,
    });
  }
);

export default api;
