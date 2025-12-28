import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import OtpModel from "../models/VerifyOtp_model.js"
import dotenv from "dotenv";
dotenv.config();
import userModel from "../models/user_model.js";
import {
  createAccessToken,
  deleteAccessToken,
  setNewPassword,
} from "../services/auth_services.js";

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
  const { name, surname, email, password } = req.body;
  if (!name || !surname || !email || !password) {
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

    return res.json({ success: true, message:"Registration Successfull" });
  } catch (error) {
    res.json({ success: false, message: "Internal Server Problem" });
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

export const generateAndStoreOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message:
          "An account with this email already exists. Please log in instead.",
      });
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OtpModel.deleteMany({ email });

    await OtpModel.create({
      email,
      otpHash,
      expiresAt,
    });

    return res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      otp, //
    });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { otp, email } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await OtpModel.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or already used",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await OtpModel.deleteOne({ _id: otpRecord._id });

      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const isOtpValid = await bcrypt.compare(
      otp.toString(),
      otpRecord.otpHash
    );

    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await OtpModel.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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
