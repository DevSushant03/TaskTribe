import React, { useState } from "react";
import UserOnboarding1 from "./UserOnboarding1";
import UserOnboarding2 from "./UserOnboarding2";

function GetUserInfo() {
  const [step, setstep] = useState(0);
  const [userData, setUserData] = useState({});
  
  const NextStep = (data) => {
    if (data) {
      setUserData((prev) => ({ ...prev, ...data }));
    }
    setstep(prev => prev + 1);
  }
  const PreviousStep = () => setstep(prev => prev - 1);
  return (
    <>
      {step == 0 && <UserOnboarding1 onNext={NextStep} />}
      {step == 1 && <UserOnboarding2 onBack={PreviousStep} onNext={NextStep} userData={userData} />}
    </>
  );
}

export default GetUserInfo;
