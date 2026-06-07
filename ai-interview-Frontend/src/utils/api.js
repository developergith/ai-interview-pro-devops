import axios from 'axios';

// Uses Vite proxy in dev (/api -> http://localhost:5000/api)
// In production, set VITE_API_URL env variable
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const interviewAPI = {
  generate: (data) => api.post('/interview/generate', data),
  getHistory: () => api.get('/interview/history'),
  getStats: () => api.get('/interview/stats'),
  getById: (id) => api.get(`/interview/${id}`),
  getAnswer: (id, questionIndex) => api.post(`/interview/${id}/answer/${questionIndex}`),
  deleteInterview: (id) => api.delete(`/interview/${id}`),
};

export default api;
