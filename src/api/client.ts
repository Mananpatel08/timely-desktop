import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://g29c5bg0-8000.inc1.devtunnels.ms",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle global errors
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("Unauthorized – maybe token expired");
      // redirect to login if needed
    }
    return Promise.reject(err);
  }
);

export default apiClient;
