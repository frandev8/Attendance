import { getDurationBetweenDates } from "@/utils/date";
import { fetchClockInAttendance } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

function ClockinTimer({ clockInTimeElapse, setClockInTimer }) {
  const userId = useSelector((state) => state.user.userId);

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["attendance", { type: "timer" }],
    queryFn: () => fetchClockInAttendance({ id: userId }),
    staleTime: 5000,
  });

  if (data) {
    setClockInTimer(data[0]);
  }

  // console.log(clockInTimeElapse, elapsedTime, "boom!");

  return (
    <>
      <div className="max-[540px]:tw-text-ssm  min-[541px]:tw-text-sm min-[1090px]:tw-text-base">
        {clockInTimeElapse || "00:00:00"}
      </div>
      <div className="max-[540px]:tw-text-ssm  min-[541px]:tw-text-sm min-[1090px]:tw-text-base  ">
        {clockInTimeElapse ? "Clocked in" : ""}
      </div>
    </>
  );

  // <div>{clockInTimeElapse || elapsedTime || ""}</div>;
}

export default ClockinTimer;
