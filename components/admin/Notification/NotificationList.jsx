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
    title: ".",
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

  const { isPending: isDeletePending, mutate: delNotification } = useMutation({
    queryFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });

  function openEditNotificationModal() {
    setEditNotifiStatus(true);
  }

  function closeEditNotificationModal() {
    setEditNotifiStatus(false);
  }

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
            deleteNotification={delNotification}
          ></NotificationAction>
        ),
      };
    });
  }

  return (
    <div>
      {isPending && <Spin />}
      {data && (
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

// useEffect(() => {
//   async function fetchData() {
//     const userId = "654acbf48626cf74c1d45549";

//     const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

//     const response = await fetch(
//       `${serverURL}/employee/attendance/${userId}`
//     );

//     if (!response.ok) {
//       return;
//     }

//     const attendance = await response.json();

//     setData(() => {
//       const newData = [];

//       for (let i = 0; i <= attendance.length; i++) {
//         newData.push({
//           key: i,
//           name: `Edward King ${i}`,
//           age: 32,
//           address: `London, Park Lane no. ${i}`,
//         });
//       }

//       return newData;
//     });
//   }

//   fetchData();
// }, []);
