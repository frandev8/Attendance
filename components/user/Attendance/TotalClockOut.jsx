import LogoutIcon from "@mui/icons-material/Logout";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchClockOutAttendance } from "../../../utils/http";
import AttendanceCard from "../Cards/AttendanceCard";
function TotalClockOut() {
  const userId = useSelector((state) => state.user.userId);

  const { data, isPending } = useQuery({
    queryKey: ["attendance", { key: "clock-out" }],
    queryFn: () => fetchClockOutAttendance({ id: userId }),
    // staleTime: 5000,
  });

  return (
    <AttendanceCard>
      <div className="tw-w-[40px] tw-h-[40px] tw-rounded-[8px] tw-bg-regress-color tw-flex tw-justify-center tw-items-center">
        <LogoutIcon />
      </div>
      <span className="">Clock out</span>
      <h3>{data?.length}</h3>
    </AttendanceCard>
  );
}

export default TotalClockOut;
