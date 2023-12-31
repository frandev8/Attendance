import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useActionData } from "react-router-dom";
import "./LogInErrorPage.css";

const { Paragraph, Text } = Typography;
function LogInErrPage() {
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

  if (response?.status == 403) {
    return (
      <Result
        status="error"
        title="Submission Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      >
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              The content you submitted has the following error:
            </Text>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" /> Your
            account has been frozen. <a>Thaw immediately &gt;</a>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" /> Your
            account is not yet eligible to apply. <a>Apply Unlock &gt;</a>
          </Paragraph>
        </div>
      </Result>
    );
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

export default LogInErrPage;
