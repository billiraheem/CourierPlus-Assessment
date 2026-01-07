import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

// Base URL from environment or fallback to the provided URL
const BASE_URL = import.meta.env.VITE_API_URL;

// An Axios instance with a base URL and default headers
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 100000,
});

// A request interceptor to dynamically set headers (e.g., for auth tokens)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers = config.headers || {};
            // Clean token to ensure no extra quotes or whitespace which might cause 401
            const cleanToken = token.replace(/^['"]+|['"]+$/g, '').trim();

            config.headers['Authorization'] = `Bearer ${cleanToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// A response interceptor for consistent error handling
api.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError) => {
        const errorInfo = {
            isAxiosError: true,
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        };
        return Promise.reject(errorInfo);
    }
);

export const postApi = async <T = any>(endpoint: string, data: any, headers: AxiosRequestConfig['headers'] = {}): Promise<T> => {
    const config: AxiosRequestConfig = {
        headers: {
            ...headers
        }
    };

    // If data is FormData and no Content-Type is specified, let the browser set it
    if (data instanceof FormData && !headers['Content-Type']) {
        if (config.headers) {
            delete config.headers['Content-Type'];
        }
    }

    const response = await api.post<T>(endpoint, data, config);
    // @ts-ignore
    return response as T;
};

export const getApi = async <T = any>(endpoint: string, params: any = {}, headers: AxiosRequestConfig['headers'] = {}): Promise<T> => {
    const response = await api.get<T>(endpoint, { params, headers });
    // @ts-ignore
    return response as T;
};

export const getByIdApi = async <T = any>(endpoint: string, id: string | number, params: any = {}, headers: AxiosRequestConfig['headers'] = {}): Promise<T> => {
    const fullEndpoint = `${endpoint}/${id}`;
    const response = await api.get<T>(fullEndpoint, { params, headers });
    // @ts-ignore
    return response as T;
};

export const putApi = async <T = any>(endpoint: string, data: any, headers: AxiosRequestConfig['headers'] = {}): Promise<T> => {
    const response = await api.put<T>(endpoint, data, { headers });
    // @ts-ignore
    return response as T;
};

export const patchApi = async <T = any>(endpoint: string, data: any, headers: AxiosRequestConfig['headers'] = {}): Promise<T> => {
    const response = await api.patch<T>(endpoint, data, { headers });
    // @ts-ignore
    return response as T;
};

export const deleteApi = async <T = any>(endpoint: string, headers: AxiosRequestConfig['headers'] = {}): Promise<T> => {
    const response = await api.delete<T>(endpoint, { headers });
    // @ts-ignore
    return response as T;
};

export default api;
