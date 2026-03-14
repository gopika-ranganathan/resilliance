import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Ensure the API URL ends with /api to match Spring Boot routes
if (API_URL && !API_URL.endsWith('/api')) {
    API_URL += '/api';
}

const api = axios.create({
    baseURL: API_URL,
});

// Request interceptor for adding the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
