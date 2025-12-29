import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaRegEyeSlash } from "react-icons/fa";
import team_meating from "/src/assets/team_meating.jpg";
import { auth } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../Validation/auth_validation.js";
import { Helmet } from "react-helmet";
import CircularLoader from "../Components/CircularLoader.jsx";
import emailjs from "@emailjs/browser";

export default function Register() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOpen, setisOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    agreedRules:false
  });

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpVerify = async () => {
    setloading(true);
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter valid 6-digit OTP");
      return;
    }

    const res = await auth.verifyOtp(enteredOtp, formData.email);

    if (!res.data.success) {
      return toast.error(res.data.message);
    }

    await handleSubmit();
  };

  const sendOtpToVerifyEmail = async () => {
    setloading(true);

    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      setloading(false);
      toast.error(validation.error.issues[0].message);
      return;
    }
    try {
      const res = await auth.generateAndStoreOtp(formData.email);

      if (!res.data.success) {
        return toast.info(res.data.message);
      }

      const expiryTime = new Date(
        Date.now() + 15 * 60 * 1000
      ).toLocaleTimeString();

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          email: formData.email,
          title: "OTP Verification",
          message:
            "Use the following One-Time Password to verify your account:",
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

      toast.success("OTP sent successfully");
      setisOpen(true);
    } catch (err) {
      console.log(err);
      toast.error("Failed to send OTP");
    } finally {
      setloading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setloading(true);

    try {
      const validation = registerSchema.safeParse(formData);

      if (!validation.success) {
        setloading(false);
        const firstError = validation.error.issues[0].message;
        seterror(firstError);
        toast.error(firstError);
        return;
      }
      const response = await auth.register(formData, otp);

      if (response.data.success) {
        setloading(false);
        toast.success(response.data.message);
        navigate("/auth");
      } else {
        setloading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setloading(false);
      toast.error(error.message || "Registration failed");
      seterror(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account | TaskTribe</title>
        <meta
          name="description"
          content="Join TaskTribe to post tasks or earn money by solving tasks. Free to sign up."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center px-8 py-8 min-h-screen bg-gradient-to-br from-orange-50 to-white">
          <div
            className={`${isOpen && "hidden"} max-w-md mx-auto w-full mt-10`}
          >
            {/* Social Login */}
            <button className="w-full flex items-center justify-center bg-white/70 backdrop-blur-sm border-2 border-orange-200/60 rounded-2xl py-3 mb-3 hover:shadow-neumorph-hover hover:border-orange-300/80 hover:bg-orange-50/80 transition-all duration-300 shadow-neumorph h-5 w-5">
              <FcGoogle className="h-5 w-5 mr-2" /> Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-orange-200/60"></div>
              <span className="mx-2 text-gray-600 font-bold bg-white/90 px-3 py-1 rounded-full border border-orange-200/50 shadow-neumorph-sm">
                OR
              </span>
              <div className="flex-grow border-t border-orange-200/60"></div>
            </div>

            {/* Login Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-orange-200/50 shadow-neumorph-inset">
              <div className="flex space-x-3 mb-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full py-3 px-4 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm"
                  />
                </div>

                <div className="w-1/2">
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full py-3 px-4 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full py-3 px-4 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm"
                />
              </div>

              {/* Password */}
              <div className="relative mb-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full py-3 px-4 bg-white/90 backdrop-blur-sm border-2 border-orange-200/70 rounded-xl placeholder-gray-500 focus:border-orange-400 focus:shadow-neumorph-focus focus:outline-none transition-all duration-300 shadow-neumorph-sm pr-10"
                />
                <FaRegEyeSlash className="absolute right-4 top-4 text-gray-400 h-5 w-5" />
              </div>

              {error && (
                <p className="bg-red-50 border-2 border-orange-200/60 p-3 my-2 rounded-xl text-orange-700 text-sm shadow-neumorph-orange-sm backdrop-blur-sm">
                  {error}
                </p>
              )}

              <div className="flex items-center mb-4 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.agreedRules}
                  onChange={(e)=>setFormData({...formData,agreedRules:e.target.checked})}
                  className="mr-2 w-4 h-4 border-2 border-orange-300 rounded focus:border-orange-500 focus:ring-orange-400 shadow-neumorph-checkbox"
                />
                <span className="text-gray-600">
                  I agree to the{" "}
                  <a
                    href="/TermsAndConditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
                  >
                    User Agreement
                  </a>{" "}
                  and{" "}
                  <a
                    href="/PrivacyPolicy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </div>

              <button
                className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 border-2 border-orange-400/60 hover:shadow-neumorph-orange hover:border-orange-500/80  focus:shadow-neumorph-orange-focus transition-all duration-300 text-lg"
                disabled={loading}
                onClick={() => sendOtpToVerifyEmail()}
              >
                {loading ? <CircularLoader /> : "Join TaskTribe"}
              </button>
            </div>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-gray-700 bg-white/70 backdrop-blur-sm px-4 py-3 rounded-2xl border border-orange-200/50 shadow-neumorph-sm">
              Already have an account?{" "}
              <Link
                to="/auth"
                className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } max-w-md mx-auto w-full mt-16`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-orange-200/50 shadow-neumorph-inset">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Verify Your Email
              </h2>

              <p className="text-sm text-center text-gray-600 mb-6">
                Enter the 6-digit OTP sent to <br />
                <span className="font-semibold">{formData.email}</span>
              </p>

              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-12 h-12 text-center text-lg font-bold bg-white/90 border-2 border-orange-200/70 rounded-xl focus:border-orange-400 focus:outline-none shadow-neumorph-sm"
                  />
                ))}
              </div>

              <button
                onClick={handleOtpVerify}
                className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 border-2 border-orange-400/60 hover:shadow-neumorph-orange transition-all duration-300 text-lg"
              >
                {loading ? "Verifying...." : "Verify OTP"}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                OTP valid for 5 minutes
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 h-screen bg-gray-900 relative hidden md:flex items-center justify-center overflow-hidden">
          <img
            src={team_meating}
            alt="team-img"
            loading="lazy"
            className="w-full h-full object-cover object-center rounded-none"
          />
          <p className="absolute bottom-12 right-16 text-white text-2xl font-script">
            make it real.
          </p>
        </div>
      </div>
    </>
  );
}
