import { Divider, Space } from "antd";
import React from "react";

import TotalLeave from "../TimeOff/TotalLeave";
import TotalClockIn from "./TotalClockIn";
import TotalClockOut from "./TotalClockOut";
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
    <Space direction="vertical" className=" w-full border-2 border-black ">
      <div>Attendance</div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div>
        <div>
          <div className="flex  justify-around mb-[8px]">
            <TotalClockIn />

            <TotalClockOut />
          </div>

          <div className="flex justify-around ">
            <TotalLeave />

            <TotalLeave />
          </div>
        </div>
      </div>
    </Space>
  );
}

export function AttendanceStats2() {
  return (
    <Space direction="vertical" className=" w-full border-2 border-black ">
      <div>Attendance</div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div className="flex justify-around">
        <TotalClockIn />

        <TotalClockOut />

        <TotalLeave />

        <TotalLeave />
      </div>
    </Space>
  );
}

export default AttendanceStats;
