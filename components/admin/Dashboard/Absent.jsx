import AddIcon from "@mui/icons-material/Add";
import MovingIcon from "@mui/icons-material/Moving";
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

export default function Absent() {
  const { data, isPending } = useQuery({
    queryKey: ["attendance", { type: "absent" }],
    queryFn: () => fetchAttendanceSummary({ absent: "absent" }),
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
          <img src="../../../src/assets/Icons/absent.svg" alt="" />
        </div>
      </div>
      <Title>Absent</Title>
      <div className={`tw-flex  tw-items-center`}>
        <div
          className={` tw-p-4 tw-w-[15px] tw-h-[15px] tw-rounded-[50%] tw-bg-regress-bg tw-flex tw-justify-center items-center tw-mr-2`}
        >
          <MovingIcon className={`tw-text-regress-color tw-rotate-180`} />
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
