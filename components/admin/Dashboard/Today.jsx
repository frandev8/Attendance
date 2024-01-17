import { formatTodayDate } from "@/utils/date";
import { Settings } from "@mui/icons-material";
import { useState } from "react";

function Today() {
  const [currentTime, setTime] = useState(null);

  const updateTime = () => {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    // Format the time string
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    setTime(timeString);
    // Update the element displaying the time
  };

  setInterval(updateTime, 1000);
  return (
    <div className="tw-flex tw-flex-col tw-justify-between tw-h-full">
      <div className="tw-flex tw-items-center">
        <img src="../../../src/assets/Icons/sunshine.svg" alt="" />
        <div>
          <p>{currentTime}</p>
          <p>Realtime Insight</p>
        </div>
      </div>
      <div>
        <span>Today:</span> <br />
        <span>{formatTodayDate()}</span>
      </div>
      <div>
        <button>
          <Settings /> Advanced configuration
        </button>
      </div>
    </div>
  );
}

export default Today;
