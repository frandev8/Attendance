import { Table } from "antd";
import React from "react";
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
const DashboardTimeline = () => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={{
      pageSize: 10,
    }}
    scroll={{
      y: 240,
    }}
  />
);
export default DashboardTimeline;
