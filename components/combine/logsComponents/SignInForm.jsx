import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Select, Spin, Tooltip } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  // Form,
  Link as RRLink,
  redirect,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { saveAdminId, saveUserId } from "../../../src/store/main";
import {
  saveAdminId as saveAdminIdOnBrowser,
  saveUserId as saveUserIdOnBrowser,
  setAdminLoginToken,
  setUserLoginToken,
} from "../../../utils/auth";
import { logIn } from "../../../utils/http";
import { validateSignup } from "../../../utils/signinValidate";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function SignIn() {
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      if (data.role === "employee") {
        // store the token as a cookie
        setUserLoginToken(data.userToken);

        // store user id to local host
        saveUserIdOnBrowser(data.userId);

        dispatch(saveUserId({ userId: data.userId }));

        navigate("/user");
      } else if (data.role === "admin") {
        // store the token as a cookie
        setAdminLoginToken(data.adminToken);

        // store admin id to local host
        saveAdminIdOnBrowser(data.adminId);

        dispatch(saveAdminId({ adminId: data.adminId }));

        navigate("/admin");
      }
    },
  });
  const onFinish = (values) => {
    const formData = { formData: values };
    mutate(formData);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>

      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        style={{
          maxWidth: 800,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["username"]}
          label="User Name"
          rules={[
            {
              required: true,
            },
            { min: 5, message: "Username must be at least 5 characters" },
            {
              pattern: /^(?=.*[0-9])(?=.*[a-z]).*$/,
              message: "Username must contain at least one number.",
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            { min: 8, message: "Password must be at least 8 characters" },
            { max: 20, message: "Password must be at most 20 characters" },
            {
              pattern: /^(?=.*[0-9])(?=.*[A-Z]).*$/,
              message:
                "Password must contain at least one number and one capital letter.",
            },
          ]}
          validateTrigger="onBlur"
        >
          <div className="tw-flex">
            <Input.Password
              placeholder="input password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
            <Button
              style={{ width: 80, marginLeft: "5px" }}
              onClick={() => setPasswordVisible((prevState) => !prevState)}
            >
              {passwordVisible ? "Hide" : "Show"}
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
              message: "Please select a role!",
            },
          ]}
        >
          <Select placeholder="select your role">
            <Option value="employee">user</Option>
            <Option value="admin">admin</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="tw-flex tw-items-center tw-justify-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <div>
                <Checkbox></Checkbox>
                <span> Remember me</span>
              </div>
            </Form.Item>

            <a className="login-form-forgot" href="#">
              Forgot password
            </a>
          </div>
        </Form.Item>
        {isError && (
          <Alert className=" tw-mb-2" variant="destructive">
            <WarningAmberIcon style={{ color: "#ff0000", fontSize: "16px" }} />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Incorrect username or password. Please try again.
            </AlertDescription>
          </Alert>
        )}
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
          }}
        >
          <div className="tw-flex tw-flex-col tw-items-center ">
            <Button
              type="primary"
              htmlType="submit"
              className="tw-w-[40%] tw-mb-2 tw-bg-[#5295E3] tw-rounded-md"
            >
              {isPending ? <Spin /> : "Sign in "}
            </Button>
            <RRLink to={"register?details=personal"}>
              {"Or register now!"}
            </RRLink>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}

SignIn.propTypes = {
  moveToSignIn: PropTypes.func,
};
export default SignIn;
