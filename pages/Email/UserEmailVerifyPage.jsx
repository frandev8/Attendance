import { employeeRegisterVerify } from "@/utils/http";
import EmailIcon from "@mui/icons-material/Email";
import { useQuery } from "@tanstack/react-query";
import { Button, Result, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  json,
  redirect,
  useNavigate,
  useParams,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import TokenInput from "./TokenInput";
import styles from "./UserEmailVerifyPage.module.css";

const UserEmailVerification = () => {
  const [enteredPin, setPin] = useState(["", "", "", "", ""]);
  const [isVerifyBtnActive, setVerifyBtn] = useState(false);
  const [isQueryEnabled, setQueryActiveness] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id, token } = useParams();

  const formValue = enteredPin.join("");

  const { data, isLoading } = useQuery({
    queryKey: ["employee", { type: "email" }],
    queryFn: () => employeeRegisterVerify({ id, token, pin: formValue }),
    enabled: isQueryEnabled,
  });

  useEffect(() => {
    const mode = searchParams.get("mode");
    const pin = searchParams.get("pin");

    if (mode === "auto" && pin) {
      try {
        const results = employeeRegisterVerify({ id, token, pin });

        if (results) {
          navigate(`../register/user/verify/success/${id}/${token}`);
        }
      } catch (e) {
        // navigate(`../../error/${id}`);
      }
    }
  }, [searchParams, navigate, id, token, data]);

  if (data) {
    navigate(`../register/user/verify/success/${id}/${token}`);
  }

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
            {isLoading ? <Spin size="small" /> : "Verify"}
          </Button>
          <div className="tw-flex  tw-w-full tw-justify-between hover:tw-bg-[]">
            <Button type="link">Resend Code</Button>
            <Button type="link">Change email</Button>
          </div>
        </>
      }
    />
  );
};

export async function loader({ id }) {
  // return queryClient.fetchQuery({
  //   queryKey: ["admin", { details: "personal" }],
  //   queryFn: () => fetchAdminById({ id }),
  // });
}
export default UserEmailVerification;
