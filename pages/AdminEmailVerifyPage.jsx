import {
  json,
  redirect,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import styles from "./AdminEmailVerifyPage.module.css";

export function AdminEmailVerifyPage() {
  const submit = useSubmit();
  const params = useParams();
  const navigate = useNavigate();

  async function confirmEmailHandler() {
    const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

    const response = await fetch(
      `${serverURL}/admin/verify/${params.id}/${params.token}`
    );

    if (!response.ok) {
      throw json({ msg: "Couldn't fetch data" }, { status: 500 });
    }

    alert(await response.json());

    navigate("/");
  }

  function resendEmailHandler() {
    submit({ key: true }, { method: "get" });
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Email Confirmation</h1>
      </div>

      <div className={styles.body}>
        <p>
          Thank you for signing up for our newsletter! Please click the button
          below to confirm your email address.
        </p>

        <a href="#" className={styles.btn} onClick={confirmEmailHandler}>
          Confirm Email
        </a>

        <a href="#" className={styles.btn} onClick={resendEmailHandler}>
          Resend Email
        </a>
      </div>

      <div className={styles.footer}>
        <p>If you have any questions, please don't hesitate to contact us.</p>
      </div>
    </div>
  );
}

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
