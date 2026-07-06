import api from "../../../lib/axios"
export const task = {
  createTask: (data) =>
    api.post("/task/createTask", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  editTask: (TaskId, data) =>
    api.post(`/task/${TaskId}/editTask`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteTask: (TaskId) => api.post(`/task/${TaskId}/deleteTask`),
  rejectSubmitedWork: (TaskId) =>
    api.post(`/task/${TaskId}/rejectSubmitedWork`),
  getAllOpenTask: () => api.get("/task/getAllOpenTask"),
  getAllTask: () => api.get("/task/getAllTask"),
  getTaskById: (taskId) => api.get(`/task/getTask/${taskId}`),
  applyTask: (taskId, message, bidAmount) =>
    api.post(`/task/apply/${taskId}`, {
      message,
      bidAmount,
    }),
  getTaskApplyByMe: () => api.get("/task/getTaskApplyByMe"),
  cancelTaskApplyByMe: (taskId) =>
    api.post(`/task/cancelTaskApplyByMe/${taskId}`),
  updateTaskApplication: (taskId, message, bidAmount) =>
    api.post(`/task/updateTaskApplication/${taskId}`, { message, bidAmount }),
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
  markAsComplete: (taskId, review, rating) =>
    api.post(`/task/markAsComplete/${taskId}`, { rating, review }),
};
