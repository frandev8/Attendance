import { getClockInTime } from "@/utils/auth";
import { formatTime } from "@/utils/date";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";

function ClockInReader() {
  const clockInTime = getClockInTime();

  return (
    <ul className="tw-max-sm:text-ssm tw-md:text-sm tw-text-center">
      <li className="tw-flex tw-items-center">
        <FiberManualRecordIcon fontSize="15px" color="#5295E3" />{" "}
        <span className="max-[540px]:tw-text-ssm  min-[541px]:tw-text-sm min-[1090px]:tw-text-[15px]">
          clock in
        </span>
      </li>
      <li className="tw-text-[11px]">
        {clockInTime ? formatTime(clockInTime) : "--:--:AM"}
      </li>
    </ul>
  );
}

export default ClockInReader;
