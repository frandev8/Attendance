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

export default function Departure() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["attendance", { type: "earlyDeparture" }],
    queryFn: () => fetchAttendanceSummary({ earlyDeparture: true }),
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
          {/* <img src="../../../src/assets/Icons/early.svg" alt="" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="23"
            viewBox="0 0 27 23"
            fill="none"
          >
            <path
              d="M14.7026 21.4421C13.1896 21.4421 11.7713 21.2034 10.4477 20.7262C9.12415 20.249 7.97135 19.6038 6.98931 18.7908C6.00727 17.9783 5.22805 17.0239 4.65165 15.9274C4.07525 14.831 3.78705 13.6568 3.78705 12.4046C3.78705 10.2273 4.62463 8.30709 6.29979 6.64397C7.97496 4.98085 10.1094 3.94826 12.7032 3.5462C12.379 5.0226 12.4781 6.46561 13.0004 7.8752C13.5228 9.2848 14.4234 10.5187 15.7023 11.577C16.9812 12.6358 18.4719 13.3815 20.1745 13.8139C21.877 14.2464 23.6195 14.3284 25.4021 14.06C24.9337 16.2075 23.6909 17.9747 21.6735 19.3617C19.6561 20.7486 17.3325 21.4421 14.7026 21.4421ZM14.7026 19.6525C16.2877 19.6525 17.7557 19.3244 19.1067 18.6682C20.4576 18.012 21.5204 17.1098 22.2949 15.9614C20.7458 15.8421 19.2778 15.5176 17.8908 14.9879C16.5039 14.4582 15.261 13.7388 14.1623 12.8297C13.0635 11.92 12.1899 10.891 11.5414 9.74264C10.893 8.59432 10.5057 7.37889 10.3796 6.09636C8.99266 6.73762 7.90759 7.62138 7.12441 8.74763C6.34122 9.87387 5.94927 11.0929 5.94855 12.4046C5.94855 14.4179 6.79982 16.1294 8.50236 17.539C10.2049 18.9486 12.2717 19.6531 14.7026 19.6525Z"
              fill="#0043FF"
            />
          </svg>
        </div>
      </div>
      <Title>Early Departures</Title>
      <div className={`tw-flex tw-items-center`}>
        <div
          className={` tw-p-4 tw-w-[15px] tw-h-[15px] tw-rounded-[50%] tw-bg-progress-bg tw-flex tw-justify-center tw-items-center tw-mr-2`}
        >
          <MovingIcon className={`tw-text-progress-color`} />
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
