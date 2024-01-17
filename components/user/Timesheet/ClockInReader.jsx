import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";
function ClockInReader() {
  return (
    <ul className="tw-max-sm:text-ssm tw-md:text-sm tw-text-center">
      <li className="tw-flex tw-items-center">
        <FiberManualRecordIcon fontSize="15px" color="#ff00ff" />{" "}
        <span>clock in</span>
      </li>
      <li>--:--:AM</li>
    </ul>
  );
}

export default ClockInReader;
