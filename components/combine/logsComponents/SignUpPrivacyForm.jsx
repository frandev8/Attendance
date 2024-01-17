import { ArrowBack } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Select, Spin, Tooltip } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link as RRLink, useNavigate } from "react-router-dom";
import { register } from "../../../utils/http";
import { validateSignup } from "../../../utils/signinValidate";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 12,
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

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 80 }}>
      <Option value="233">+233</Option>
    </Select>
  </Form.Item>
);

function SignUpPrivacy() {
  const navigate = useNavigate();

  const personalData = useSelector((state) => state.register.personal);

  const { mutate, isPending, data, isError } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      const role = data.role;
      const id = data.id;
      const token = data.token;

      if (role === "employee") {
        navigate(`/auth/register/user/verify/${id}/${token}`);
      } else if (role === "admin") {
        navigate(`/auth/register/admin/verify/${id}/${token}`);
      }
    },
  });

  const onFinish = (values) => {
    const formData = { ...personalData, ...values };

    mutate({ formData });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Form
        {...layout}
        name="mutate-personality"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        layout="vertical"
        style={{
          maxWidth: 600,
        }}
        initialValues={{ prefix: "+233" }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="firstname"
          label="First name"
          rules={[
            {
              required: true,
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input />
        </Form.Item>
        <Form.Item name="lastname" label="Last name" rules={[]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern: /^(?=.*[0-9])(?=.*[A-Z]).*$/,
              message:
                "Password must contain at least one number and one capital letter.",
            },
            { min: 8, message: "Password must be at least 8 characters" },
            { max: 20, message: "Password must be at most 20 characters" },
          ]}
          hasFeedback
          validateTrigger="onBlur"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
            { min: 9, message: "Please enter a valid phone number" },
            { max: 14, message: "Please enter a valid phone number" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
          }}
        >
          {/* <Button type="primary" htmlType="submit">
            Sign up
          </Button> */}
          <div className="tw-flex tw-justify-between">
            <RRLink to={"./?details=personal"}>
              <ArrowBack color="#0000f" /> {"go back"}
            </RRLink>

            <Button
              type="dashed"
              htmlType="submit"
              className="tw-border-[#0000ff] tw-w-[45%] tw-mb-2"
            >
              {isPending ? <Spin></Spin> : "Sign up!"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}

SignUpPrivacy.propTypes = {
  moveToSignIn: PropTypes.func,
};
export default SignUpPrivacy;
