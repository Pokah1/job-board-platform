import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Endpoints that do NOT require authentication or refresh handling
const PUBLIC_ENDPOINTS = [
  "/auth/login/",
  "/auth/register/",
  "/api/token/refresh/"
];

// Request interceptor — attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
    config.url?.toLowerCase().includes(endpoint.toLowerCase())
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor — handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
      originalRequest.url?.toLowerCase().includes(endpoint.toLowerCase())
    );

    // If 401 and not a public endpoint → try refresh
    if (error.response?.status === 401 && !originalRequest._retry && !isPublic) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem("token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh failed → force login
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
