import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data) => api.post("/register", data),
  login: (data) => api.post("/login", data),
  logout: () => api.post("/logout"),
};

export const users = {
  getUser: (id) => api.get(`/user/getuser/${id}`),
  updateUser: (id, data) => api.put(`/user/updateUserData/${id}`, data),
  setUserData: (data) =>
    api.post("/user/setUserData", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export const task = {
  createTask: (data) =>
    api.post("/task/createTask", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getAllTask: () => api.get("/task/getAllTask"),
  getTaskById: (taskId) => api.get(`/task/getTask/${taskId}`),
  applyTask: (taskId, message) =>
    api.post(`/task/apply/${taskId}`, {
      message,
    }),
  getMyTask: () => api.get("/task/myTask"),
  getAssignedTask: () => api.get("/task/assignedToMe"),
  rejectApplicant: (applicantId, TaskId) =>
    api.post(`/task/${TaskId}/rejectApplicant/${applicantId}`),
  acceptApplicant: (applicantId, TaskId) =>
    api.post(`/task/${TaskId}/acceptApplicant/${applicantId}`),
  submitWork: (formData, TaskId) =>
    api.post(`/task/${TaskId}/submitWork`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export const Bank = {
  addBankDetails: (BankDetails) => api.post("/bank/addDetails", BankDetails),
};
export default api;
