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
    <Space direction="vertical" className=" tw-w-full tw-mb-[15px] ">
      <div>Attendance</div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div>
        <div>
          <div className="tw-flex  tw-justify-around tw-mb-[8px]">
            <TotalClockIn />

            <TotalClockOut />
          </div>

          <div className="tw-flex tw-justify-around ">
            <TotalLeave />

            <TotalUncheckIn />
          </div>
        </div>
      </div>
    </Space>
  );
}

export function AttendanceStats3() {
  return (
    <Space direction="vertical" className=" tw-w-full tw-mb-[15px] ">
      <div>Attendance</div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div>
        <div className="tw-flex tw-flex-col">
          <div className="tw-flex  tw-justify-around tw-mb-[8px]">
            <TotalClockIn />

            <TotalClockOut />
          </div>

          <div className="tw-flex tw-justify-around ">
            <TotalLeave />

            <TotalUncheckIn />
          </div>
        </div>
      </div>
    </Space>
  );
}
export function AttendanceStats2() {
  return (
    <Space direction="vertical" className=" tw-w-full tw-mb-[15px] ">
      <div>Attendance</div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div className="tw-flex tw-justify-around">
        <TotalClockIn />

        <TotalClockOut />

        <TotalLeave />

        <TotalUncheckIn />
      </div>
    </Space>
  );
}

export default AttendanceStats;
