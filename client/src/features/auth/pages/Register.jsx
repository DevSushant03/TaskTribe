import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import { registerSchema } from "../validator/auth_validation.js";
import useRegister from "../hooks/useRegister.jsx";
import useSendOtp from "../hooks/useSendOtp.jsx";
import useVerifyRegisterOtp from "../hooks/useVerifyRegisterOtp.jsx";

import RegisterForm from "../components/RegisterForm.jsx";
import OtpVerificationForm from "../components/OtpVerificationForm.jsx";
import AuthImage from "../components/AuthImage.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState("details"); // "details" | "otp"
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const methods = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      agreedRules: false,
    },
  });
  const generateOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyRegisterOtp();
  const registerMutation = useRegister();

 

  // Step 1: details are valid (RHF + zod already checked this) -> request OTP -> email it
  const handleDetailsSubmit = async (data) => {
    try {
      const res = await generateOtpMutation.mutateAsync(data.email);

      if (!res.data.success) {
        toast.info(res.data.message);
        return;
      }

      const expiryTime = new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString();

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          email: data.email,
          title: "OTP Verification",
          message: "Use the following One-Time Password to verify your account:",
          highlight: res.data.otp,
          footer_note: `This OTP is valid for 15 minutes till ${expiryTime}. Do not share this OTP with anyone.`,
          year: new Date().getFullYear(),
          company_name: "TaskTribe",
          website_url: "https://tasktribe-plum.vercel.app",
          logo_url: "https://tasktribe-plum.vercel.app/icon.jpeg",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success("OTP sent successfully");
      setStep("otp");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Failed to send OTP");
    }
  };

  // Step 2: verify OTP -> then actually register the user
  const handleOtpVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter valid 6-digit OTP");
      return;
    }

    const email = methods.getValues("email");

    try {
      const verifyRes = await verifyOtpMutation.mutateAsync({ otp: enteredOtp, email });

      if (!verifyRes.data.success) {
        toast.error(verifyRes.data.message);
        return;
      }

      const formData = methods.getValues();
      const registerRes = await registerMutation.mutateAsync({
        ...formData,
        otp: enteredOtp,
      });

      if (registerRes.data.success) {
        toast.success(registerRes.data.message);
        navigate("/auth");
      } else {
        toast.error(registerRes.data.message);
      }
    } catch (err) {
      toast.error(err?.message || "Registration failed");
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
          <button
            onClick={() => navigate("/")}
            className="absolute flex justify-evenly w-25 cursor-pointer top-5 left-5 text-white bg-orange-500 p-2 rounded-full"
          >
            <FaArrowAltCircleLeft color="white" size={25} /> Home
          </button>

          {step === "details" && (
            <FormProvider {...methods}>
              <RegisterForm onValid={handleDetailsSubmit} loading={generateOtpMutation.isPending} />
            </FormProvider>
          )}

          {step === "otp" && (
            <OtpVerificationForm
              otp={otp}
              setOtp={setOtp}
              email={methods.getValues("email")}
              onVerify={handleOtpVerify}
              loading={verifyOtpMutation.isPending || registerMutation.isPending}
            />
          )}

          {step === "details" && (
            <p className="mt-6 text-center text-sm text-gray-700 bg-white/70 backdrop-blur-sm px-4 py-3 rounded-2xl border border-orange-200/50 shadow-neumorph-sm max-w-md mx-auto">
              Already have an account?{" "}
              <Link
                to="/auth"
                className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Sign In
              </Link>
            </p>
          )}
        </div>

        <AuthImage />
      </div>
    </>
  );
}