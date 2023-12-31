import EmailIcon from "@mui/icons-material/Email";
import { Button, Result } from "antd";
import {
  json,
  redirect,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import TokenInput from "./TokenInput";
// import styles from "./UserEmailVerifyPage.module.css";
import styles from "./emailVerification.module.css";

// export function UserEmailVerifyPage() {
//   const submit = useSubmit();
//   const params = useParams();
//   const navigate = useNavigate();

//   async function confirmEmailHandler() {
//     const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

//     const response = await fetch(
//       `${serverURL}/employee/verify/${params.id}/${params.token}`
//     );

//     if (!response.ok) {
//       throw json({ msg: "Couldn't fetch data" }, { status: 500 });
//     }

//     alert(await response.json());

//     navigate("/");
//   }

//   function resendEmailHandler() {
//     submit({ key: true }, { method: "get" });
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>Email Confirmation</h1>
//       </div>

//       <div className={styles.body}>
//         <p>
//           Thank you for signing up for our newsletter! Please click the button
//           below to confirm your email address.
//         </p>

//         <a href="" className={styles.btn} onClick={confirmEmailHandler}>
//           Confirm Email
//         </a>

//         <a href="#" className={styles.btn} onClick={resendEmailHandler}>
//           Resend Email
//         </a>
//       </div>

//       <div className={styles.footer}>
//         <p>If you have any questions, please don't hesitate to contact us.</p>
//       </div>
//     </div>
//   );
// }

// export async function action({ request, params }) {
//   const data = await request.formData();

//   const employeeId = params.id;
//   const employeeToken = params.token;
//   const isConfirm = data.get("key");

//   if (isConfirm) {
//     const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

//     const response = await fetch(
//       `${serverURL}/employee/verify/:${employeeId}/:${employeeToken}`
//     );

//     if (!response.ok) {
//       throw json({ msg: "Couldn't fetch data" }, { status: 500 });
//     }

//     return redirect("/");
//   }
// }

const UserEmailVerification = () => (
  <Result
    icon={<EmailIcon />}
    title="Email Verification"
    className={styles.results}
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
    subTitle="Please check your inbox and enter the verification code below to verify your email address. It will expire in the future."
    extra={
      <>
        <TokenInput />
        <Button type="primary" key="console">
          Verify
        </Button>
        <div>
          <Button type="link">Resend Code</Button>
          <Button type="link">Change email</Button>
        </div>
      </>
    }
  />
);
export default UserEmailVerification;
