import { Router } from "express";
import {
  deleteAccount,
  generateAndStoreOtpForForgetPassword,
  generateAndStoreOtpForRegister,
  login,
  logout,
  register,
  resetpassword,
  verifyOtp,
} from "../controller/auth_controller.js";
import { verifyAuth } from "../middleware/auth.js";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", verifyAuth, logout);
router.post("/deleteAccount", verifyAuth, deleteAccount);
//! Reset password and verify email
router.post("/generateAndStoreOtpForRegister", generateAndStoreOtpForRegister);
router.post("/generateAndStoreOtpForForgetPassword", generateAndStoreOtpForForgetPassword);
router.post("/verifyOtp", verifyOtp);
router.post("/reset-password", resetpassword);

export default router;
