import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import React from "react";

function ClockOut() {
  return (
    <div className="tw-flex tw-flex-col tw-items-center">
      <div className="tw-flex tw-items-center tw-mr-[2px]">
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
