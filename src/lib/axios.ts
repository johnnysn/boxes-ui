import axios from "axios";

// Local variable to store the current jwt
let _memoryToken: string | null = null;

// Setter function to be used by react
export const setApiToken = (token: string | null) => {
  _memoryToken = token;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Injects JWT
api.interceptors.request.use(
  (config) => {
    if (_memoryToken) {
      config.headers.Authorization = `Bearer ${_memoryToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If gets 401 (unauthorized), redirects to the login page
    if (error.response?.status === 401) {
      console.warn("User is not logged in... redirecting");
      // Clears local token
      _memoryToken = null;

      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);
