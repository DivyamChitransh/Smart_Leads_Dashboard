import { api } from './api';
import { ApiSuccessResponse, AuthData, User } from '../types';

export async function login(email: string, password: string) {
  const res = await api.post<ApiSuccessResponse<AuthData>>('/auth/login', { email, password });
  return res.data.data;
}

export async function register(data: { name: string; email: string; password: string }) {
  const res = await api.post<ApiSuccessResponse<AuthData>>('/auth/register', data);
  return res.data.data;
}

export async function getMe() {
  const res = await api.get<ApiSuccessResponse<{ user: User }>>('/auth/me');
  return res.data.data.user;
}
