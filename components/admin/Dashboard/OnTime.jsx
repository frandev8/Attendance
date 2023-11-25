import AddIcon from "@mui/icons-material/Add";
import MovingIcon from "@mui/icons-material/Moving";
import PeopleIcon from "@mui/icons-material/People";
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

export default function OnTime() {
  const [count, setonTimeCount] = useState(0);

  async function getTimeOutCount() {
    const attendanceId = "655c8972a805d2a502144812";
    const userId = "654acbf48626cf74c1d45549";

    const loginToken = document.cookie.match("(^|;)\\s?adminLogToken=([^;]+)");

    const response = await fetch(
      `http://localhost:3000/admin/attendance/onTime`
    );

    if (!response.ok) {
      throw json({ msg: "Couldn't fetch data" }, { status: 500 });
    }

    const results = await response.json();

    setonTimeCount(results.onTime.length);
  }

  useLayoutEffect(() => {
    getTimeOutCount();
  }, []);

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="p" variant="h4">
          {count}
        </Typography>
        <div className={styles.iconAvatar}>
          <img src="../../../src/assets/Icons/onTime.svg" alt="" />
        </div>
      </div>
      <Title>On Time</Title>
      <div className={`flex justify-between items-center`}>
        <div
          className={` p-4 w-[15px] h-[15px] rounded-[50%] bg-progress-bg flex justify-center items-center mr-2`}
        >
          <MovingIcon className={`text-progress-color`} />
        </div>
        <Typography color="text.secondary" sx={{ flex: 1, fontSize: "16px" }}>
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
