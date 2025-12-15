import axios from "axios";

export const STORAGE_KEY = "@app:token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request: Anexa o token atual
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response: Rotaciona o token e trata erros
api.interceptors.response.use(
  (response) => {
    const newToken = response.headers["Authorization"];

    if (newToken) {
      const cleanToken = newToken.replace("Bearer ", "");
      localStorage.setItem(STORAGE_KEY, cleanToken);
    }

    return response;
  },
  (error) => {
    // Se receber 401 (Não autorizado), limpa o storage e redireciona
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.href = "/login"; // Ou use um gerenciador de estado para forçar o logout
    }
    return Promise.reject(error);
  }
);
