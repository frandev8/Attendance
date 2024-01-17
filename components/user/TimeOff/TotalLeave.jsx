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
      <div className="tw-w-[40px] tw-h-[40px] tw-rounded-[8px] tw-bg-regress-color tw-flex tw-justify-center tw-items-center">
        <BeachAccessIcon />
      </div>
      <span className="">On Leave</span>
      <h3>{data?.length}</h3>
    </AttendanceCard>
  );
}

export default TotalLeave;
