import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Select, Spin, Tooltip } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  // Form,
  Link as RRLink,
  useNavigate,
} from "react-router-dom";
import { savePersonalDetails } from "../../../src/store/main";
import { saveSignUpPersonal } from "../../../utils/auth";
import { checkSignUpCredentials } from "../../../utils/http";
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
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

/* eslint-enable no-template-curly-in-string */
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const personalData = useSelector((state) => state.register.personal);

  const formInitial = {
    username: personalData?.username,
    email: personalData?.email,
    role: personalData?.role,
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: checkSignUpCredentials,
    onSuccess: (data) => {
      dispatch(savePersonalDetails({ personalData: data.personalData }));
      saveSignUpPersonal(data.personalData);
      navigate("./?details=private");
    },
  });
  const onFinish = (values) => {
    mutate({ formData: values });
  };
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        style={{
          width: 300,
          maxWidth: 400,
        }}
        validateMessages={validateMessages}
        initialValues={formInitial}
      >
        <Form.Item
          name={"username"}
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
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: "Role is required",
            },
          ]}
        >
          <Select placeholder="Select role">
            <Option value="employee">user</Option>
            <Option value="admin">admin</Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
          }}
        >
          <div className="flex flex-col items-center">
            <Button
              type="dashed"
              htmlType="submit"
              className="border-[#0000ff] w-[45%] mb-2"
            >
              Next {isPending ? <Spin /> : <ArrowForwardIcon color="#0000f" />}
            </Button>
            <RRLink to={"/"}>{"Or Sign in!"}</RRLink>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}

SignUp.propTypes = {
  moveToSignIn: PropTypes.func,
};
export default SignUp;
