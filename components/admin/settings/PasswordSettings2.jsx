import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Select, Space } from "antd";
import { useSelector } from "react-redux";
import { changeAdminPassword } from "../../../utils/http";
import ErrorPasswordDetails from "./ErrorPasswordDetails";
const { Option } = Select;

const validateMessages = {
  required: "${label} is required!",
};

const PasswordSettings = () => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: changeAdminPassword,
    onSuccess: (data) => {
      onReset();
    },
  });

  const adminId = useSelector((state) => state.admin.adminId);

  const onFinish = (values) => {
    const formData = { ...values };

    mutate({ formData, id: adminId });
  };
  return (
    <>
      <div className={"tw-mb-[10px]"}>
        <h1 className={"tw-text-left"}>Password</h1>
      </div>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        initialValues={{ prefix: "+233" }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="oldPassword"
          label="Old Password"
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
          <Input.Password className="tw-max-w-[200px]" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
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
          <Input.Password className="tw-max-w-[200px]" />
        </Form.Item>
        <ErrorPasswordDetails />
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password className="tw-max-w-[200px]" />
        </Form.Item>

        <Form.Item>
          <Space direction="vertical">
            <div>
              <Button htmlType="submit" to="./">
                Change Password
              </Button>
            </div>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default PasswordSettings;
