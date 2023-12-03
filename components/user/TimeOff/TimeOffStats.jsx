import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Button } from "antd";
import React from "react";
import TimeOffCard from "../Cards/TimeOffCard";

function TimeOffStats({ setModalOpen }) {
  function requestTimeOffHandler() {
    setModalOpen();
  }

  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={requestTimeOffHandler}
          danger
          icon={<HourglassTopIcon />}
        >
          Request Time Off
        </Button>
      </div>
      <div className="flex">
        <TimeOffCard typeOfLeave={"Casual"} />
        <TimeOffCard typeOfLeave={"Sick"} />
        <TimeOffCard typeOfLeave={"Earned"} />
        <TimeOffCard typeOfLeave={"Adjustment"} />
      </div>
    </div>
  );
}

export default TimeOffStats;
