import { API_BASE_URL } from "@/helpers/common.helper";
import axios from "axios";
import Cookies from "js-cookie";


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

apiClient.interceptors.request.use((config) => {
  const csrf = Cookies.get("csrftoken");
  if (csrf) config.headers["X-CSRFToken"] = csrf;

  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default apiClient;
