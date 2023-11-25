import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Copyright from "../../combine/logsComponents/CopyRight";
import AttendanceList from "./AttendanceList";
import styles from "./History.module.css";

// import Clockin from "./Clockin";
// import MyTimeSheet from "./MyTimesheet";

import DashboardTimeline from "../Dashboard/DashboardTimeline";
// import Today from "./Today";

function AttendanceHistory() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor: "#F1F2F6" }}>
      <div className={styles.container} id="container">
        <div className={(styles.box, styles.item1)}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            Stats, check in, check out, ...
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
            overtime
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
            On timeline
          </Paper>
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
            <AttendanceList />
          </Paper>{" "}
        </div>
      </div>

      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default AttendanceHistory;
