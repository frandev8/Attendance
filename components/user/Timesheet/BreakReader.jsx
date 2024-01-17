import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";
function BreakReader() {
  return (
    <ul className="tw-max-sm:text-ssm tw-md:text-sm tw-text-center">
      <li className="tw-flex tw-items-center">
        <FiberManualRecordIcon fontSize="15px" style={{ color: "#94A2B8" }} />{" "}
        <span>break</span>
      </li>
      <li>--:--:PM</li>
    </ul>
  );
}

export default BreakReader;
