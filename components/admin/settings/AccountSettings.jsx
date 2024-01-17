import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useLoaderData } from "react-router-dom";
// import { Input, Space } from "antd";
import { mutateAdminPersonalDetails } from "@/utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAdminById } from "../../../utils/http";
import styles from "./AccountSettings.module.css";
import ErrorPasswordDetails from "./ErrorPasswordDetails";
import UploadImage from "./UploadImage";

const { Option } = Select;

const SubmitButton = ({ form, isActive }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
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
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable || !isActive}
    >
      Submit
    </Button>
  );
};

function AccountSettings() {
  const [form] = Form.useForm();

  const [isFormChanged, setFormMode] = useState(false);

  const loaderData = useLoaderData();

  let initialValues = {
    firstname: loaderData.firstname,
    lastname: loaderData.lastname,
    username: loaderData.username,
    email: loaderData.email,
    phone: loaderData.phone,
    prefix: "+233",
  };

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: mutateAdminPersonalDetails,
    onSuccess: (data) => {
      console.log("successful update");
    },
  });

  function onChangeForm(e) {
    // const name = e.target.name;

    const value = e.target.value;

    console.log(e.target);

    // if (value !== initialValues["firstname"]) {
    //   setFormMode(true);
    // } else {
    //   setFormMode(false);
    // }
  }

  const onFinish = (values) => {
    const formData = { formData: values };
    mutate({ formData, id: loaderData._id });
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
      <div className="">
        <div className={`${styles.box1} tw-w-full tw-mb-[8px]`}>
          <div
            className={`tw-w-[150px] tw-flex tw-flex-col tw-justify-center tw-items-center`}
          >
            <span>Your Profile Picture</span>
            <div>
              <UploadImage />
            </div>
            <div>Edit your profile</div>
          </div>
        </div>
        <Divider variant="middle" />

        <Form
          form={form}
          name="validateOnly"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
          initialValues={initialValues}
          className={`${styles.form} tw-mt-[15px]`}
        >
          <div className={styles.wrapper1}>
            <div className={`${styles.box2} tw-gap-2`}>
              <Form.Item
                name="firstname"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </div>

            <div className={`${styles.box2} tw-gap-2`}>
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
            </div>
            <div className={`${styles.box2} tw-gap-2`}>
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
            </div>
          </div>

          <Form.Item>
            <Space>
              <SubmitButton form={form} isActive={isFormChanged} />
              <Button htmlType="reset" to="./">
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AccountSettings;
