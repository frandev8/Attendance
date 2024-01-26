import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Divider, Empty } from "antd";
import { useRef, useState } from "react";
import AttendanceTrend from "../../admin/Dashboard/Deposits";
import Copyright from "../../combine/logsComponents/CopyRight";
import DashboardTimeline from "../Dashboard/DashboardTimeline";
import AttendanceList from "./AttendanceList";
import { AttendanceStats2, AttendanceStats3 } from "./AttendanceStats";
import AttendanceStats from "./AttendanceStatsHistory";
import BreakChart from "./BreakChart";
import { AttendanceCalendar, CalendarAttendanceTimeline } from "./Calender";
import styles from "./History.module.css";
import OvertimeChart from "./OvertimeChart";

function AttendanceHistory() {
  const attendanceData = useRef([]);
  const [triggerRerender, setTriggerRerender] = useState(false);

  console.log(attendanceData.current, "current");
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div className={`${styles.container} tw-h-full tw-w-full`} id="container">
        <div className={`tw-w-full tw-flex  tw-gap-3 ${styles.wrapper}`}>
          {/* block 1 */}
          <div
            className={`tw-flex tw-gap-3 ${styles.block1} tw-mt-[25px] tw-mb-[25px] tw-justify-between`}
          >
            <div
              className={`${styles.box} ${styles.item1} tw-h-inherit tw-border-2 tw-border-black`}
            >
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
                  backgroundColor: "#F4F6FA",
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
                  backgroundColor: "#F4F6FA",
                }}
                elevation={0}
              >
                <div className="tw-flex tw-items-center tw-flex-col tw-justify-between tw-h-full ">
                  <AttendanceCalendar
                    // setDateData={setDateData}
                    attendanceData={attendanceData}
                    triggerRerender={setTriggerRerender}
                  />
                  <Divider style={{ marginTop: "15px", marginBottom: "0px" }} />
                  {!attendanceData?.current.length ? (
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
            className={` tw-flex tw-gap-3 ${styles.block2} tw-mt-[25px] tw-mb-[25px] tw-justify-between`}
          >
            <div className={`${styles.box} ${styles.item4} `}>
              {" "}
              <Paper
                sx={{
                  paddingY: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 350.23,
                  backgroundColor: "#F4F6FA",
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
                  backgroundColor: "#F4F6FA",
                }}
                elevation={0}
              >
                <OvertimeChart />
              </Paper>
            </div>
          </div>
        </div>

        <div className={`${styles.box} ${styles.item6}`}>
          {" "}
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: "#F4F6FA",
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
