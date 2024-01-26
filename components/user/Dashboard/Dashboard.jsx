import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Navigate } from "react-router-dom";
import Copyright from "../../combine/logsComponents/CopyRight";
import Announcement from "../Announcement/Announcement";
import AttendanceList from "../Attendance/AttendanceList";
import DashboardTimeline from "../Attendance/AttendanceRecordsDashboard";
import AttendanceStats, {
  AttendanceStats2,
} from "../Attendance/AttendanceStats";
import AttendanceCard from "../Cards/AttendanceCard";
import RecentLeaves from "../TimeOff/RecentLeaves";
import TimeOffStats from "../TimeOff/TimeOffStats";
import MyTimeSheet from "../Timesheet/MyTimesheet";
import Clockin from "./Clockin";
import styles from "./Dashboard.module.css";
// import Today from "./Today";

function UserDashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div
        className={`${styles.container}  tw-h-full tw-w-full `}
        id="container"
      >
        <div
          className={`tw-w-full tw-h-[20%]  tw-flex tw-justify-between  ${styles.block1} `}
        >
          <div className={`${styles.box} ${styles.item1} tw-h-inherit `}>
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
              <MyTimeSheet />
            </Paper>
          </div>

          <div className={`${styles.box} ${styles.item2}`}>
            <Paper
              sx={{
                width: "100%",
                backgroundColor: "#F4F6FA",
              }}
              elevation={0}
            >
              <AttendanceStats />
            </Paper>
          </div>

          <div className={`${styles.box} ${styles.item2b}`}>
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

          <div className={`${styles.box} ${styles.item3} h-inherit`}>
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
              <TimeOffStats />
            </Paper>
          </div>
        </div>
        <div className="tw-w-full tw-flex tw-gap-3 tw-mt-[25px] tw-mb-[25px] tw-justify-between">
          <div className={`${styles.box} ${styles.item4} `}>
            {" "}
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 370.23,
                backgroundColor: "#F4F6FA",
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
                backgroundColor: "#F4F6FA",
              }}
              elevation={0}
            >
              <RecentLeaves enableMore={true} />
            </Paper>
          </div>
        </div>

        <div className={`${styles.box} ${styles.item6}`}>
          <Paper
            sx={{
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

export default UserDashboard;
