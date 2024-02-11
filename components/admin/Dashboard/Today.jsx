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
      <div className="tw-flex tw-items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="49"
          height="49"
          viewBox="0 0 49 49"
          fill="none"
        >
          <path
            d="M24.5 37.8636C20.9557 37.8636 17.5567 36.4557 15.0505 33.9495C12.5443 31.4434 11.1364 28.0443 11.1364 24.5C11.1364 20.9557 12.5443 17.5567 15.0505 15.0505C17.5567 12.5443 20.9557 11.1364 24.5 11.1364C28.0443 11.1364 31.4434 12.5443 33.9495 15.0505C36.4557 17.5567 37.8636 20.9557 37.8636 24.5C37.8636 28.0443 36.4557 31.4434 33.9495 33.9495C31.4434 36.4557 28.0443 37.8636 24.5 37.8636ZM24.5 33.4091C26.8628 33.4091 29.1289 32.4705 30.7997 30.7997C32.4705 29.1289 33.4091 26.8628 33.4091 24.5C33.4091 22.1372 32.4705 19.8711 30.7997 18.2003C29.1289 16.5295 26.8628 15.5909 24.5 15.5909C22.1372 15.5909 19.8711 16.5295 18.2003 18.2003C16.5295 19.8711 15.5909 22.1372 15.5909 24.5C15.5909 26.8628 16.5295 29.1289 18.2003 30.7997C19.8711 32.4705 22.1372 33.4091 24.5 33.4091ZM22.2727 0H26.7273V6.68182H22.2727V0ZM22.2727 42.3182H26.7273V49H22.2727V42.3182ZM5.60159 8.75095L8.75095 5.60159L13.475 10.3256L10.3256 13.475L5.60159 8.75095ZM35.525 38.6744L38.6744 35.525L43.3984 40.249L40.249 43.3984L35.525 38.6744ZM40.249 5.59936L43.3984 8.75095L38.6744 13.475L35.525 10.3256L40.249 5.60159V5.59936ZM10.3256 35.525L13.475 38.6744L8.75095 43.3984L5.60159 40.249L10.3256 35.525ZM49 22.2727V26.7273H42.3182V22.2727H49ZM6.68182 22.2727V26.7273H0V22.2727H6.68182Z"
            fill="#0043FF"
          />
        </svg>

        <div className="tw-ml-[8px]">
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
