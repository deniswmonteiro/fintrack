import axios from "axios";

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/localstorage";

export const api = axios.create({
  baseURL: "https://fullstackclub-finance-dashboard-api.onrender.com/api",
});

api.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

  if (!accessToken) return request;

  request.headers.Authorization = `Bearer ${accessToken}`;

  return request;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const request = error.config;
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

    if (!refreshToken) return Promise.reject(error);

    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes("/users/refresh-token")
    ) {
      request._retry = true;

      try {
        const response = await api.post("/users/refresh-token", {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken);
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken);

        request.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(request);
      } catch (e) {
        console.error(e);
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
      }
    }

    return Promise.reject(error);
  }
);
