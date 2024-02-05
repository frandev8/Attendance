import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";
import React from "react";
import styles from "./LogInError.module.css";
const { Paragraph, Text } = Typography;

const LogInError = () => (
  <Result
    status="error"
    title="Submission Failed"
    subTitle="Please check and modify the following information before resubmitting."
    className={`${styles["results"]}`}
    extra={[
      <Button type="primary" key="console">
        Go to Login
      </Button>,
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
export default LogInError;
