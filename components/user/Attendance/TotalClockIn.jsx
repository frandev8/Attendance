import CheckIcon from "@mui/icons-material/Check";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { fetchAttendanceById } from "../../../utils/http";
import AttendanceCard from "../Cards/AttendanceCard";

function TotalClockIn() {
  const userId = useSelector((state) => state.user.userId);

  const { data, isPending } = useQuery({
    queryKey: ["attendance", { status: "approved" }],
    queryFn: () => fetchAttendanceById({ id: userId, approved: true }),
    // staleTime: 5000,
  });

  return (
    <AttendanceCard>
      <div className="tw-w-[40px] tw-h-[40px] tw-rounded-[8px] tw-bg-regress-color tw-flex tw-justify-center tw-items-center">
        <CheckIcon />
      </div>
      <span className="">Clock in</span>
      <h3>{data?.length}</h3>
    </AttendanceCard>
  );
}

export default TotalClockIn;
