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
  }
  return (
    <div className="relative">
      <div className="absolute top-[50%] left-[50%] translate-x-[50%] text-center">
        <h2>{title}</h2>
        <div>{message}</div>
      </div>
    </div>
  );
}

export default ErrorPage;
