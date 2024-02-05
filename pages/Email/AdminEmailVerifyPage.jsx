import {
  json,
  redirect,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";

import { adminRegisterVerify } from "@/utils/http";
import EmailIcon from "@mui/icons-material/Email";
import { useQuery } from "@tanstack/react-query";
import { Button, Result, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./AdminEmailVerifyPage.module.css";
import TokenInput from "./TokenInput";

export async function action({ request, params }) {
  const data = await request.formData();

  const employeeId = params.id;
  const employeeToken = params.token;
  const isConfirm = data.get("key");

  if (isConfirm) {
    const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

    const response = await fetch(
      `${serverURL}/admin/verify/:${employeeId}/:${employeeToken}`
    );

    if (!response.ok) {
      throw json({ msg: "Couldn't fetch data" }, { status: 500 });
    }

    return redirect("/");
  }
}

const AdminEmailVerification = () => {
  const [enteredPin, setPin] = useState(["", "", "", "", ""]);
  const [isVerifyBtnActive, setVerifyBtn] = useState(false);
  const [isQueryEnabled, setQueryActiveness] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id, token } = useParams();

  const formValue = enteredPin.join("");

  const { data, isPending } = useQuery({
    queryKey: ["admin", { type: "email" }],
    queryFn: () => adminRegisterVerify({ id, token, pin: formValue }),
    enabled: isQueryEnabled,
  });

  useEffect(() => {
    const mode = searchParams.get("mode");
    const pin = searchParams.get("pin");

    if (mode === "auto" && pin) {
      try {
        const results = adminRegisterVerify({ id, token, pin });

        if (results) {
          navigate(`../register/admin/verify/success/${id}/${token}`);
        }
      } catch (e) {
        // navigate(`../../error/${id}`);
      }
    }
    if (data) {
      navigate(`../register/admin/verify/success/${id}/${token}`);
    }
  }, [searchParams, navigate, id, token, data]);

  function onVerifyHandler() {
    setQueryActiveness(true);
  }

  return (
    <Result
      icon={<EmailIcon />}
      title="Email Verification"
      className={styles.results}
      subTitle="Please check your inbox and enter the verification code below to verify your email address. It will expire in the future."
      extra={
        <>
          <TokenInput
            token={enteredPin}
            setToken={setPin}
            setVerifyBtn={setVerifyBtn}
          />
          <Button
            key="console"
            className="tw-w-[80px] tw-my-[10px]"
            disabled={!isVerifyBtnActive}
            onClick={onVerifyHandler}
          >
            {isPending && isQueryEnabled ? <Spin size="small" /> : "Verify"}
          </Button>
          <div className="tw-flex tw-w-full tw-justify-between">
            <Button type="link">Resend Code</Button>
            <Button type="link">Change email</Button>
          </div>
        </>
      }
    />
  );
};
export default AdminEmailVerification;
