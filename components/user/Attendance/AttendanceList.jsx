import { Container, Divider, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import {
  calculateTimeBetween,
  formatAttendanceDates,
  formatAttendanceTime,
} from "../../../utils/date";
import { fetchAttendanceById } from "../../../utils/http";
import "./AttendanceRecordsDashboard.css";
const columns = [
  {
    title: "Date",
    dataIndex: "date",
    width: 130,
  },
  {
    title: "Clock in",
    dataIndex: "clock-in",
    width: 100,
  },
  {
    title: "Clock out",
    dataIndex: "clock-out",
    width: 100,
  },
  {
    title: "Break",
    dataIndex: "break",
    width: 100,
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const AttendanceList = () => {
  const userId = useSelector((state) => state.user.userId);

  const { data: myData, isPending } = useQuery({
    queryKey: ["attendance", { type: "employee" }],
    queryFn: () => fetchAttendanceById({ id: userId, approved: true }),
  });

  const data = [];

  if (myData) {
    myData.forEach((attendance) => {
      // data.push({
      //   key: attendance._id,
      //   date: formatAttendanceDates(attendance.clockInTime),
      //   "clock-in": formatAttendanceTime(attendance.clockInTime),
      //   "clock-out": formatAttendanceTime(attendance.clockInTime),
      //   break: calculateTimeBetween(
      //     attendance.breakStartTime,
      //     attendance.breakEndTime
      //   ),
      //   // overtime: calculateTimeBetween(
      //   //   attendance.overtimeStartTime,
      //   //   attendance.overtimeEndTime
      //   // ),
      //   status:
      //     attendance.status === "confirmed" ? "approved" : attendance.status,
      // });
    });
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div>Attendance Records</div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <Box sx={{ width: "100%" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
          }}
          style={{ tableLayout: "fixed" }}
          scroll={{
            y: 240,
            x: true,
          }}
          className={"customTable"}
        />
      </Box>
    </Container>
  );
};
export default AttendanceList;
