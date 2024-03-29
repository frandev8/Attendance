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
            width="29"
            height="19"
            viewBox="0 0 29 19"
            fill="none"
          >
            <path
              d="M18.1487 8.42331H20.04V11.3672L23.1165 12.8391L22.1708 14.1962L18.1487 12.2754V8.42331ZM22.0952 4.59211C20.9604 1.96142 17.9343 0.0719147 14.366 0.0719147C10.9617 0.0719147 8.06165 1.79439 6.80078 4.24761C3.32076 4.24761 0.496399 6.58601 0.496399 9.46724C0.496399 12.3485 3.32076 14.6869 6.80078 14.6869H11.4408C12.8656 17.1505 15.8917 18.8626 19.4095 18.8626C24.2891 18.8626 28.2357 15.5951 28.2357 11.5551C28.2357 8.29804 25.6635 5.54208 22.0952 4.59211ZM6.80078 12.599C4.70772 12.599 3.01815 11.2002 3.01815 9.46724C3.01815 7.73432 4.70772 6.33546 6.80078 6.33546C7.2673 6.33546 7.72121 6.40854 8.1373 6.53381C8.38066 5.3117 9.14059 4.20095 10.2815 3.39977C11.4224 2.59858 12.87 2.15911 14.366 2.15976C16.4213 2.15976 18.2369 2.98446 19.4095 4.24761C14.5173 4.24761 10.5834 7.52554 10.5834 11.5551C10.5834 11.91 10.6212 12.2545 10.6843 12.599H6.80078ZM19.4095 16.7747C15.9295 16.7747 13.1052 14.4363 13.1052 11.5551C13.1052 8.67385 15.9295 6.33546 19.4095 6.33546C22.8895 6.33546 25.7139 8.67385 25.7139 11.5551C25.7139 14.4363 22.8895 16.7747 19.4095 16.7747Z"
              fill="#0043FF"
            />
          </svg>
        </div>
      </div>
      <Title>Absent</Title>
      <div className={`tw-flex  tw-items-center`}>
        <div
          className={` tw-p-4 tw-w-[15px] tw-h-[15px] tw-rounded-[50%] tw-bg-regress-bg tw-flex tw-justify-center tw-items-center tw-mr-2`}
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
