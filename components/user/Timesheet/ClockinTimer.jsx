import { getDurationBetweenDates } from "@/utils/date";
import { fetchAttendanceByDate } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

function ClockinTimer({ clockInTimeElapse }) {
  const userId = useSelector((state) => state.user.userId);

  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalIdRef = useRef(null);

  const updateTime = (clockInTime) => {
    const now = new Date();

    const timeString = getDurationBetweenDates(clockInTime, now);

    setElapsedTime(timeString);
    // Update the element displaying the time
  };

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["attendance", { type: "timer" }],
    queryFn: () => fetchAttendanceByDate({ id: userId }),
  });

  if (data) {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current); // Clear existing timer if any
    }

    // Start timer from elapsed time
    // intervalIdRef.current = setInterval(() => {
    //   console.log("timer started");
    //   updateTime(data[0].clockInTime);
    // }, 1000);
  }

  // console.log(clockInTimeElapse, elapsedTime, "boom!");

  return (
    <>
      <div className="max-sm:tw-text-ssm md:tw-text-sm">
        {clockInTimeElapse || elapsedTime || "00:00:00"}
      </div>
      <div className="max-sm:tw-text-ssm  md:tw-text-sm tw-lg:text-base ">
        {clockInTimeElapse || elapsedTime ? "Clocked in" : ""}
      </div>
    </>
  );

  // <div>{clockInTimeElapse || elapsedTime || ""}</div>;
}

export default ClockinTimer;
