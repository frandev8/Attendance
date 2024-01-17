import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { useQuery } from "@tanstack/react-query";
import { Button, Spin } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openTimeOffModal } from "../../../src/store/main";
import { fetchTimeOffById } from "../../../utils/http";
import TimeOffCard, { TimeOffCard2 } from "../Cards/TimeOffCard";
import { NewTimeOff } from "./NewTimeOff";
import styles from "./TimeOffStats.module.css";

function TimeOffStats() {
  const userId = useSelector((state) => state.user.userId);
  const isModalOpen = useSelector((state) => state.timeOff.isModalOpen);

  const dispatch = useDispatch();

  const { data, isPending } = useQuery({
    queryKey: ["timeOff", { status: "approved" }],
    queryFn: () => fetchTimeOffById({ approved: true, id: userId }),
  });

  if (data) {
    // console.log(data);
  }

  function requestTimeOffHandler() {
    dispatch(openTimeOffModal());
  }

  return (
    <>
      <div className="tw-flex tw-flex-col tw-items-end">
        <div className="tw-mb-[5px]">
          <Button
            type="primary"
            onClick={requestTimeOffHandler}
            danger
            icon={<HourglassTopIcon />}
            className="tw-w-[180px]"
          >
            Request Time Off
          </Button>
        </div>
        <div>
          {isPending && <Spin />}

          <div className="tw-flex tw-justify-between tw-flex-wrap">
            <TimeOffCard
              typeOfLeave={"Casual"}
              limit={7}
              used={data?.filter((timeOff) => timeOff.type === "casual")}
            />
            <TimeOffCard
              typeOfLeave={"Sick"}
              limit={5}
              used={data?.filter((timeOff) => timeOff.type === "sick")}
            />
            <TimeOffCard
              typeOfLeave={"Earned"}
              limit={10}
              used={data?.filter((timeOff) => timeOff.type === "earned")}
            />
            <TimeOffCard
              typeOfLeave={"Adjustment"}
              limit={10}
              used={data?.filter((timeOff) => timeOff.type === "adjustment")}
            />
          </div>
        </div>
      </div>
      {isModalOpen && <NewTimeOff />}
    </>
  );
}
export function TimeOffStats2() {
  const userId = useSelector((state) => state.user.userId);
  const isModalOpen = useSelector((state) => state.timeOff.isModalOpen);

  const dispatch = useDispatch();

  const { data, isPending } = useQuery({
    queryKey: ["timeOff", { status: "approved" }],
    queryFn: () => fetchTimeOffById({ approved: true, id: userId }),
  });

  function requestTimeOffHandler() {
    dispatch(openTimeOffModal());
  }

  return (
    <>
      <div className="tw-flex tw-flex-col  ">
        <div className="tw-mb-[5px]">
          <Button
            type="primary"
            onClick={requestTimeOffHandler}
            danger
            icon={<HourglassTopIcon />}
            className="tw-w-[180px]"
          >
            Request Time Off
          </Button>
        </div>
        <div>
          {isPending && <Spin />}

          <div
            className={`tw-flex tw-justify-between tw-w-[100%] tw-gap-2 tw-lg:gap-4 tw-border-2 tw-border-black ${styles["main"]}`}
          >
            <TimeOffCard2
              typeOfLeave={"Casual"}
              limit={7}
              used={data?.filter((timeOff) => timeOff.type === "casual")}
            />
            <TimeOffCard2
              typeOfLeave={"Sick"}
              limit={5}
              used={data?.filter((timeOff) => timeOff.type === "sick")}
            />
            <TimeOffCard2
              typeOfLeave={"Earned"}
              limit={10}
              used={data?.filter((timeOff) => timeOff.type === "earned")}
            />
            <TimeOffCard2
              typeOfLeave={"Adjustment"}
              limit={10}
              used={data?.filter((timeOff) => timeOff.type === "adjustment")}
            />
          </div>
        </div>
      </div>

      {isModalOpen && <NewTimeOff />}
    </>
  );
}

export default TimeOffStats;
