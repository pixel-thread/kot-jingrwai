import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error)
);

export default axiosInstance;
