import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Navigate } from "react-router-dom";
import Copyright from "../../combine/logsComponents/CopyRight";
import Absent from "./Absent";
import Chart from "./Chart2";
import styles from "./Dashboard.module.css";
import Deposits from "./Deposits";
import Departure from "./EarlyDepature";
import Employees from "./Employees";
import LateArrival from "./LateArrival";
import OnTime from "./OnTime";
import TimeOff from "./TimeOff";
import Today from "./Today";

function Dashboard() {
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
            <Today />
            {/* <Chart /> */}
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
            <Employees />
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
            <OnTime />
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
            <Absent />
          </Paper>
        </div>
        <div className={(styles.box, styles.item5)}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: "100%",
            }}
          >
            <LateArrival />
          </Paper>
        </div>
        <div className={(styles.box, styles.item6)}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: "100%",
            }}
          >
            <Departure />
          </Paper>
        </div>
        <div className={(styles.box, styles.item7)}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // height: "100%",
            }}
          >
            <TimeOff />
          </Paper>
        </div>
        <div className={(styles.box, styles.item8)}>
          {" "}
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 270.23,
            }}
          >
            <Chart />
          </Paper>
        </div>
        <div className={(styles.box, styles.item9)}>
          {" "}
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Deposits />
          </Paper>
        </div>
      </div>

      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default Dashboard;
