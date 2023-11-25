import AddIcon from "@mui/icons-material/Add";
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

export default function Absent() {
  const [count, setAbsentCount] = useState(0);

  async function getAbsentCount() {
    const attendanceId = "655c8972a805d2a502144812";
    const userId = "654acbf48626cf74c1d45549";

    const loginToken = document.cookie.match("(^|;)\\s?adminLogToken=([^;]+)");

    const response = await fetch(
      `http://localhost:3000/admin/attendance/absent`
    );

    if (!response.ok) {
      throw json({ msg: "Couldn't fetch data" }, { status: 500 });
    }

    const results = await response.json();

    console.log(results);
    setAbsentCount(results.absent.length);
  }

  useLayoutEffect(() => {
    getAbsentCount();
  }, []);

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="p" variant="h4">
          {count}
        </Typography>
        <div className={styles.iconAvatar}>
          <img src="../../../src/assets/Icons/absent.svg" alt="" />
        </div>
      </div>
      <Title>Absent</Title>
      <div className={`flex  items-center`}>
        <div
          className={` p-4 w-[15px] h-[15px] rounded-[50%] bg-regress-bg flex justify-center items-center mr-2`}
        >
          <MovingIcon className={`text-regress-color rotate-180`} />
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
