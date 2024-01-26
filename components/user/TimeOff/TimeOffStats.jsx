import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider, Spin } from "antd";
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
      <div className="tw-flex tw-flex-col tw-h-full tw-justify-between tw-items-end ">
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
        <Divider className="tw-mt-[0px] tw-mb-[5px]" />
        <div>
          <div className="tw-flex tw-justify-between tw-flex-wrap">
            <TimeOffCard
              typeOfLeave={"Casual"}
              limit={7}
              used={data?.filter((timeOff) => timeOff.type === "casual")}
              isPending={isPending}
            />
            <TimeOffCard
              typeOfLeave={"Sick"}
              limit={5}
              used={data?.filter((timeOff) => timeOff.type === "sick")}
              isPending={isPending}
            />
            <TimeOffCard
              typeOfLeave={"Earned"}
              limit={10}
              used={data?.filter((timeOff) => timeOff.type === "earned")}
              isPending={isPending}
            />
            <TimeOffCard
              typeOfLeave={"Adjustment"}
              limit={10}
              used={data?.filter((timeOff) => timeOff.type === "adjustment")}
              isPending={isPending}
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
      <div className="tw-flex tw-flex-col tw-border-2 tw-border-black tw-justify-evenly  ">
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
          <div
            className={`tw-flex tw-justify-between tw-w-[100%] tw-gap-2 tw-lg:gap-4 ${styles["main"]}`}
          >
            <TimeOffCard2
              typeOfLeave={"Casual"}
              limit={7}
              used={data?.filter((timeOff) => timeOff.type === "casual")}
              isPending={isPending}
            />
            <TimeOffCard2
              typeOfLeave={"Sick"}
              limit={5}
              used={data?.filter((timeOff) => timeOff.type === "sick")}
              isPending={isPending}
            />
            <TimeOffCard2
              typeOfLeave={"Earned"}
              limit={10}
              used={data?.filter((timeOff) => timeOff.type === "earned")}
              isPending={isPending}
            />
            <TimeOffCard2
              typeOfLeave={"Adjustment"}
              limit={10}
              used={data?.filter((timeOff) => timeOff.type === "adjustment")}
              isPending={isPending}
            />
          </div>
        </div>
      </div>

      {isModalOpen && <NewTimeOff />}
    </>
  );
}

export default TimeOffStats;
