import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
export const SuccessAccountActivation = () => (
  <Result
    status="success"
    title="Account Activated!"
    subTitle="Thank you for verifying your email. Your account has been successfully activated."
    // style={{
    //   width: "100vw",
    //   height: "100vh",
    //   position: "absolute",
    //   top: "0",
    //   left: "0",
    //   backgroundColor: "#ffff",
    // }}
    extra={[
      <Button key="console" className="tw-w-[100px]">
        {" "}
        <Link to="/auth">Go to Login</Link>
      </Button>,
    ]}
  />
);
