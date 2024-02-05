import { Button } from "@/components/ui/button";
import AddIcon from "@mui/icons-material/Add";
import { Tabs } from "antd";
import { useState } from "react";
import AnnouncementList from "../Announcement/AnnouncementList";
import { NewAnnouncement } from "../Announcement/NewAnnouncement";
import { NewNotification } from "../Notification/NewNotification";
import NotificationList from "../Notification/NotificationList";

function Messages() {
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
    setAnnounceModalStatus(false);
  }

  const onChange = (key) => {
    
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
            <span className="min-[481px]:tw-hidden">
              <AddIcon />{" "}
            </span>{" "}
            <span className="max-[480px]:tw-hidden tw-mr-[2px]"> New </span>{" "}
            notification
          </Button>
          <Button
            type="primary"
            className={"tw-ml-[5px]"}
            onClick={openAnnouncementModal}
          >
            <span className="min-[481px]:tw-hidden">
              <AddIcon />{" "}
            </span>
            <span className="max-[480px]:tw-hidden tw-mr-[2px]"> New </span>{" "}
            announcement
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

export default Messages;
