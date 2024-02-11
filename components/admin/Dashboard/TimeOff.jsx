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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="19"
            viewBox="0 0 23 19"
            fill="none"
          >
            <g clipPath="url(#clip0_106_364)">
              <path
                d="M18.5745 8.50677C19.1233 8.72232 19.6194 8.9932 20.0626 9.31943C20.5059 9.64565 20.8859 10.0156 21.2025 10.4292C21.5191 10.8428 21.7583 11.2855 21.9202 11.7574C22.082 12.2293 22.1664 12.7186 22.1735 13.2254C22.1735 13.9419 22.0081 14.6177 21.6774 15.2527C21.3467 15.8876 20.8964 16.4411 20.3265 16.9129C19.7566 17.3848 19.0881 17.7576 18.3212 18.0314C17.5543 18.3052 16.7381 18.4421 15.8726 18.4421C15.2605 18.4421 14.6694 18.3722 14.0995 18.2324C13.5296 18.0926 12.9984 17.8945 12.5058 17.6382C12.0133 17.3819 11.5665 17.0702 11.1654 16.7032C10.7644 16.3362 10.4337 15.9226 10.1734 15.4624H0.558472V2.0405H4.15745V0.546265H5.96222V2.0405H13.1707V0.546265H14.965V2.0405H18.5745V8.50677ZM2.36324 5.02023H16.7697V3.52599H2.36324V5.02023ZM9.62453 13.9682C9.58232 13.7235 9.56121 13.4759 9.56121 13.2254C9.56121 12.503 9.72656 11.8244 10.0573 11.1894C10.388 10.5544 10.8383 10.001 11.4082 9.52915C11.9781 9.05728 12.6466 8.68445 13.4135 8.41065C14.1804 8.13686 15.0001 7.99996 15.8726 7.99996C16.1752 7.99996 16.4742 8.01743 16.7697 8.05239V6.51446H2.36324V13.9682H9.62453ZM15.8726 16.9479C16.4918 16.9479 17.0723 16.8518 17.6141 16.6595C18.1558 16.4673 18.6343 16.1993 19.0494 15.8556C19.4646 15.5119 19.7847 15.1187 20.0099 14.676C20.235 14.2332 20.3546 13.7497 20.3687 13.2254C20.3687 12.7128 20.2526 12.2293 20.0204 11.7749C19.7882 11.3205 19.4681 10.9243 19.06 10.5865C18.6519 10.2486 18.1734 9.98353 17.6246 9.79129C17.0758 9.59905 16.4918 9.50002 15.8726 9.49419C15.2464 9.49419 14.6624 9.59031 14.1206 9.78255C13.5788 9.97479 13.1004 10.2428 12.6853 10.5865C12.2701 10.9302 11.95 11.3263 11.7248 11.7749C11.4997 12.2234 11.38 12.7069 11.366 13.2254C11.366 13.7439 11.4821 14.2274 11.7143 14.676C11.9465 15.1245 12.2701 15.5177 12.6853 15.8556C13.1004 16.1935 13.5788 16.4585 14.1206 16.6508C14.6624 16.843 15.2464 16.9421 15.8726 16.9479ZM16.7697 12.4739H18.5745V13.9682H14.965V10.9884H16.7697V12.4739Z"
                fill="#0043FF"
              />
            </g>
            <defs>
              <clipPath id="clip0_106_364">
                <rect
                  width="21.615"
                  height="17.8959"
                  fill="white"
                  transform="translate(0.558472 0.546265)"
                />
              </clipPath>
            </defs>
          </svg>
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
