import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import { useQuery } from "@tanstack/react-query";
import { Badge, List, Popover } from "antd";
import React from "react";
import { fetchNotification } from "../../../utils/http";

function ViewNotification() {
  const { data, isPending } = useQuery({
    queryKey: ["notification"],
    queryFn: fetchNotification,
  });

  let listData = [];

  if (data) {
    // console.log(data, typeof data);
    // listData = data;
  }

  const content = (
    <List
      size="large"
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item.message}</List.Item>}
    />
  );

  return (
    <IconButton color="inherit" sx={{ maxWidth: "40px" }}>
      <Popover placement="topLeft" title={"Notification"} content={content}>
        <Badge count={5}>
          <NotificationsIcon />
        </Badge>
      </Popover>
    </IconButton>
  );
}

export default ViewNotification;
