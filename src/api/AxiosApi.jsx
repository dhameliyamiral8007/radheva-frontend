import axios from "axios";
import { baseUrl } from "./BaseUrl";

export const apiInstance = axios.create({
    baseURL: baseUrl,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiInstance.interceptors.request.use(
    (config) => {
        // Support multiple possible keys; prefer 'uuid'
        let token = localStorage.getItem('uuid') || localStorage.getItem('token') || localStorage.getItem('jwt');
        // Some apps save the whole auth object; try common nests
        if (!token) {
            try {
                const auth = JSON.parse(localStorage.getItem('auth') || '{}');
                token = auth?.token || auth?.user?.token || auth?.data?.token;
            } catch {}
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
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
            const req = error.config || {};
            const url = (req.url || '').toLowerCase();
            const method = (req.method || 'get').toLowerCase();

            // Define endpoints that truly require auth and should redirect on 401
            const requiresAuthPaths = [
                '/client/cart',
                '/client/wishlist',
                '/client/profile',
                '/client/order',
                '/client/payment',
            ];

            const shouldRedirect = requiresAuthPaths.some(p => url.includes(p));

            if (shouldRedirect) {
                localStorage.removeItem('uuid');
                window.location.href = '/login';
                return; // stop further processing
            }
            // For public endpoints (like product details, gold price, listings), do NOT redirect
        }
        return Promise.reject(error);
    }
);
