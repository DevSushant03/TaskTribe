import React, { useState } from "react";
import ForgotPasswordEmail from "../Components/ForgotPasswordEmail";
import OtpVarificationForm from "../Components/OtpVarificationForm";
import { useMediaQuery } from "react-responsive";
import ResetPassword from "../Components/ResetPassword";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function ForgotPasswordOnboarding() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  console.log(isMobile);

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
      {/* animated orange gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-orange-500/30 blur-3xl" />
        <div className="absolute top-40 -right-20 h-80 w-80 rounded-full bg-amber-400/30 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-600/30 blur-3xl" />
      </div>

      {/* subtle grid + noise */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#ffffff10,_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,_#ffffff0f_1px,_transparent_1px),linear-gradient(to_bottom,_#ffffff0f_1px,_transparent_1px)] bg-[size:80px_80px]" />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-40"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

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
            <div className="space-y-4">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-900/80">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 transition-all duration-500 ${
                    step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"
                  }`}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${
                      step >= 1
                        ? "border-orange-400 bg-orange-500/20 text-orange-50"
                        : "border-slate-600 bg-slate-900/40 text-slate-400"
                    }`}
                  >
                    1
                  </div>
                  <span>Email</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${
                      step >= 2
                        ? "border-amber-400 bg-amber-500/20 text-amber-50"
                        : "border-slate-600 bg-slate-900/40 text-slate-400"
                    }`}
                  >
                    2
                  </div>
                  <span>OTP</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${
                      step === 3
                        ? "border-yellow-400 bg-yellow-500/20 text-yellow-50"
                        : "border-slate-600 bg-slate-900/40 text-slate-400"
                    }`}
                  >
                    3
                  </div>
                  <span>New password</span>
                </div>
              </div>
            </div>

            {/* security badges */}
            <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-black/60 px-3 py-1 backdrop-blur">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-500/20">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3 text-orange-300"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M9.5 16.5 6 13l1.4-1.4 2.1 2.1 7.1-7.1L18 8l-8.5 8.5Z"
                    />
                  </svg>
                </span>
                <span>Bank‑grade TLS & salted hashing</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-black/60 px-3 py-1 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>No password stored in plain text</span>
              </div>
            </div>
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
                  <OtpVarificationForm
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
