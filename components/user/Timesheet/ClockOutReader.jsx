import { getClockOutTime } from "@/utils/auth";
import { formatTime } from "@/utils/date";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";

function ClockOutReader() {
  const clockOutTime = getClockOutTime();

  return (
    <ul className="tw-max-sm:text-ssm tw-md:text-sm tw-text-center ">
      <li className="tw-flex tw-items-center">
        <FiberManualRecordIcon fontSize="15px" style={{ color: "#FB923C" }} />{" "}
        <span className="max-[540px]:tw-text-ssm  min-[541px]:tw-text-sm min-[1090px]:tw-text-[15px]">
          clock out
        </span>
      </li>
      <li className="tw-text-[11px]">
        {clockOutTime ? formatTime(clockOutTime) : "--:--:PM"}
      </li>
    </ul>
  );
}

export default ClockOutReader;
