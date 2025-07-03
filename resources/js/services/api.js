import axios from 'axios';

// Create a configured instance of Axios
const api = axios.create({
    // Use the environment variable
    baseURL: import.meta.env.VITE_API_BASE_URL, 
    // This is required for Laravel Sanctum's cookie-based authentication
    withCredentials: true,
});

// Use an interceptor to attach the Bearer token from localStorage to requests
api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;