import AddIcon from "@mui/icons-material/Add";
import MovingIcon from "@mui/icons-material/Moving";
import PeopleIcon from "@mui/icons-material/People";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import styles from "./Employees.module.css";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function TimeOff() {
  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="p" variant="h4">
          42
        </Typography>
        <div className={styles.iconAvatar}>
          <img src="../../../src/assets/Icons/timeOff.svg" alt="" />
        </div>
      </div>
      <Title>Time-off</Title>
      <div className={`flex items-center`}>
        <div
          className={` p-4 w-[15px] h-[15px] rounded-[50%] bg-halt-bg flex justify-center items-center mr-2`}
        >
          <MovingIcon className={`text-halt-color`} />
        </div>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          2 new employees added
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
