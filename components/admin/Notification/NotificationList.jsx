import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { fetchNotification } from "../../../utils/http";

const columns = [
  { field: "date", sortable: false, headerName: "Date", width: 130 },
  { field: "title", headerName: "title", sortable: false, width: 90 },

  // {
  //   field: "date",
  //   headerName: "Day",
  //   sortable: false,
  //   width: 60,
  // },
  {
    field: "message",
    headerName: "Message",
    sortable: false,
    description: "This column shows the message of the notification.",
    width: 120,
    type: "string",
  },
];

const NotificationList = () => {
  // const [data, setData] = useState([]);

  let rows = [];

  const { data, isPending } = useQuery({
    queryKey: ["notification"],
    queryFn: fetchNotification,
    // staleTime: 5000,
  });

  if (data) {
    console.log(data);
    rows = data.map((list) => {
      return { ...list, id: list._id };
    });
  }

  return (
    <div>
      {isPending && <Spin />}
      {data && (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
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
