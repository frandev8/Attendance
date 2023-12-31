import { Container, Divider, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { Table } from "antd";
import React from "react";
import "./AttendanceRecordsDashboard.css";
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

{
  /* <div>Employee List</div>
          <Divider style={{ marginTop: "5px", marginBottom: "5px" }} /> */
}

const AttendanceList = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <div>Attendance Records</div>
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
export default AttendanceList;
