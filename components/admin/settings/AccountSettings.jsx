import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useLoaderData } from "react-router-dom";
// import { Input, Space } from "antd";
// import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { fetchAdminById } from "../../../utils/http";
import styles from "./AccountSettings.module.css";
import ErrorPasswordDetails from "./ErrorPasswordDetails";
import UploadImage from "./UploadImage";

const { Option } = Select;

const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

function AccountSettings() {
  const [form] = Form.useForm();

  const loaderData = useLoaderData();

  let initialValues = {
    firstname: loaderData.firstname,
    lastname: loaderData.lastname,
    username: loaderData.username,
    email: loaderData.email,
    phone: loaderData.phone,
    prefix: "+233",
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="233">+233</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div>
      <div>
        <Box sx={{ my: 3, mx: 2 }}>
          <div>
            <span>Your Profile Picture</span>
            <UploadImage />
            <div>Edit your profile</div>
          </div>
        </Box>
        <Divider variant="middle" />

        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          initialValues={initialValues}
        >
          <Space direction="vertical">
            <Space direction="horizontal">
              <Form.Item
                name="firstname"
                label="First Name"
                // rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Last Name"
                // rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Space>

            <Space direction="horizontal">
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ type: "email", required: true }]}
              >
                <Input />
              </Form.Item>
            </Space>
            <Space direction="horizontal">
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Space>
          </Space>

          <Form.Item>
            <Space>
              <SubmitButton form={form} />
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AccountSettings;
