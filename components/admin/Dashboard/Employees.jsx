import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Spin } from "antd";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../../../utils/http";
import styles from "./Employees.module.css";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Employees() {
  const { data, isPending } = useQuery({
    queryKey: ["employees", { type: "activated" }],
    queryFn: () => fetchEmployees({ active: true }),
  });

  // if (data) {
  //   console.log(data);
  // }

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
          <img src="../../../src/assets/Icons/employee.svg" alt="" />
        </div>
      </div>
      <Title>Total Employee</Title>
      <div className={`tw-flex  tw-items-center`}>
        <div
          className={` tw-p-4 tw-w-[15px] tw-h-[15px] tw-rounded-[50%] tw-bg-progress-bg tw-flex tw-justify-center tw-items-center tw-mr-2`}
        >
          <AddIcon className={`tw-text-progress-color`} />
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
