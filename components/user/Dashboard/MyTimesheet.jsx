import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Alert from "@mui/material/Alert";
import { useMutation } from "@tanstack/react-query";
import { Button, Progress, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteClockInTokenCookie,
  deleteUserLoginToken,
  saveClockInTokenCookie,
} from "../../../utils/auth";
import { clockIn, clockOut } from "../../../utils/http";
import BreakReader from "../Timesheet/BreakReader";
import ClockInReader from "../Timesheet/ClockInReader";
import ClockOutReader from "../Timesheet/ClockOutReader";
import OvertimeReader from "../Timesheet/OvertimeReader";
import EndBreak from "../buttons/EndBreak";
import EndOvertime from "../buttons/EndOvertime";
import StartBreak from "../buttons/StartBreak";
import StartOvertime from "../buttons/StartOvertime";

function MyTimeSheet() {
  const [isClockActive, setClockBtn] = useState(false);
  const [isClockInActive, setClockInActive] = useState(false);
  const [isClockOutActive, setClockOutActive] = useState(false);
  const [todayDate, setTodayDate] = useState(null);
  const [workRate, setWorkRate] = useState(0);

  const id = useSelector((state) => {
    return state.user.userId;
  });

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: clockIn,
    onSuccess: (data) => {
      const { clockInToken } = data;
      console.log("success");
      setClockBtn((prev) => !prev);
      setClockInActive(true);
      setClockOutActive(false);
      saveClockInTokenCookie(clockInToken);
    },
  });

  const {
    isPending: isClockOutPending,
    data: clockOutData,
    mutate: mutateClockOut,
    error: clockOutErr,
    isError: isClockOutError,
  } = useMutation({
    mutationFn: clockOut,
    onSuccess: (data) => {
      // const { clockOutTime } = data;
      deleteUserLoginToken();
      setClockBtn((prev) => !prev);
      setClockOutActive(true);
      setClockInActive(false);
      deleteClockInTokenCookie();
    },
  });

  function onClockInHandler() {
    // mutate({ id });
  }

  const onClockOutHandler = () => {
    // mutateClockOut({ id });
  };

  useEffect(() => {
    setTodayDate(new Date());
  }, []);

  let content = "";

  if (isError && isClockInActive) {
    content = `Error: ${
      error.info?.message || "couldn't clock in. Try again. "
    } `;
  }
  if (isClockOutError && isClockOutActive) {
    content = `Error: ${
      clockOutErr.info?.message || "couldn't clock out. Try again. "
    } `;
  }

  if (data && isClockInActive) {
    const { attendance } = data;

    const clockInTime = dayjs(attendance.clockInTime).format(
      "ddd, DD MMM YYYY h:mma"
    );

    content = `Clocked in at ${clockInTime}`;
  }

  if (clockOutData && isClockOutActive) {
    const { clockOutTime } = clockOutData;

    const clockInTime = dayjs(clockOutTime).format("ddd, DD MMM YYYY h:mma");

    content = `Clocked out at ${clockInTime}`;
  }

  const now = dayjs(todayDate).format("DD MMM YYYY");

  return (
    <div
      className={`tw-flex tw-flex-col tw-justify-between tw-items-start tw-h-full tw-items-center`}
    >
      <div className="tw-text-center">
        <p className="tw-max-sm:text-ssm tw-md:text-sm">Mon, 09 Jan 2023</p>
        <h3 className="tw-max-sm:text-sbase tw-md:text-base">Hello, James</h3>
      </div>
      <div>
        <Progress
          type="circle"
          size={100}
          percent={workRate}
          format={(percent) => (
            <>
              <div className="tw-max-sm:text-ssm tw-md:text-sm">00:00:09</div>
              <div className="tw-max-sm:text-ssm ">Clocked in</div>
            </>
          )}
          className="tw-mb-[5px]"
        />
      </div>
      <div className="tw-max-sm:text-ssm tw-md:text-sm">Potan Office</div>
      <div className="tw-w-full tw-flex tw-justify-end">
        <Button
          icon={<AddIcon sx={{ fontSize: "12px" }} />}
          type="dashed"
          className="tw-max-sm:text-ssm tw-p-2 tw-w-[max-content]"
        >
          Break
        </Button>
      </div>
      <div className=" tw-w-full tw-flex tw-justify-between tw-shadow-sm">
        <div>
          <ClockInReader />
        </div>
        <div>
          <BreakReader />
        </div>
        <div>
          <ClockOutReader />
        </div>
        {/* <div>
          <OvertimeReader />
        </div> */}
      </div>
      <div>
        {!isClockActive ? (
          <Button
            className=" tw-bg-[#00ff00]"
            type="primary"
            size={"medium"}
            onClick={onClockInHandler}
          >
            {isPending ? <Spin /> : "Clock in"}
          </Button>
        ) : (
          <Button
            className="  tw-bg-[#ff0000]"
            onClick={onClockOutHandler}
            type="primary"
            size={"medium"}
          >
            {isClockOutPending ? <Spin /> : "Clock out"}
          </Button>
        )}
      </div>
    </div>
  );
}

// <span>Timesheet</span>
// <div className="mb-[5px] text-center">
//   <span>{now}</span>
// </div>
// <div>
//   {(data || isError) && (
//     <Alert
//       variant="outlined"
//       severity={isError || isClockOutError ? "error" : "success"}
//       className="mb-[5px]"
//     >
//       {content}
//     </Alert>
//   )}
// </div>
// <div className="w-full flex flex-col items-center justify-around border-2 border-black mb-[5px]">
//   <Progress
//     type="circle"
//     size={80}
//     percent={workRate}
//     format={(percent) => ` 3.4 hrs`}
//     className="mb-[5px]"
//   />

//   {!isClockActive ? (
//     <Button
//       className="w-[40%] bg-[#00ff00]"
//       type="primary"
//       size={"medium"}
//       onClick={onClockInHandler}
//     >
//       {isPending ? <Spin /> : "Clock in"}
//     </Button>
//   ) : (
//     <Button
//       className="w-[40%]  bg-[#ff0000]"
//       onClick={onClockOutHandler}
//       type="primary"
//       size={"medium"}
//     >
//       {isClockOutPending ? <Spin /> : "Clock out"}
//     </Button>
//   )}
// </div>

// <div className="w-full flex justify-between items-center">
//   <div>
//     Break
//     <div className="flex">
//       <StartBreak />
//       <EndBreak />
//     </div>
//   </div>
//   <div>
//     Overtime
//     <div className="flex">
//       <StartOvertime />
//       <EndOvertime />
//     </div>
//   </div>
// </div>

export default MyTimeSheet;
