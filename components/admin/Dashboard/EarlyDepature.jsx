import MovingIcon from "@mui/icons-material/Moving";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { json } from "react-router-dom";
import styles from "./Employees.module.css";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Departure() {
  const [count, setEarlyDepartureCount] = useState(0);

  async function getEarlyDepartureCount() {
    const attendanceId = "655c8972a805d2a502144812";
    const userId = "654acbf48626cf74c1d45549";

    const loginToken = document.cookie.match("(^|;)\\s?adminLogToken=([^;]+)");

    const response = await fetch(
      `http://localhost:3000/admin/attendance/early-departure`
    );

    if (!response.ok) {
      throw json({ msg: "Couldn't fetch data" }, { status: 500 });
    }

    const results = await response.json();
    

    setEarlyDepartureCount(results.early.length);
  }

  useLayoutEffect(() => {
    getEarlyDepartureCount();
  }, []);

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="p" variant="h4">
          {count}
        </Typography>
        <div className={styles.iconAvatar}>
          <img src="../../../src/assets/Icons/early.svg" alt="" />
        </div>
      </div>
      <Title>Early Departures</Title>
      <div className={`flex items-center`}>
        <div
          className={` p-4 w-[15px] h-[15px] rounded-[50%] bg-progress-bg flex justify-center items-center mr-2`}
        >
          <MovingIcon className={`text-progress-color`} />
        </div>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          -10% Less than yesterday
        </Typography>
      </div>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
