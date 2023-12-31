import React from "react";
import { useSearchParams } from "react-router-dom";
import SignUp from "../../components/combine/logsComponents/SignUpForm.jsx";
import SignUpPrivacy from "../../components/combine/logsComponents/SignUpPrivacyForm.jsx";

function SignUpController() {
  const [searchParams] = useSearchParams();

  const isPersonal = searchParams.get("details") === "personal";
  const isPrivate = searchParams.get("details") === "private";

  if (isPersonal) {
    return <SignUp />;
  }

  if (isPrivate) {
    return <SignUpPrivacy />;
  }
  
}

export default SignUpController;
