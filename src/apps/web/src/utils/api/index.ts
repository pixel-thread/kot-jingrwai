import { env } from "@/env";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
