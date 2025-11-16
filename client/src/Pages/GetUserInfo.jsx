import React, { useState } from "react";
import UserOnboarding1 from "./UserOnboarding1";
import UserOnboarding2 from "./UserOnboarding2";
import UnderConstruction from "./UnderConstruction";

function GetUserInfo() {
  const [step, setstep] = useState(0);
  const NextStep = () => setstep(prev => prev + 1);
  const PreviousStep = () => setstep(prev => prev - 1);
  return (
    <>
      {step == 0 && <UserOnboarding1 onNext={NextStep} />}
      {step == 1 && <UserOnboarding2 onBack={PreviousStep} onNext={NextStep} />}
      {step == 2 && <UnderConstruction />}
    </>
  );
}

export default GetUserInfo;
