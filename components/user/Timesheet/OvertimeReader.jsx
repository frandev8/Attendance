import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";
function OvertimeReader() {
  return (
    <ul className="tw-sm:text-ssm tw-md:text-sm tw-text-center">
      <li className="tw-flex tw-items-center">
        <FiberManualRecordIcon
          fontSize="small"
          color="#00ff00"
          className="tw-border-2 tw-border-black"
        />{" "}
        <span>clock in</span>
      </li>
      <li>time</li>
    </ul>
  );
}

export default OvertimeReader;
