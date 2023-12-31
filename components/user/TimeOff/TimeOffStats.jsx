import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { useQuery } from "@tanstack/react-query";
import { Button, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { fetchTimeOffById } from "../../../utils/http";
import TimeOffCard, { TimeOffCard2 } from "../Cards/TimeOffCard";
import styles from "./TimeOffStats.module.css";

function TimeOffStats({ setModalOpen }) {
  const userId = useSelector((state) => state.user.userId);

  const { data, isPending } = useQuery({
    queryKey: ["timeOff", { status: "approved" }],
    queryFn: () => fetchTimeOffById({ approved: true, id: userId }),
  });

  if (data) {
    console.log(data);
  }

  function requestTimeOffHandler() {
    setModalOpen();
  }

  return (
    <div className="flex flex-col items-end">
      <div className="mb-[5px]">
        <Button
          type="primary"
          onClick={requestTimeOffHandler}
          danger
          icon={<HourglassTopIcon />}
          className="w-[180px]"
        >
          Request Time Off
        </Button>
      </div>
      <div>
        {isPending && <Spin />}

        <div className="flex justify-between flex-wrap">
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
  );
}
export function TimeOffStats2({ setModalOpen }) {
  const userId = useSelector((state) => state.user.userId);

  const { data, isPending } = useQuery({
    queryKey: ["timeOff", { status: "approved" }],
    queryFn: () => fetchTimeOffById({ approved: true, id: userId }),
  });

  if (data) {
    console.log(data);
  }

  function requestTimeOffHandler() {
    setModalOpen();
  }

  return (
    <div className="flex flex-col  ">
      <div className="mb-[5px]">
        <Button
          type="primary"
          onClick={requestTimeOffHandler}
          danger
          icon={<HourglassTopIcon />}
          className="w-[180px]"
        >
          Request Time Off
        </Button>
      </div>
      <div>
        {isPending && <Spin />}

        <div
          className={`flex justify-between w-[100%] gap-2 lg:gap-4 border-2 border-black ${styles["main"]}`}
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
  );
}

export default TimeOffStats;
