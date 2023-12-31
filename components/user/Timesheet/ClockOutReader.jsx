import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";
function ClockOutReader() {
  return (
    <ul className="max-sm:text-ssm md:text-sm text-center ">
      <li className="flex items-center">
        <FiberManualRecordIcon fontSize="15px" color="#00ffff" />{" "}
        <span>clock out</span>
      </li>
      <li>time</li>
    </ul>
  );
}

export default ClockOutReader;
