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
import RecentLeaves from "../TimeOff/RecentLeaves";
import TimeOffStats, { TimeOffStats2 } from "../TimeOff/TimeOffStats";
// import Clockin from "./Clockin";
// import MyTimeSheet from "./MyTimesheet";
import styles from "./TimeOff.module.css";
// import Today from "./Today";

function TimeOffPage() {
  const [isModalOpen, setModalStatus] = useState(false);

  function setModalOpen() {
    setModalStatus(true);
  }

  function setModalClose() {
    setModalStatus(false);
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div className={`${styles.container}  h-full w-full`} id="container">
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
            <TimeOffStats2 setModalOpen={setModalOpen} />
          </Paper>
        </div>

        <div
          className={`w-full flex gap-3 ${styles.block2} mt-[25px] mb-[25px] justify-between`}
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

// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import { useState } from "react";
// import { Navigate } from "react-router-dom";
// import Copyright from "../../combine/logsComponents/CopyRight";
// import Announcement from "../Announcement/Announcement";
// import History from "./History";
// import { NewTimeOff } from "./NewTimeOff";
// import RecentLeaves from "./RecentLeaves";
// function TimeOffPage() {
//   const [isModalOpen, setModalStatus] = useState(false);

//   function setModalOpen() {
//     setModalStatus(true);
//   }

//   function setModalClose() {
//     setModalStatus(false);
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor: "#F1F2F6" }}>
//       <div className={styles.container} id="container">
//         <div className="w-[100%] border-2 border-black">
//           {" "}
//           <div
//             className={(styles.box, styles.item1)}
//             style={{
//               height: "max-content",
//               width: "100%",
//             }}
//           >
//             <Paper
//               sx={{
//                 p: 1,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 width: "100%",
//               }}
//             >
//               <TimeOffStats2 setModalOpen={setModalOpen} />
//             </Paper>
//           </div>
//         </div>
//         <div
//           className={`w-full flex ${styles["box2"]}  mt-[25px] mb-[25px] justify-between`}
//         >
//           <div className={(styles.box, styles.item2)}>
//             <Paper
//               sx={{
//                 p: 2,
//                 display: "flex",
//                 flexDirection: "column",
//                 height: 370.23,
//               }}
//             >
//               <Announcement />
//             </Paper>
//           </div>
//           <div className={(styles.box, styles.item3)}>
//             <Paper
//               sx={{
//                 p: 2,
//                 display: "flex",
//                 flexDirection: "column",
//                 height: 370.23,
//               }}
//             >
//               <RecentLeaves />
//             </Paper>{" "}
//           </div>
//         </div>
//         <div>
//           <div className={(styles.box, styles.item4)}>
//             <Paper
//               sx={{
//                 p: 2,
//                 display: "flex",
//                 flexDirection: "column",
//                 // height: "100%",
//               }}
//             >
//               <History />
//             </Paper>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && <NewTimeOff closeModal={setModalClose} />}

//       <Copyright sx={{ pt: 4 }} />
//     </Container>
//   );
// }

// export default TimeOffPage;
