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
    <Space
      direction="vertical"
      className=" tw-w-full tw-mb-[15px] tw-bg-white tw-p-3  "
    >
      <div>Attendance</div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div>
        <div>
          <div className="tw-flex  tw-justify-between tw-mb-[8px]">
            <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
              <TotalClockIn />
            </div>
            <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
              <TotalClockOut />
            </div>
          </div>

          <div className="tw-flex tw-justify-between ">
            <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
              <TotalLeave />
            </div>
            <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
              <TotalUncheckIn />
            </div>
          </div>
        </div>
      </div>
    </Space>
  );
}

export function AttendanceStats3() {
  return (
    <Space
      direction="vertical"
      className=" tw-w-full tw-mb-[15px]  tw-bg-white "
    >
      <div>Attendance</div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div>
        <div className="tw-flex tw-flex-col">
          <div className="tw-flex  tw-justify-between tw-mb-[8px]">
            <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
              <TotalClockIn />
            </div>
            <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
              <TotalClockOut />
            </div>
          </div>

          <div className="tw-flex tw-justify-between ">
            <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
              <TotalLeave />
            </div>
            <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
              <TotalUncheckIn />
            </div>
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
        <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
          <TotalClockIn />
        </div>
        <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
          <TotalClockOut />
        </div>
        <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
          <TotalLeave />
        </div>
        <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100  tw-rounded-md">
          <TotalUncheckIn />
        </div>
      </div>
    </Space>
  );
}

export default AttendanceStats;
