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
      <div className="tw-w-[35px] tw-h-[35px] tw-rounded-[8px] tw-bg-[#FFF5E0] tw-flex tw-justify-center tw-items-center ">
        <LogoutIcon style={{ color: "#FFB62E" }}  />
      </div>
      <span className="">Clock out</span>
      <h3 className="tw-text-[#FFB62E]">{data?.length || 0}</h3>
    </AttendanceCard>
  );
}

export default TotalClockOut;
