import React, { useState } from "react";
import ForgetPasswordBackground from "../components/ForgetPasswordBackground";
import ProgressBar from "../components/ProgressBar";
import SecurityBadges from "../components/SecurityBadges";

import ForgotPasswordEmail from "../components/ForgotPasswordEmail";
import OtpVerificationForm from "../components/OtpVerificationForm";
import ResetPassword from "../components/ResetPassword";

import { useMediaQuery } from "react-responsive";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordOnboarding() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const navigate = useNavigate();
  const [step, setstep] = useState(1);
  const [email, setemail] = useState("");
  const nextStep = () => setstep((prev) => prev + 1);
  const back = () => setstep((prev) => prev - 1);
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050507] text-slate-50">
      <button
        onClick={() => navigate(-1)}
        className={`fixed z-11 flex justify-evenly w-40 cursor-pointer ${
          isMobile ? "top-5" : "bottom-5"
        }   left-5 text-white bg-orange-500  p-2 rounded-full `}
      >
        <FaArrowAltCircleLeft color="white" size={25} /> back to login
      </button>
      <ForgetPasswordBackground />
      {/* content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1.2fr,1fr]">
          {/* left: storytelling + trust */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Forgot your password?
                <span className="block bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Let’s secure your account.
                </span>
              </h1>
            </div>

            {/* progress / steps */}
            <ProgressBar step={step} />

            {/* security badges */}
            <SecurityBadges/>
          </div>

          {/* right: glassy auth card shell (your steps go inside) */}
          <div className="relative flex items-center justify-center">
            {/* floating ring */}
            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-b from-orange-500/70 via-transparent to-yellow-400/60 opacity-70 blur-xl" />

            <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-4 shadow-[0_18px_80px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-8">
              {/* lock + label */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 1 1 6 0v3H9Zm3 4a1.75 1.75 0 0 1 1 3.18V19h-2v-1.82A1.75 1.75 0 0 1 12 14Z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                      Secure reset
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Session expires in 10 minutes
                    </span>
                  </div>
                </div>

                {/* step chip */}
                <div className="rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-slate-100">
                  Step {step} / 3
                </div>
              </div>

              {/* your existing step forms */}
              <div className="min-h-[230px]">
                {step === 1 && (
                  <ForgotPasswordEmail
                    setEmail={setemail}
                    nextStep={nextStep}
                  />
                )}
                {step === 2 && (
                  <OtpVerificationForm
                    nextStep={nextStep}
                    back={back}
                    setEmail={setemail}
                    email={email}
                  />
                )}
                {step === 3 && <ResetPassword back={back} email={email} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
