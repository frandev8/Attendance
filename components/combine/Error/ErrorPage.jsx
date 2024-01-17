import { Button, Result } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useActionData } from "react-router-dom";
function ErrorPage() {
  const response = useActionData();
  let title = "An error occurred";
  let message = "Something bad happened";

  if (response?.status == 500) {
    title = "Sever Error";
    message = "Problem from the server";

    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  }
  return (
    <div className="tw-relative">
      <div className="tw-absolute tw-top-[50%] tw-left-[50%] tw-translate-x-[50%] tw-text-center">
        <h2>{title}</h2>
        <div>{message}</div>
      </div>
    </div>
  );
}

export default ErrorPage;
