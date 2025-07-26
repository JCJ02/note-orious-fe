import axios from "axios";
import baseUrl from "./baseUrl";

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add this to Ensure Credentials are Sent
axiosClient.interceptors.request.use((configuration) => {
  configuration.withCredentials = true;
  return configuration;
});

export default axiosClient;
