import { formatTimeOffDate } from "@/utils/date";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spin, Table } from "antd";
import { useEffect, useState } from "react";
import {
  deleteNotification,
  fetchNotification,
  queryClient,
} from "../../../utils/http";
import { EditNotification } from "./EditNotification";
import { NotificationAction } from "./NotificationAction";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    width: 130,
  },
  {
    title: "Message",
    dataIndex: "message",
    maxWidth: 250,
  },
  {
    title: <div className="tw-text-white">action</div>,
    dataIndex: "action",
  },
];

const NotificationList = () => {
  const [isEditNotifiOpen, setEditNotifiStatus] = useState(false);
  const [editNotifiDetails, setEditNotifiDetails] = useState(null);

  const { data, isPending } = useQuery({
    queryKey: ["notification"],
    queryFn: fetchNotification,
    // staleTime: 5000,
  });

  const {
    mutate,
    isPending: isDeletePending,
    isError,
    error,
  } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification"],
      });
    },
  });

  function openEditNotificationModal() {
    setEditNotifiStatus(true);
  }

  function closeEditNotificationModal() {
    setEditNotifiStatus(false);
  }

  const confirmDeletion = (id) => {
    console.log(id);
    mutate({ id });
  };

  let original = [];

  if (data) {
    original = data.map((list) => {
      return {
        ...list,
        key: list._id,
        date: formatTimeOffDate(list._date),
        action: (
          <NotificationAction
            openModal={openEditNotificationModal}
            setModalDetails={setEditNotifiDetails}
            data={list}
            isPending={isDeletePending}
            delNotification={confirmDeletion}
          ></NotificationAction>
        ),
      };
    });
  }

  return (
    <div>
      {isPending ? (
        <Spin />
      ) : (
        <Table
          columns={columns}
          dataSource={original}
          pagination={{
            pageSize: 10,
          }}
          style={{ tableLayout: "fixed" }}
          scroll={{
            y: 240,
            x: true,
          }}
          className={"customTable"}
        />
      )}
      {isEditNotifiOpen && (
        <EditNotification
          closeModal={closeEditNotificationModal}
          notificationDetails={editNotifiDetails}
        />
      )}
    </div>
  );
};
export default NotificationList;
