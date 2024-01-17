import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";
function ClockOutReader() {
  return (
    <ul className="tw-max-sm:text-ssm tw-md:text-sm tw-text-center ">
      <li className="tw-flex tw-items-center">
        <FiberManualRecordIcon fontSize="15px" style={{ color: "#FB923C" }} />{" "}
        <span>clock out</span>
      </li>
      <li>--:--:PM</li>
    </ul>
  );
}

export default ClockOutReader;
