// src/api/index.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // replace with your server's address
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // replace with how you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log the request configuration
    console.log("Request configuration:", config);

    // Log the token
    console.log("Token:", token);
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
