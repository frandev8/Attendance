import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
// import { Input, Space } from "antd";
import PropTypes from "prop-types";

import { mutateAdminPersonalDetails } from "@/utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAdminById, queryClient } from "../../../utils/http";
import styles from "./AccountSettings.module.css";
import ErrorPasswordDetails from "./ErrorPasswordDetails";
import UploadImage from "./UploadImage";

const { Option } = Select;

const SubmitButton = ({ form, hasFormChanged }) => {
  const [submittable, setSubmittable] = useState(false);

  const { firstname, lastname, email, username, phone } = hasFormChanged;

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          if (firstname || lastname || email || username || phone) {
            setSubmittable(true);
          } else {
            setSubmittable(false);
          }
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values, lastname, firstname, email, username, phone, form]);

  function onUpdateEmployeeInfoHandler() {}
  return (
    <Button
      htmlType="submit"
      disabled={!submittable}
      onClick={onUpdateEmployeeInfoHandler}
    >
      Update
    </Button>
  );
};

function AccountSettings() {
  const [form] = Form.useForm();

  const [isFormChanged, setFormMode] = useState(false);

  const adminId = useSelector((state) => state.admin.adminId);

  const { data: personalData } = useQuery({
    queryKey: ["admin", { details: "personal" }],
    queryFn: () => fetchAdminById({ id: adminId }),
    // staleTime: 5000,
  });

  let initialValues = {
    firstname: personalData.firstname,
    lastname: personalData.lastname,
    username: personalData.username,
    email: personalData.email,
    phone: personalData.phone,
    prefix: "+233",
  };

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: mutateAdminPersonalDetails,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["employee", { details: "personal" }],
      });
    },
  });

  function onChangeForm(e) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "firstname":
        if (value.trim() !== initialValues.firstname) {
          setFormMode((prev) => ({ ...prev, firstname: true }));
        } else {
          setFormMode((prev) => ({ ...prev, firstname: false }));
        }
        break;
      case "lastname":
        if (value.trim() !== initialValues.lastname) {
          setFormMode((prev) => ({ ...prev, lastname: true }));
        } else {
          setFormMode((prev) => ({ ...prev, lastname: false }));
        }
        break;
      case "username":
        if (value.trim() !== initialValues.username) {
          setFormMode((prev) => ({ ...prev, username: true }));
        } else {
          setFormMode((prev) => ({ ...prev, username: false }));
        }
        break;
      case "email":
        if (value.trim() !== initialValues.email) {
          setFormMode((prev) => ({ ...prev, email: true }));
        } else {
          setFormMode((prev) => ({ ...prev, email: false }));
        }
        break;
      case "phone":
        if (value.trim() !== initialValues.phone) {
          setFormMode((prev) => ({ ...prev, phone: true }));
        } else {
          setFormMode((prev) => ({ ...prev, phone: false }));
        }
        break;
      default:
        break;
    }
  }

  const onFinish = (values) => {
    const formData = { formData: values };
    mutate({ formData, id: personalData._id });
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
                onChange={onChangeForm}
              >
                <Input name="firstname" />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[{ required: true }]}
                onChange={onChangeForm}
              >
                <Input name="lastname" />
              </Form.Item>
            </div>

            <div className={`${styles.box2} tw-gap-2`}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true }]}
                onChange={onChangeForm}
              >
                <Input name="username" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ type: "email", required: true }]}
                onChange={onChangeForm}
              >
                <Input name="email" />
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
                onChange={onChangeForm}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                  name="phone"
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <Space>
              <SubmitButton form={form} hasFormChanged={isFormChanged} />
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

SubmitButton.propTypes = {
  hasFormChanged: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};
