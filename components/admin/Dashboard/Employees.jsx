import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import styles from "./Employees.module.css";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Employees() {
  const [count, setAbsentCount] = useState(0);

  async function getAbsentCount() {
    const attendanceId = "655c8972a805d2a502144812";
    const userId = "654acbf48626cf74c1d45549";

    const loginToken = document.cookie.match("(^|;)\\s?adminLogToken=([^;]+)");

    const response = await fetch(
      `http://localhost:3000/admin/employee/activated`
    );

    if (!response.ok) {
      throw json({ msg: "Couldn't fetch data" }, { status: 500 });
    }

    const results = await response.json();

    setAbsentCount(results.employees.length);
  }

  useEffect(() => {
    getAbsentCount();
  }, []);

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="p" variant="h4">
          {count}
        </Typography>
        <div className={styles.iconAvatar}>
          <img src="../../../src/assets/Icons/employee.svg" alt="" />
        </div>
      </div>
      <Title>Total Employee</Title>
      <div className={`flex  items-center`}>
        <div
          className={` p-4 w-[15px] h-[15px] rounded-[50%] bg-progress-bg flex justify-center items-center mr-2`}
        >
          <AddIcon className={`text-progress-color`} />
        </div>
        <Typography color="text.secondary">2 new employees added</Typography>
      </div>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
