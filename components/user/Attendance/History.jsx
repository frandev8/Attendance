import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Divider, Empty, Spin } from "antd";
import { useRef, useState } from "react";
import { fetchAttendanceByDate } from "../../../utils/http";
import AttendanceTrend from "../../admin/Dashboard/Deposits";
import Copyright from "../../combine/logsComponents/CopyRight";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import DashboardTimeline from "../Dashboard/DashboardTimeline";
import AttendanceList from "./AttendanceList";
import { AttendanceStats2, AttendanceStats3 } from "./AttendanceStats";

import AttendanceStats from "./AttendanceStatsHistory";
import BreakChart from "./BreakChart";
import { AttendanceCalendar, CalendarAttendanceTimeline } from "./Calender";
import styles from "./History.module.css";
import OvertimeChart from "./OvertimeChart";

function AttendanceHistory() {
  const attendanceData = useRef(null);
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const userId = useSelector((state) => {
    return state.user.userId;
  });

  const {
    data,
    isPending,
    error: todayError,
    isError: isTodayError,
  } = useQuery({
    queryKey: ["attendance", { type: "today" }],
    queryFn: () => fetchAttendanceByDate({ id: userId, date: currentDate }),
    gcTime: 0,
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div className={`${styles.container} tw-h-full tw-w-full`} id="container">
        <div className={`tw-w-full tw-flex  tw-gap-3 ${styles.wrapper}`}>
          {/* block 1 */}
          <div
            className={`tw-flex tw-gap-3 ${styles.block1} tw-mt-[25px] tw-mb-[25px] tw-justify-between`}
          >
            <div className={`${styles.box} ${styles.item1} tw-h-inherit `}>
              <Paper
                sx={{
                  width: "100%",
                  backgroundColor: "#F4F6FA",
                }}
                elevation={0}
              >
                <AttendanceStats3 />
              </Paper>
            </div>
            <div className={`${styles.box} ${styles.item1b} tw-h-inherit `}>
              <Paper
                sx={{
                  width: "100%",
                  // backgroundColor: "#F4F6FA",
                }}
                elevation={0}
              >
                <AttendanceStats2 />
              </Paper>
            </div>
            <div className={(styles.box, styles.item2)}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                elevation={0}
              >
                <div className="tw-flex tw-items-center tw-flex-col tw-justify-between tw-h-full ">
                  <AttendanceCalendar
                    // setDateData={setDateData}
                    attendanceData={attendanceData}
                    triggerRerender={setTriggerRerender}
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                    todayData={data}
                  />
                  <Divider style={{ marginTop: "15px", marginBottom: "0px" }} />

                  {isPending ? (
                    <div className="tw-flex tw-justify-center tw-items-center tw-h-[70%] ">
                      {" "}
                      <Spin />
                    </div>
                  ) : !attendanceData?.current ? (
                    <div className="tw-flex tw-justify-center tw-items-center tw-h-[70%] ">
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                  ) : (
                    <CalendarAttendanceTimeline
                      attendanceData={attendanceData}
                    />
                  )}
                </div>
              </Paper>
            </div>
          </div>
          {/* block 2 */}
          <div
            className={` tw-flex tw-gap-3 ${styles.block2} tw-mt-[25px] tw-mb-[25px] tw-justify-between tw-bg-[#F4F6FA] tw-p-4 `}
          >
            <div className={`${styles.box} ${styles.item4}  `}>
              {" "}
              <Paper
                sx={{
                  paddingY: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 350.23,
                }}
                elevation={0}
              >
                <BreakChart />
              </Paper>
            </div>

            <div className={`${styles.box} ${styles.item5}`}>
              {" "}
              <Paper
                sx={{
                  paddingY: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 350.23,
                  overflow: "hidden",
                }}
                elevation={0}
              >
                <OvertimeChart />
              </Paper>
            </div>
          </div>
        </div>

        <div className={`${styles.box} ${styles.item6} tw-bg-[#F4F6FA] tw-p-4`}>
          {" "}
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
            elevation={0}
          >
            <AttendanceList />
          </Paper>
        </div>
      </div>

      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default AttendanceHistory;
