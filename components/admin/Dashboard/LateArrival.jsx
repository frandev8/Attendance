import AddIcon from "@mui/icons-material/Add";
import MovingIcon from "@mui/icons-material/Moving";
import PeopleIcon from "@mui/icons-material/People";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import * as React from "react";
import { fetchAttendanceSummary } from "../../../utils/http";
import styles from "./Employees.module.css";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function LateArrival() {
  const { data, isPending } = useQuery({
    queryKey: ["attendance", { type: "late" }],
    queryFn: () => fetchAttendanceSummary({ late: true }),
  });

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isPending && <Spin />}
        {data && (
          <Typography component="p" variant="h4">
            {data.length}
          </Typography>
        )}
        <div className={styles.iconAvatar}>
          <img src="../../../src/assets/Icons/late.svg" alt="" />
        </div>
      </div>
      <Title>Late Arrival</Title>
      <div className={`flex  items-center`}>
        <div
          className={` p-4 w-[15px] h-[15px] rounded-[50%] bg-regress-bg flex justify-center items-center mr-2`}
        >
          <MovingIcon className={`text-regress-color rotate-180`} />
        </div>
        <Typography color="text.secondary" sx={{ flex: 1, fontSize: "16px" }}>
          +3% Increase than yesterday
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
