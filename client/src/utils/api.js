import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
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
  getUser: (id) => api.get(`/user/getuser/${id}`),
  updateUser: (id, data) => api.put(`/user/updateUserData/${id}`, data),
  setUserData: (data) => api.post('/user/setUserData', data),
};

export default api;
