import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import React from "react";

function ClockOut() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mr-[2px]">
        <span>Clock out</span>{" "}
      </div>
      <div>
        <HistoryToggleOffIcon />
        4:02 pm
      </div>
    </div>
  );
}

export default ClockOut;
