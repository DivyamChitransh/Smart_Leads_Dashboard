import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config/env';
import { ApiErrorResponse } from '../types';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(new Error(message));
  }
);

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
}
