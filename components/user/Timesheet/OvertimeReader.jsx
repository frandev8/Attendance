import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";
function OvertimeReader() {
  return (
    <ul className="sm:text-ssm md:text-sm text-center">
      <li className="flex items-center">
        <FiberManualRecordIcon
          fontSize="small"
          color="#00ff00"
          className="border-2 border-black"
        />{" "}
        <span>clock in</span>
      </li>
      <li>time</li>
    </ul>
  );
}

export default OvertimeReader;
