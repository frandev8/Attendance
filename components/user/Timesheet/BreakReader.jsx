import { getBreakTime } from "@/utils/auth";
import { formatTime } from "@/utils/date";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";

function BreakReader() {
  const breakTime = getBreakTime();
  return (
    <ul className="tw-max-sm:text-ssm tw-md:text-sm tw-text-center">
      <li className="tw-flex tw-items-center">
        <FiberManualRecordIcon fontSize="15px" style={{ color: "#94A2B8" }} />{" "}
        <span className="max-[540px]:tw-text-ssm  min-[541px]:tw-text-sm min-[1090px]:tw-text-[15px]">
          break
        </span>
      </li>
      <li className="tw-text-[11px]">
        {breakTime ? formatTime(breakTime) : "--:--:PM"}
      </li>
    </ul>
  );
}

export default BreakReader;
