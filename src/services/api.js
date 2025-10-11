
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // backend Spring Boot
});

// 🔐 Exemple d'intercepteur pour auth JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// MOCK LOGIN ENDPOINT
api.post = async function(url, data, ...args) {
  if (url === "/auth/login") {
    // Simulate a successful login response
    return Promise.resolve({
      data: {
        accessToken: "mocked-jwt-token",
        user: { email: data.email }
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {}
    });
  }
  // fallback to real axios post for other endpoints
  return axios.post.call(this, url, data, ...args);
};

export default api;
