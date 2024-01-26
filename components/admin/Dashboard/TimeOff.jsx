import AddIcon from "@mui/icons-material/Add";
import MovingIcon from "@mui/icons-material/Moving";
import PeopleIcon from "@mui/icons-material/People";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import * as React from "react";
import { fetchTimeOff } from "../../../utils/http";
import styles from "./Employees.module.css";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function TimeOff() {
  const { data, isPending } = useQuery({
    queryKey: ["timeOff", { type: "approved" }],
    queryFn: () => fetchTimeOff({ approved: true }),
  });

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isPending ? (
          <Spin />
        ) : data ? (
          <Typography component="p" variant="h4">
            {data?.length}
          </Typography>
        ) : (
          <Typography component="p" variant="h4">
            0
          </Typography>
        )}

        <div className={styles.iconAvatar}>
          <img src="../../../src/assets/Icons/timeOff.svg" alt="" />
        </div>
      </div>
      <Title>Time-off</Title>
      <div className={`tw-flex tw-items-center`}>
        <div
          className={`tw-p-4 tw-w-[15px] tw-h-[15px] tw-rounded-[50%] tw-bg-halt-bg tw-flex tw-justify-center tw-items-center tw-mr-2`}
        >
          <MovingIcon className={`tw-text-halt-color`} />
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
