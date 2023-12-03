import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Copyright from "../../combine/logsComponents/CopyRight";
import Announcement from "../Dashboard/Announcement";
import RecentLeaves from "../Dashboard/RecentLeaves";
import History from "./History";
import { NewTimeOff } from "./NewTimeOff";
import styles from "./TimeOff.module.css";
import TimeOffStats from "./TimeOffStats";

function TimeOffPage() {
  const token = document.cookie.match("(^|;)\\s?token=([^;]+)");

  const [isModalOpen, setModalStatus] = useState(false);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  function setModalOpen() {
    setModalStatus(true);
  }

  function setModalClose() {
    setModalStatus(false);
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor: "#F1F2F6" }}>
      <div className={styles.container} id="container">
        <div
          className={(styles.box, styles.item1)}
          style={{ height: "max-content" }}
        >
          <Paper
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TimeOffStats setModalOpen={setModalOpen} />
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
          </Paper>
        </div>
      </div>
      {isModalOpen && <NewTimeOff closeModal={setModalClose} />}

      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}

export default TimeOffPage;
