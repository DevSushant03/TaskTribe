import api from "../../../lib/axios"

export const auth = {
  register: (data) => api.post("/register", data),
  login: (data) => api.post("/login", data),
  logout: () => api.post("/logout"),
  verifyOtp: (otp, email) => api.post("/verifyOtp", { otp, email }),
  generateAndStoreOtpforRegister: (email) =>
    api.post("/generateAndStoreOtpForRegister", { email }),
  generateAndStoreOtpForForgetPassword: (email) =>
    api.post("/generateAndStoreOtpForForgetPassword", { email }),
  resetpassword: (email, password) =>
    api.post("/reset-password", {
      email,
      newPassword: password,
    }),
};


export const users = {
  getUser: () => api.get(`/user/getuser`),
  editProfile: (id, data) => api.put(`/user/editProfile/${id}`, data),
  changeProfilePic: (id, formData) =>
    api.post(`/user/changeProfilePic/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  setUserData: (data) =>
    api.post("/user/setUserData", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
