import axios, { InternalAxiosRequestConfig } from "axios";

const { VITE_BACKEND_API } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("amrsl-admin_key");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
