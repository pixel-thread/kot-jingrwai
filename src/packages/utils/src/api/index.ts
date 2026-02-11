import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, TokenStoreManager } from "@repo/libs";
import { AUTH_ENDPOINT } from "@repo/constants";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

/* -------------------------------------------------- */
/* State Management */
/* -------------------------------------------------- */

let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  pendingQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  pendingQueue = [];
};

const shouldSkipRefresh = (url?: string) => {
  if (!url) return true;
  const skipUrls = [
    AUTH_ENDPOINT.POST_LOGIN,
    AUTH_ENDPOINT.POST_REGISTER,
    AUTH_ENDPOINT.POST_REFRESH,
  ];
  return skipUrls.some((path) => url.includes(path));
};

const handleUnauthorizedExit = async () => {
  await TokenStoreManager.removeItem(ACCESS_TOKEN_KEY);
  await TokenStoreManager.removeItem(REFRESH_TOKEN_KEY);
};

/* -------------------------------------------------- */
/* Interceptors */
/* -------------------------------------------------- */

axiosInstance.interceptors.request.use(async (config) => {
  const token = await TokenStoreManager.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 1. If not a 401 or shouldn't refresh, just fail
    if (
      !error.response ||
      error.response.status !== 401 ||
      !originalRequest ||
      shouldSkipRefresh(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    // 2. If this is a SECOND 401 for the same request, refresh failed or token is still bad
    if (originalRequest._retry) {
      await handleUnauthorizedExit();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // 3. Handle concurrent requests while refreshing
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject: (err: any) => reject(err),
        });
      });
    }

    /* ---------- Start Refresh ---------- */
    isRefreshing = true;

    try {
      const refreshToken = await TokenStoreManager.getItem(REFRESH_TOKEN_KEY);

      // Use standard axios instance for the refresh call
      const url = `${process.env.EXPO_PUBLIC_API_URL}/${AUTH_ENDPOINT.POST_REFRESH}`;

      const res = await axios.post(url, {
        refresh_token: refreshToken,
      });

      const payload: any = res.data;
      const access_token = payload?.data?.access_token ?? payload?.access_token;
      const new_refresh_token = payload?.data?.refresh_token ?? payload?.refresh_token;
      if (!access_token) {
        throw new Error("Invalid refresh response");
      }

      await TokenStoreManager.setTokens(access_token, new_refresh_token);
      // Successfully refreshed!
      processQueue(null, access_token);

      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      await handleUnauthorizedExit();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
