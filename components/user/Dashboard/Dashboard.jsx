import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Copyright from "../../combine/logsComponents/CopyRight";
import "./Dashboard.css";
import { Navigate } from "react-router-dom";
import AttendanceCard from "../Cards/AttendanceCard";
import TimeOffStats from "../TimeOff/TimeOffStats";
import Announcement from "./Announcement";
import AttendanceStats from "./AttendanceStats";
import Clockin from "./Clockin";
import DashboardTimeline from "./DashboardTimeline";
import MyTimeSheet from "./MyTimesheet";
import RecentLeaves from "./RecentLeaves";
// import Today from "./Today";

function UserDashboard() {
  const token = document.cookie.match("(^|;)\\s?token=([^;]+)");
  console.log(token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor: "#F1F2F6" }}>
      <div className="container" id="container">
        <div className="box item1">
          <Paper
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <MyTimeSheet />
          </Paper>
        </div>
        <div className="box item2">
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: "100%",
            }}
          >
            My request
            {/* <Employees /> */}
          </Paper>
        </div>
        <div className="box item3">
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: "100%",
            }}
          >
            My timeline
            {/* <OnTime /> */}
          </Paper>{" "}
        </div>
        <div className="box item4">
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: "100%",
            }}
          >
            {/* total clock in */}
            <AttendanceStats />
          </Paper>
        </div>
        <div className="box item5">
          <Paper
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              // height: "100%",
            }}
          >
            {/* total clock out  */}
            <AttendanceCard />
          </Paper>
        </div>
        <div className="box item6">
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: "100%",
            }}
          >
            <DashboardTimeline />
            {/* <Departure /> */}
          </Paper>
        </div>
        <div className="box item7">
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // height: "100%",
            }}
          >
            holiday
            {/* <TimeOff /> */}
          </Paper>
        </div>
        <div className="box item8">
          {" "}
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 270.23,
            }}
          >
            <Announcement />
          </Paper>
        </div>
        <div className="box item9">
          {" "}
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            Celebrations
            {/* <Deposits /> */}
          </Paper>
        </div>
        <div className="box item10">
          {" "}
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <RecentLeaves />
          </Paper>
        </div>
        <div className="box item11">
          {" "}
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

      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default UserDashboard;
