import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";
function ClockInReader() {
  return (
    <ul className="max-sm:text-ssm md:text-sm text-center">
      <li className="flex items-center">
        <FiberManualRecordIcon
          fontSize="15px"
          color="#ff00ff"
        
        />{" "}
        <span>clock in</span>
      </li>
      <li>time</li>
    </ul>
  );
}

export default ClockInReader;
