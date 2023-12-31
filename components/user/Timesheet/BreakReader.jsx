import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";
function BreakReader() {
  return (
    <ul className="max-sm:text-ssm md:text-sm text-center">
      <li className="flex items-center">
        <FiberManualRecordIcon
          fontSize="15px"
          color="#ffff00"
          
        />{" "}
        <span>break</span>
      </li>
      <li>time</li>
    </ul>
  );
}

export default BreakReader;
