import React, { useState } from "react";
import ForgotPasswordEmail from "../Components/ForgotPasswordEmail";
import OtpVarificationForm from "../Components/OtpVarificationForm";
import ResetPassword from "../Components/ResetPassword";
export default function ForgotPasswordOnboarding() {
  const [step, setstep] = useState(1);
  const [email, setemail] = useState("")
  const nextStep = () => setstep((prev) => prev + 1);
  const back = () => setstep((prev) => prev - 1);
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      {step === 1 && <ForgotPasswordEmail setemail={setemail} nextStep={nextStep} />}
      {step === 2 && <OtpVarificationForm nextStep={nextStep} email={email}/>}
      {step === 3 &&  <ResetPassword setemail={email} email={email}/>}
    </div>
  );
}
