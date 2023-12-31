import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Navigate } from "react-router-dom";
import Copyright from "../../combine/logsComponents/CopyRight";
import Announcement from "../Announcement/Announcement";
import DashboardTimeline from "../Attendance/AttendanceRecordsDashboard";
import AttendanceStats, {
  AttendanceStats2,
} from "../Attendance/AttendanceStats";
import AttendanceCard from "../Cards/AttendanceCard";
import RecentLeaves from "../TimeOff/RecentLeaves";
import TimeOffStats from "../TimeOff/TimeOffStats";
import Clockin from "./Clockin";
import styles from "./Dashboard.module.css";
import MyTimeSheet from "./MyTimesheet";
// import Today from "./Today";

function UserDashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div className={`${styles.container}  h-full w-full`} id="container">
        <div
          className={`w-full h-[20%]  flex justify-between  ${styles.block1} `}
        >
          <div
            className={`${styles.box} ${styles.item1} h-inherit border-2 border-black`}
          >
            <Paper
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
              className=" bg-[#0000ff]"
            >
              <MyTimeSheet />
            </Paper>
          </div>

          <div className={`${styles.box} ${styles.item2}`}>
            <Paper
              sx={{
                width: "100%",
              }}
            >
              <AttendanceStats />
            </Paper>
          </div>

          <div className={`${styles.box} ${styles.item2b}`}>
            <Paper
              sx={{
                width: "100%",
              }}
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
              }}
            >
              <TimeOffStats />
            </Paper>
          </div>
        </div>
        <div className="w-full flex gap-3 mt-[25px] mb-[25px] justify-between">
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
            <DashboardTimeline />
          </Paper>
        </div>
      </div>

      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default UserDashboard;
