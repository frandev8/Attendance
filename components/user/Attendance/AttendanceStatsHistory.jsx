import { Divider, Space } from "antd";
import React from "react";

import TotalLeave from "../TimeOff/TotalLeave";
import TotalClockIn from "./TotalClockIn";
import TotalClockOut from "./TotalClockOut";
import TotalUncheckIn from "./TotalUncheckIn";
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
    <Space direction="vertical" className="tw-bg-[#F4F6FA]">
      <div>Attendance</div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div>
        <Space direction="horizontal" className="tw-flex tw-justify-between  ">
          <div>
            <TotalClockIn />
          </div>
          <div>
            <TotalClockOut />
          </div>
          <div>
            <TotalUncheckIn />
          </div>
          <div>
            <TotalLeave />
          </div>
        </Space>
      </div>
    </Space>
  );
}

export default AttendanceStats;
