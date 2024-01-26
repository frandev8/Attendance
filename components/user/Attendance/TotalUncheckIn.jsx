import Warning from "@mui/icons-material/Warning";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchAttendanceById } from "../../../utils/http";
import AttendanceCard from "../Cards/AttendanceCard";

function TotalUncheckIn() {
  const userId = useSelector((state) => state.user.userId);

  const { data, isPending } = useQuery({
    queryKey: ["attendance", { status: "rejected" }],
    queryFn: () => fetchAttendanceById({ id: userId, rejected: true }),
    // staleTime: 5000,
  });

  return (
    <AttendanceCard>
      <div className="tw-w-[35px] tw-h-[35px] tw-rounded-[8px] tw-bg-[#FFE1E0] tw-flex tw-justify-center tw-items-center">
        <Warning style={{ color: "#FF6867" }}/>
      </div>
      <span>Not Check in</span>
      <h3 className="tw-text-[#FF6867]">{data?.length || 0}</h3>
    </AttendanceCard>
  );
}

export default TotalUncheckIn;
