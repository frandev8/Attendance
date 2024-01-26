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
      <div className="tw-w-[35px] tw-h-[35px] tw-rounded-[8px] tw-bg-[#DBE9F9] tw-flex tw-justify-center tw-items-center">
        <CheckIcon style={{ color: "#5295E3" }} />
      </div>
      <span>Clock in</span>
      <h3 className="tw-text-[#5295E3]">{data?.length || 0}</h3>
    </AttendanceCard>
  );
}

export default TotalClockIn;
