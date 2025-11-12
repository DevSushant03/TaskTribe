import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
};

export const users = {
  getUser: (id) => api.get(`/user/${id}`),
  updateUser: (id, data) => api.put(`/user/${id}`, data),
};

export const tasks = {
  getAll: () => api.get('/tasks'),
  getMyPosted: () => api.get('/tasks/my-posted'),
  getMyApplications: () => api.get('/tasks/my-applications'),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  complete: (id) => api.post(`/tasks/${id}/complete`),
  apply: (id, message) => api.post(`/tasks/${id}/apply`, { message }),
  getApplications: (id) => api.get(`/tasks/${id}/applications`),
  approveApplication: (appId) => api.post(`/applications/${appId}/approve`),
  getMessages: (id) => api.get(`/tasks/${id}/messages`),
  sendMessage: (id, message) => api.post(`/tasks/${id}/messages`, { message }),
  rate: (id, data) => api.post(`/tasks/${id}/rate`, data),
};

export const notifications = {
  getAll: () => api.get('/notifications'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
};

export const stats = {
  get: () => api.get('/stats'),
};

export default api;
