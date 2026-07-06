import axios from 'axios';

const api = axios.create({
  baseURL: 'hdpsbackend-production.up.railway.app',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export function isNetworkError(err: unknown): boolean {
  return axios.isAxiosError(err) && !err.response;
}

export default api;
