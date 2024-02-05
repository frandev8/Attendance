import { useQuery } from "@tanstack/react-query";
import { Divider } from "antd";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toDayOvertimeHourPair } from "../../../utils/date";
import { fetchOvertimeAttendance } from "../../../utils/http";

export default function OvertimeChart() {
  const userId = useSelector((state) => state.user.userId);

  const { data: myData, isPending } = useQuery({
    queryKey: ["attendance", { type: "overtime" }],
    queryFn: () =>
      fetchOvertimeAttendance({
        id: userId,
        currentDate: new Date(),
      }),
    // staleTime: 5000,
  });

  let data = [
    {
      name: "Mon",
      hours: 0,
    },
    {
      name: "Tue",
      hours: 0,
    },
    {
      name: "Wed",
      hours: 0,
    },
    {
      name: "Thu",
      hours: 0,
    },
    {
      name: "Fri",
      hours: 0,
    },
    {
      name: "Sat",
      hours: 0,
    },
  ];

  if (myData) {
    data = toDayOvertimeHourPair(myData);
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <div className="tw-flex tw-flex-col">
        <span>Weekly Overtime Chart</span>

        <Divider className="tw-my-[8px]" />

        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 3]} />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="hours"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>
    </ResponsiveContainer>
  );
}
