import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import * as React from "react";
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
