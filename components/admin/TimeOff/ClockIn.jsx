import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";

function ClockIn() {
  return (
    <div className="tw-flex tw-flex-col tw-items-center">
      <div className="tw-flex tw-items-center tw-mr-[2px]">
        <span>Clock in</span>{" "}
      </div>
      <div>
        {" "}
        <AccessTimeIcon />
        10:02 am{" "}
      </div>
    </div>
  );
}

export default ClockIn;
