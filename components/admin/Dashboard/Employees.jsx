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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="19"
            viewBox="0 0 25 19"
            fill="none"
          >
            <path
              d="M16.9039 17.2222V15.4326C16.9039 14.4833 16.4485 13.5729 15.6378 12.9017C14.827 12.2305 13.7275 11.8534 12.5809 11.8534H6.09644C4.94991 11.8534 3.85034 12.2305 3.03962 12.9017C2.2289 13.5729 1.77344 14.4833 1.77344 15.4326V17.2222"
              stroke="#0043FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.3385 8.27419C11.726 8.27419 13.6615 6.67174 13.6615 4.69502C13.6615 2.71829 11.726 1.11584 9.3385 1.11584C6.95098 1.11584 5.0155 2.71829 5.0155 4.69502C5.0155 6.67174 6.95098 8.27419 9.3385 8.27419Z"
              stroke="#0043FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M23.3884 17.2221V15.4325C23.3877 14.6395 23.0689 13.8691 22.4821 13.2424C21.8952 12.6156 21.0736 12.1679 20.1462 11.9697M16.9039 1.23218C17.8338 1.4293 18.658 1.87706 19.2466 2.50485C19.8352 3.13265 20.1547 3.90477 20.1547 4.6995C20.1547 5.49423 19.8352 6.26635 19.2466 6.89415C18.658 7.52194 17.8338 7.9697 16.9039 8.16682"
              stroke="#0043FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
