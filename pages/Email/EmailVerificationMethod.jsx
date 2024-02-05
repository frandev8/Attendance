import React from "react";
import { useSearchParams } from "react-router-dom";
import SignUp from "../../components/combine/logsComponents/SignUpForm.jsx";
import SignUpPrivacy from "../../components/combine/logsComponents/SignUpPrivacyForm.jsx";
import SuccessfulActivation from "../Results/SuccessfulActivation.jsx";

function EmailVerificationMethod() {
  const [searchParams] = useSearchParams();

  const isAutoActivate = searchParams.get("mode") === "verify";

  if (isAutoActivate) {
    return <SuccessfulActivation />;
  } else {
    return <SignUpPrivacy />;
  }
}

export default EmailVerificationMethod;
