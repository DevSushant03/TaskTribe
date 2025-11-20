import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user_model.js";
import {
  createAccessToken,
  deleteAccessToken
} from "../services/auth_services.js";

//! Login functionality---------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please provide both email and password.",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message:
          "Email not recognized. Kindly check your input or create a new account.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    createAccessToken(jwt, user, res);

    return res.json({ success: true, user: user.isCreatedProfile });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//! Register functionality------------------------------------
export const register = async (req, res) => {
  const { name, surname, email, password } = req.body;
  if (
    !name ||
    !surname ||
    !email ||
    !password
  ) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message:
          "An account with this email already exists. Please log in instead.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      surname,
      email,
      password: hashedPassword,
    });
    await user.save();

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//! logout functionality------------------------------------
export const logout = async (req, res) => {
  const { userid } = req.user;
  try {
    deleteAccessToken(res);
    return res.json({ success: true, message: "Logout successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//! Delete Account functionality-----------------------------------
export const deleteAccount = async (req, res) => {
  const { userid } = req.user;
  try {
    const user = await userModel.findByIdAndDelete(userid);
    deleteAccessToken(res);
    return res.json({ success: true, message: "Account Deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


//! Reset password functionality---------------------------------
export const sendResetotp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 10000;
    await user.save();

    return res.json({
      success: true,
      otp,
      message: "Reset otp send on your registered email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { otpString, email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (user.resetOtp === "" || user.resetOtp !== otpString) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Otp is expired" });
    }

    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    user.save();
    return res.json({
      success: true,
      message: "Otp verified successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { confirmPassword, email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    setNewPassword(confirmPassword, bcrypt, user);

    return res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
