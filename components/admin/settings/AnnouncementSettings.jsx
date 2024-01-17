import { Button } from "@/components/ui/button";
import { Tabs } from "antd";
import { useState } from "react";
import AnnouncementList from "../Announcement/AnnouncementList";
import { NewAnnouncement } from "../Announcement/NewAnnouncement";
import { NewNotification } from "../Notification/NewNotification";
import NotificationList from "../Notification/NotificationList";

function Announcement() {
  const [isNotificationModalOpen, setNotificationModalStatus] = useState(false);
  const [isAnnounceModalOpen, setAnnounceModalStatus] = useState(false);

  function openNotificationModal() {
    setNotificationModalStatus(true);
  }

  function closeNotificationModal() {
    setNotificationModalStatus(false);
  }

  function openAnnouncementModal() {
    setAnnounceModalStatus(true);
  }

  function closeAnnouncementModal() {
    console.log("clicked");
    setAnnounceModalStatus(false);
  }

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
  return (
    <div>
      <div>All messages</div>

      <div className="tw-flex tw-justify-end ">
        <div className="tw-flex tw-items-center tw-width-[50%] sm:tw-width-[30%] md:tw-width-[25%] md:tw-width-[20%]">
          <Button
            type="primary"
            className={"tw-bg-[#c72e2e]"}
            onClick={openNotificationModal}
          >
            New notification
          </Button>
          <Button
            type="primary"
            className={"tw-ml-[5px]"}
            onClick={openAnnouncementModal}
          >
            New announcement
          </Button>
        </div>
      </div>

      <div className="tw-mt-[50px]">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
      {isNotificationModalOpen && (
        <NewNotification closeModal={closeNotificationModal} />
      )}
      {isAnnounceModalOpen && (
        <NewAnnouncement closeModal={closeAnnouncementModal} />
      )}
    </div>
  );
}

export default Announcement;
