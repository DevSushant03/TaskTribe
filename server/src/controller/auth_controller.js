import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);
import userModel from "../models/user_model.js";
import {
  createAccessToken,
  deleteAccessToken,
  setNewPassword,
} from "../services/auth_services.js";
import OtpModel from "../models/VerifyOtp_model.js";

//! Login functionality---------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

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

    return res.json({
      success: true,
      user: user.isCreatedProfile,
      userid: user._id,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//! Register functionality------------------------------------
export const register = async (req, res) => {
  const { name, surname, email, password, otp } = req.body;
  if (!name || !surname || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const record = await OtpModel.findOne({ email });

    if (!record) return res.status(400).json({ message: "OTP expired" });

    const isValid = await bcrypt.compare(otp, record.otpHash);
    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    await OtpModel.deleteOne({ email });

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
export const sendOtpToVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  try {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpHash = await bcrypt.hash(otp, 10);
    await OtpModel.findOneAndUpdate(
      { email },
      {
        otpHash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
      { upsert: true }
    );
    await resend.emails.send({
      from: "TaskTribe <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP Verification Code",
      html: `
      <h2>OTP Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `,
    });

    return res.json({
      success: true,
      message: "OTP sent if email is valid",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { otpString, email } = req.body;

  try {
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
