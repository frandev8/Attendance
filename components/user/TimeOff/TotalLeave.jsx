import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchTimeOffById } from "../../../utils/http";
import AttendanceCard from "../Cards/AttendanceCard";

function TotalLeave() {
  const userId = useSelector((state) => state.user.userId);

  const { data, isPending } = useQuery({
    queryKey: ["timeOff", { status: "approved" }],
    queryFn: () => fetchTimeOffById({ id: userId, approved: true }),
    // staleTime: 5000,
  });

  return (
    <AttendanceCard>
      <div className="tw-w-[35px] tw-h-[35px] tw-rounded-[8px] tw-bg-[#E6F8EB] tw-flex tw-justify-center tw-items-center">
        <BeachAccessIcon style={{ color: "#42CB65" }} />
      </div>
      <span className="">On Leave</span>
      <h3 className="tw-text-[#42CB65]">{data?.length || 0}</h3>
    </AttendanceCard>
  );
}

export default TotalLeave;
