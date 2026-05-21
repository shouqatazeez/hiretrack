import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("hiretrack_token")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("hiretrack_token", token);
  }
};

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("hiretrack_token");
  }
};

export default api;
