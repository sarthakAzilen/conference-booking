import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or other headers if needed
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error("Unauthorized, redirecting to login...");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
