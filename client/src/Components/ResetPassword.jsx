import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../utils/api";
import { FaArrowAltCircleLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = ({ email, back }) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await auth.resetpassword(email, password);

      if (res.data.success) {
        toast.success("Password reset successfully");
        navigate("/auth");
      } else {
        toast.error(res.data.message || "Reset failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
    >
      <button onClick={() => back()} className="absolute">
        <FaArrowAltCircleLeft color="orange" size={25} />
      </button>
      <h2 className="text-2xl text-orange-600 font-semibold text-center mb-2">
        Reset Password
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Create a new password for your account
      </p>

      {/* New Password */}
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          className="w-full px-4 py-2 text-black border border-gray-400 focus:border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 cursor-pointer text-gray-500"
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </span>
      </div>

      {/* Confirm Password */}
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full px-4 py-2 text-black border border-gray-400 focus:border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition disabled:opacity-60"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPassword;
