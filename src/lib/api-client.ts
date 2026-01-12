import axios, { type AxiosInstance, AxiosError } from "axios";
import type { ApiErrorDTO } from "./schemas/api-error";

class ApiClient {
  public readonly axios: AxiosInstance;
  private _memoryToken: string | null = null;
  private _onErrorCallback: ((error: ApiErrorDTO) => void) | null = null;
  private _onLoggedOutCallback: (() => void) | null = null;

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  set memoryToken(value: string | null) {
    this._memoryToken = value;
  }

  set onErrorCallback(callback: (error: ApiErrorDTO) => void) {
    this._onErrorCallback = callback;
  }

  set onLoggedOutCallback(callback: () => void) {
    this._onLoggedOutCallback = callback;
  }

  private setupInterceptors() {
    // Request interceptor: Injects JWT
    this.axios.interceptors.request.use(
      (config) => {
        if (this._memoryToken) {
          config.headers.Authorization = `Bearer ${this._memoryToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorDTO>) => {
        if (error.response?.data && this._onErrorCallback) {
          this._onErrorCallback(error.response.data);
        }

        // If gets 401 (unauthorized), redirects to the login page
        if (error.response?.status === 401) {
          console.warn("User is not logged in... redirecting");
          // Clears local token
          this._memoryToken = null;

          if (this._onLoggedOutCallback) {
            this._onLoggedOutCallback();
          } else {
            window.location.href = "/auth";
          }
        }
        return Promise.reject(error);
      }
    );
  }
}

export const apiClient = new ApiClient();
export const api = apiClient.axios;
