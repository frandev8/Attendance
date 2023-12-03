import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";

function ClockIn() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mr-[2px]">
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
