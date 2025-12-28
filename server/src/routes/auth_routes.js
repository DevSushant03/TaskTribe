import { Router } from "express";
import {
  deleteAccount,
  login,
  logout,
  register,
  resetPassword,
  sendOtpToVerifyEmail,
  verifyOtp,
} from "../controller/auth_controller.js";
import { verifyAuth } from "../middleware/auth.js";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", verifyAuth, logout);
router.post("/deleteAccount", verifyAuth, deleteAccount);
//! Reset password and verify email
router.post("/sendOtpToVerifyEmail", sendOtpToVerifyEmail);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword",verifyAuth, resetPassword);

export default router;
