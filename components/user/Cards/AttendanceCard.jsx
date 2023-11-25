import CheckIcon from "@mui/icons-material/Check";
import React from "react";

function AttendanceCard() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[40px] h-[40px] rounded-[8px] bg-regress-color flex justify-center items-center">
        <CheckIcon />
      </div>
      Checked In
      <h3>4500</h3>
    </div>
  );
}

export default AttendanceCard;
