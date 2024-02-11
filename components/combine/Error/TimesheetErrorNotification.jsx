import { Button, Divider, notification, Space } from "antd";
import React from "react";
const Context = React.createContext({
  name: "Default",
});

function TimesheetErrorNotification() {
  const [api, contextHolder] = notification.useNotification();

  
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };
  return <div>TimsheetErrorNotification</div>;
}

export default TimesheetErrorNotification;
