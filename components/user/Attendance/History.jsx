import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Empty } from "antd";
import { useState } from "react";
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
  const [dateData, setDateData] = useState(null);

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
                }}
                // className=" bg-[#0000ff] border-2 border-black"
              >
                <AttendanceStats3 />
              </Paper>
            </div>
            <div
              className={`${styles.box} ${styles.item1b} tw-h-inherit tw-border-2 tw-border-black`}
            >
              <Paper
                sx={{
                  width: "100%",
                }}
                // className=" bg-[#0000ff] border-2 border-black"
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
              >
                <div className="tw-flex tw-items-center tw-flex-col tw-justify-between ">
                  <AttendanceCalendar setDateData={setDateData} />
                  {!dateData ? (
                    <Empty className="flex-grow" />
                  ) : (
                    <CalendarAttendanceTimeline />
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
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 350.23,
                }}
              >
                <BreakChart />
              </Paper>
            </div>

            <div className={`${styles.box} ${styles.item5}`}>
              {" "}
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 350.23,
                  overflow: "hidden",
                }}
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
              background: "#F4F6FA",
            }}
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
