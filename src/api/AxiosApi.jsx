import axios from "axios";
import { baseUrl } from "./BaseUrl";

export const apiInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('uuid');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('uuid');  // remove token on 401
            window.location.href = '/login';   // redirect to login
        }
        return Promise.reject(error);
    }
);
