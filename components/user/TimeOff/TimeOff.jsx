import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Copyright from "../../combine/logsComponents/CopyRight";
// import Absent from "./Absent";
// import Chart from "./Chart";
import styles from "./TimeOff.module.css";
// import Deposits from "./Deposits";
// import Departure from "./EarlyDepature";
// import Employees from "./Employees";
// import LateArrival from "./LateArrival";
// import OnTime from "./OnTime";
// import TimeOff from "./TimeOff";
import { Navigate } from "react-router-dom";
// import AttendanceCard from "../Cards/AttendanceCard";
// import Announcement from "./Announcement";
// import AttendanceStats from "./AttendanceStats";
// import Clockin from "./Clockin";
// import DashboardTimeline from "./DashboardTimeline";
// import MyTimeSheet from "./MyTimesheet";
import RecentLeaves from "../Dashboard/RecentLeaves";
// import TimeOffStats from "./TimeOffStats";
import Announcement from "../Dashboard/Announcement";
import TimeOffStats from "../Dashboard/TimeOffStats";
import History from "./History";
// import Today from "./Today";

function TimeOffPage() {
  const token = document.cookie.match("(^|;)\\s?token=([^;]+)");
  console.log(token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor: "#F1F2F6" }}>
      <div className={styles.container} id="container">
        <div className={(styles.box, styles.item1)}>
          <Paper
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <TimeOffStats />
            {/* <MyTimeSheet /> */}
          </Paper>
        </div>
        <div className={(styles.box, styles.item2)}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: "100%",
            }}
          >
            <Announcement />
          </Paper>
        </div>
        <div className={(styles.box, styles.item3)}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: "100%",
            }}
          >
            <RecentLeaves />
          </Paper>{" "}
        </div>
        <div className={(styles.box, styles.item4)}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: "100%",
            }}
          >
            <History />
            {/* total clock in */}
            {/* <AttendanceStats /> */}
          </Paper>
        </div>
      </div>

      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default TimeOffPage;
