import { Tabs } from "antd";
import React from "react";
import AnnouncementList from "./AnnouncementList";
import NotificationList from "./NotificationList";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Announcements",
    children: <AnnouncementList />,
  },
  {
    key: "2",
    label: "Notifications",
    children: <NotificationList />,
  },
];

function Notification() {
  return (
    <div>
      <div>All messages</div> <button>New notification</button>
      <button>New message</button>
      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
}

export default Notification;
