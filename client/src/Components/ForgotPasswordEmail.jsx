import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/api"; // your axios instance
import emailjs from "@emailjs/browser";

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
          Date.now() + 15 * 60 * 1000
        ).toLocaleTimeString();

        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            email: email,
            title: "Reset Password – OTP Verification",
            message:
              "You requested to reset your password. Use the following One-Time Password (OTP) to verify your identity. This OTP is valid for a limited time. Please do not share it with anyone.",

            highlight: res.data.otp,
            footer_note: `This OTP is valid for 15 minutes till ${expiryTime}.
                Do not share this OTP with anyone.`,
            year: new Date().getFullYear(),
            company_name: "TaskTribe",
            website_url: "https://tasktribe-plum.vercel.app",
            logo_url: "https://tasktribe-plum.vercel.app/icon.jpeg",
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        setEmail(email)
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
