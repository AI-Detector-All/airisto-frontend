import axios from "axios";
import { handleError } from "../error-handler";
import { deleteCookie, getCookie } from "@/utils/cookie";

const API_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8080/api" : process.env.BASE_URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentUrl = window.location.href;
      const isLocalhost = currentUrl.includes('localhost:3000');
      const isDashboard = currentUrl.includes('/dashboard');
      
      if (isDashboard && !isLocalhost) {
        deleteCookie('access_token');
        localStorage.removeItem("access_token");
        window.location.href = "/sign-in";
      }
    }
    
    const currentUrl = window.location.href;
    const isLocalhost = currentUrl.includes('localhost:3000');
    const isDashboard = currentUrl.includes('/dashboard');
    
    if (isDashboard && !isLocalhost) {
      const errorMessage = error.response?.data?.message || error.message;
      handleError(errorMessage);
    }

    return Promise.reject(error);
  }
);