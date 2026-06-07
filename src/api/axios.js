import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8090/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  },
);

export default api;
