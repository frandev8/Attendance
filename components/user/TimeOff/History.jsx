// const columns = [
//   {
//     title: "Duration",
//     dataIndex: "date",
//     width: 130,
//   },
//   {
//     title: "Type",
//     dataIndex: "type",
//     width: 100,
//   },
//   {
//     title: "Days",
//     dataIndex: "days",
//     width: 100,
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//   },
//   {
//     title: "action",
//     dataIndex: "action",
//   },
//   {
//     title: "more",
//     dataIndex: "more",
//   },
// ];
// if (myData) {
//   myData.forEach((timeOff) => {
//     data.push({
//       key: timeOff._id,
//       date: "my date",
//       type: timeOff.type,
//       days: "my days",
//       status: timeOff.status,
//       action: <></>,
//       more: <>see more</>,
//     });
//   });
// }
import { Container, Divider, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { fetchTimeOffById } from "../../../utils/http";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    width: 130,
  },
  {
    title: "Clock in",
    dataIndex: "clock-in",
    width: 100,
  },
  {
    title: "Clock out",
    dataIndex: "clock-out",
    width: 100,
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

{
  /* <div>Employee List</div>
            <Divider style={{ marginTop: "5px", marginBottom: "5px" }} /> */
}

const History = () => {
  const userId = useSelector((state) => state.user.userId);

  const { data: myData, isPending } = useQuery({
    queryKey: ["leave", { type: "request" }],
    queryFn: () => fetchTimeOffById({ id: userId }),
  });

  const data = [];

  for (let i = 0; i < 70; i++) {
    data.push({
      key: i,
      date: `20 Jan 2023 `,
      "clock-in": "8:30 am",
      "clock-out": "4:30 pm",
      status: `approved`,
    });
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div>Leave Records</div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <Box sx={{ width: "100%" }}>
        <Table
          columns={columns}
          dataSource={data}
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
      </Box>
    </Container>
  );
};
export default History;
