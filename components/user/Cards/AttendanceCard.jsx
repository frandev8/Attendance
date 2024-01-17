import CheckIcon from "@mui/icons-material/Check";
import React from "react";

function AttendanceCard({ children }) {
  return (
    <div
      className="tw-flex tw-flex-col tw-items-center tw-justify-around tw-w-[110px] tw-h-[120px] tw-py-3 tw-rounded-md tw-border-[1px] tw-border-black"
      style={{ background: "white" }}
    >
      {children}
    </div>
  );
}

export default AttendanceCard;
