import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../api/auth_api"; // your axios instance
import { sendOtpService } from "../services/sendOtpServices";
const ForgotPasswordEmail = ({ nextStep, setEmail }) => {
  const [email, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await auth.generateAndStoreOtpForForgetPassword(email);

      if (res.data.success) {
        const expiryTime = new Date(
          Date.now() + 15 * 60 * 1000,
        ).toLocaleTimeString();

        await sendOtpService(
          email,
          res.data.otp,
          expiryTime,
          "Reset Password – OTP Verification",
          "You requested to reset your password. Use the following One-Time Password (OTP) to verify your identity. This OTP is valid for a limited time. Please do not share it with anyone.",
        );
        
        setEmail(email);
        toast.success(res.data.message);
        nextStep();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
    >
      <p className="text-sm text-gray-500 text-center mb-6">
        Enter your registered email to receive an OTP
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 border text-black border-gray-600 rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={email}
        onChange={(e) => setUserEmail(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </form>
  );
};

export default ForgotPasswordEmail;
