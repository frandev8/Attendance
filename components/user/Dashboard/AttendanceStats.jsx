import { Divider, Space } from "antd";
import React from "react";
import AttendanceCard from "../Cards/AttendanceCard";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
];

function AttendanceStats() {
  return (
    <Space direction="vertical">
      <div>Attendance</div>
      <Divider />
      <div>
        <Space direction="horizontal">
          <div>
            <AttendanceCard />
          </div>
          <div>
            <AttendanceCard />
          </div>
          <div>
            <AttendanceCard />
          </div>
        </Space>
      </div>
    </Space>
  );
}

export default AttendanceStats;
