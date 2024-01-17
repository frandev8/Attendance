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
import RecentLeaves from "../TimeOff/RecentLeaves";
import TimeOffStats, { TimeOffStats2 } from "../TimeOff/TimeOffStats";
// import Clockin from "./Clockin";
// import MyTimeSheet from "./MyTimesheet";
import styles from "./TimeOff.module.css";
// import Today from "./Today";

function TimeOffPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div className={`${styles.container}  tw-h-full tw-w-full`} id="container">
        <div
          className={`${styles.box} ${styles.item1} tw-h-inherit tw-border-2 tw-border-black`}
        >
          <Paper
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
            className=" tw-bg-[#0000ff]"
          >
            <TimeOffStats2 />
          </Paper>
        </div>

        <div
          className={`tw-w-full tw-flex tw-gap-3 ${styles.block2} tw-mt-[25px] tw-mb-[25px] tw-justify-between`}
        >
          <div className={`${styles.box} ${styles.item4} `}>
            {" "}
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 370.23,
              }}
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
            >
              <RecentLeaves />
            </Paper>
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
            <History />
          </Paper>
        </div>
      </div>

      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default TimeOffPage;
