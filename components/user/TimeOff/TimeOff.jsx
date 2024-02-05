import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Navigate } from "react-router-dom";
import Copyright from "../../combine/logsComponents/CopyRight";
import Announcement from "../Announcement/Announcement";
import History from "./History";
// import DashboardTimeline from "../Attendance/AttendanceRecordsDashboard";
// import AttendanceCard from "../Cards/AttendanceCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import TimeOffStats, { TimeOffStats2 } from "../TimeOff/TimeOffStats";
import RecentLeaves from "./RecentLeaves";
// import Clockin from "./Clockin";
// import MyTimeSheet from "./MyTimesheet";
import styles from "./TimeOff.module.css";
// import Today from "./Today";

function TimeOffPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div
        className={`${styles.container}  tw-h-full tw-w-full`}
        id="container"
      >
        <div className={`${styles.box} ${styles.item1} tw-h-inherit`}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              backgroundColor: "#F4F6FA",
            }}
            elevation={0}
          >
            <TimeOffStats2 />
          </Paper>
        </div>

        <div
          className={`tw-w-full tw-flex tw-gap-3 ${styles.block2} tw-mt-[25px] tw-mb-[25px] tw-justify-between tw-bg-[#F4F6FA] tw-p-4`}
        >
          <div className={`${styles.box} ${styles.item4}  `}>
            {" "}
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 370.23,
              }}
              elevation={0}
            >
              <Announcement />
            </Paper>
          </div>

          <div className={`${styles.box} ${styles.item5}`}>
            {" "}
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 370.23,
                overflow: "hidden",
              }}
              elevation={0}
            >
              <RecentLeaves enableMore={false} />
            </Paper>
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
            <History />
          </Paper>
        </div>
      </div>

      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default TimeOffPage;
