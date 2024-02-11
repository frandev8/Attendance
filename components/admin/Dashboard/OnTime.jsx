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

export default function OnTime() {
  const { data, isPending } = useQuery({
    queryKey: ["attendance", { type: "onTime" }],
    queryFn: () => fetchAttendanceSummary({ onTime: true }),
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
            width="28"
            height="23"
            viewBox="0 0 28 23"
            fill="none"
          >
            <path
              d="M13.9734 20.9371C12.5849 20.9371 11.276 20.7155 10.0467 20.2725C8.81733 19.8295 7.74333 19.2276 6.82469 18.4671C5.9053 17.7059 5.17805 16.8164 4.64293 15.7985C4.10781 14.7807 3.84062 13.6973 3.84137 12.5484H6.09293C6.09293 14.3504 6.86222 15.8883 8.40079 17.1622C9.93936 18.436 11.7969 19.0729 13.9734 19.0729C16.1499 19.0729 18.0075 18.436 19.546 17.1622C21.0846 15.8883 21.8539 14.3504 21.8539 12.5484H24.1054C24.1054 13.6979 23.8379 14.7816 23.3028 15.7995C22.7676 16.8173 22.0408 17.7065 21.1221 18.4671C20.2027 19.2283 19.1284 19.8304 17.899 20.2734C16.6697 20.7165 15.3611 20.9377 13.9734 20.9371ZM3.84137 12.5484C3.84137 11.3988 4.10893 10.3151 4.64405 9.29731C5.17918 8.27948 5.90605 7.39028 6.82469 6.62971C7.74408 5.86851 8.81845 5.26639 10.0478 4.82334C11.2772 4.3803 12.5857 4.15909 13.9734 4.15971C15.1367 4.15971 16.2531 4.31505 17.3226 4.62574C18.3921 4.93644 19.3959 5.38694 20.3341 5.97725L21.9102 4.67235L23.4863 5.97725L21.9102 7.28216C22.6232 8.05889 23.1673 8.88999 23.5426 9.77546C23.9178 10.6609 24.1054 11.5852 24.1054 12.5484H21.8539C21.8539 10.7464 21.0846 9.20845 19.546 7.93461C18.0075 6.66078 16.1499 6.02386 13.9734 6.02386C11.7969 6.02386 9.93936 6.66078 8.40079 7.93461C6.86222 9.20845 6.09293 10.7464 6.09293 12.5484H3.84137ZM10.5961 3.22763V1.36348H17.3508V3.22763H10.5961ZM13.9734 6.02386C11.9845 6.02386 10.2583 6.5598 8.79481 7.63169C7.33129 8.70358 6.45881 10.0318 6.17737 11.6163H10.1739L11.6374 13.8533L16.225 7.18895L19.152 11.6163H21.7694C21.488 10.0318 20.6155 8.70358 19.152 7.63169C17.6885 6.5598 15.9623 6.02386 13.9734 6.02386ZM13.9734 19.0729C15.9623 19.0729 17.6885 18.537 19.152 17.4651C20.6155 16.3932 21.488 15.065 21.7694 13.4805H17.7729L16.3094 11.2435L11.7218 17.9078L8.79481 13.4805H6.17737C6.45881 15.065 7.33129 16.3932 8.79481 17.4651C10.2583 18.537 11.9845 19.0729 13.9734 19.0729ZM13.9734 19.0729C11.7969 19.0729 9.93936 18.436 8.40079 17.1622C6.86222 15.8883 6.09293 14.3504 6.09293 12.5484C6.09293 10.7464 6.86222 9.20845 8.40079 7.93461C9.93936 6.66078 11.7969 6.02386 13.9734 6.02386C16.1499 6.02386 18.0075 6.66078 19.546 7.93461C21.0846 9.20845 21.8539 10.7464 21.8539 12.5484C21.8539 14.3504 21.0846 15.8883 19.546 17.1622C18.0075 18.436 16.1499 19.0729 13.9734 19.0729Z"
              fill="#0043FF"
            />
          </svg>
        </div>
      </div>
      <Title>On Time</Title>
      <div className={`tw-flex tw-justify-between tw-items-center`}>
        <div
          className={` tw-p-4 tw-w-[15px] tw-h-[15px] tw-rounded-[50%] tw-bg-progress-bg tw-flex tw-justify-center tw-items-center tw-mr-2`}
        >
          <MovingIcon className={`tw-text-progress-color`} />
        </div>
        <Typography color="text.secondary" sx={{ flex: 1, fontSize: "16px" }}>
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
