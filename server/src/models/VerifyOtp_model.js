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

    purpose: {
      type: String,
      enum: ["EMAIL_VERIFY", "RESET_PASSWORD"],
      default: "EMAIL_VERIFY",
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
