import mongoose from "mongoose";

const emailOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    otpHash: {
      type: String,
      required: true,
    },

  
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

emailOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const OtpModel = mongoose.model("VerifyOtp", emailOtpSchema);
export default OtpModel;
