import CheckIcon from "@mui/icons-material/Check";
import React from "react";

function AttendanceCard({ children }) {
  return (
    <div
      className="flex flex-col items-center justify-around w-[110px] h-[120px] py-3 rounded-md border-[1px] border-black"
      style={{ background: "white" }}
    >
      {children}
    </div>
  );
}

export default AttendanceCard;
