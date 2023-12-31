import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Input, Space } from "antd";
import React from "react";
import { changeAdminPassword } from "../../../utils/http";

import ErrorPasswordDetails from "./ErrorPasswordDetails";
const PasswordSettings = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: changeAdminPassword,
    onSuccess: (data) => {
      console.log("successful update");
    },
  });

  return (
    <>
      <h1>Password</h1>
      <Space direction="vertical">
        <label htmlFor="old">Old Password</label>
        <Input.Password name="old" id="old" />
        {/* <ErrorPasswordDetails /> */}
        <label htmlFor="new">New Password</label>
        <Input.Password
          name="new"
          id="new"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <ErrorPasswordDetails />
        <label htmlFor="confirm">Confirm Password</label>
        <Input.Password
          name="confirm"
          id="confirm"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <div>
          <button>Change Password</button>
        </div>
      </Space>
    </>
  );
};
export default PasswordSettings;
