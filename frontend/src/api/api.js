import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://127.0.0.1:8000/v1/
});

// Request: set Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// Response: refresh access token if expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response.data.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}token/refresh/`, { refresh });
          localStorage.setItem("access", res.data.access);
          api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
          originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
