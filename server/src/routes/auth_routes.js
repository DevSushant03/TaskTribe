import { Router } from "express";
import {
  deleteAccount,
  login,
  logout,
  register,
  resetPassword,
  sendResetotp,
  verifyOtp,
} from "../controller/auth_controller.js";
import { verifyAuth } from "../middleware/auth.js";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", verifyAuth, logout);
router.post("/deleteAccount", verifyAuth, deleteAccount);
//! Reset password
router.post("/sendResetOtp", sendResetotp);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);

export default router;
