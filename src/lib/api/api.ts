import axios from "axios";
import { handleError } from "../error-handler";

const API_URL = process.env.BASE_URL

console.log(API_URL);


export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
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
      localStorage.removeItem("access_token")
      console.log("Token expired or invalid");
    }
    const errorMessage = error.response?.data?.message || error.message
    handleError(errorMessage)

    return Promise.reject(error)
  }
);
