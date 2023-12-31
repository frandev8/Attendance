import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { fetchNotification } from "../../../utils/http";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    width: 130,
  },
  {
    title: "Title",
    dataIndex: "title",
    width: 100,
  },
  {
    title: "Message",
    dataIndex: "message",
  },
];

const NotificationList = () => {
  // const [data, setData] = useState([]);

  const { data, isPending } = useQuery({
    queryKey: ["notification"],
    queryFn: fetchNotification,
    // staleTime: 5000,
  });

  let rows = [];

  for (let i = 0; i < 70; i++) {
    rows.push({
      key: i,
      date: "20 Jan 2023",
      message: "my message",
      title: "my title",
    });
  }

  let original = [];

  if (data) {
    console.log(data);
    original = data.map((list) => {
      return { ...list, key: list._id };
    });

    console.log(original);
  }

  return (
    <div>
      {isPending && <Spin />}
      {data && (
        <Table
          columns={columns}
          dataSource={rows}
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
