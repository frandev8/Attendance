import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      renderItem={(item) => (
        <List.Item>
          <div className="tw-flex tw-items-start tw-gap-4 tw-mb-4">
            <Avatar className="tw-w-10 tw-h-10 tw-border">
              <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="tw-grid tw-gap-1">
              <p className="tw-font-medium">{item.message}</p>
              <p className="tw-text-xs tw-text-gray-500 tw-dark:text-gray-400">
                5 min ago
              </p>
            </div>
          </div>
        </List.Item>
      )}
    />
  );

  return (
    <IconButton color="inherit" sx={{ maxWidth: "40px" }}>
      <Popover placement="bottom" title={"Notification"} content={content}>
        <Badge count={data?.length || 0}>
          <NotificationsIcon style={{ color: "white" }} />
        </Badge>
      </Popover>
    </IconButton>
  );
}

export default ViewNotification;
