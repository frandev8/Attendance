import { getDurationBetweenDates } from "@/utils/date";
import { getUserClockinLoc } from "@/utils/location";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PlaceIcon from "@mui/icons-material/Place";
import Alert from "@mui/material/Alert";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal, Progress, Spin, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteClockInTokenCookie,
  getBreakTokenCookie,
  getClockInTokenCookie,
  getOvertimeTokenCookie,
  saveClockInTokenCookie,
} from "../../../utils/auth";
import { clockIn, clockOut } from "../../../utils/http";
import EndBreak from "../buttons/EndBreak";
import EndOvertime from "../buttons/EndOvertime";
import StartBreak from "../buttons/StartBreak";
import StartOvertime from "../buttons/StartOvertime";
import BreakReader from "./BreakReader";
import ClockInReader from "./ClockInReader";
import ClockOutReader from "./ClockOutReader";
import ClockinTimer from "./ClockinTimer";
import OvertimeReader from "./OvertimeReader";

function MyTimeSheet() {
  const [clockInTimeElapse, setClockInElapse] = useState(null);

  const intervalIdRef = useRef(null);

  const updateTime = (clockInTime) => {
    const now = new Date();

    const timeString = getDurationBetweenDates(clockInTime, now);
    // console.log("called!", timeString);

    setClockInElapse(timeString);
    // Update the element displaying the time
  };

  const [isButtonActive, setButtonActive] = useState({
    clockOut: false,
    clockIn: !getClockInTokenCookie() ? false : true,
    overtime: !getOvertimeTokenCookie() ? false : true,
    break: !getBreakTokenCookie() ? false : true,
  });

  const [isModalOpen, setOpen] = useState({
    clockOut: false,
    clockIn: false,
  });

  const [todayDate, setTodayDate] = useState(null);
  const [workRate, setWorkRate] = useState(0);

  const id = useSelector((state) => {
    return state.user.userId;
  });

  const showClockOutModal = () => {
    setOpen((prev) => {
      return { ...prev, clockOut: true };
    });
  };
  const showClockInModal = () => {
    setOpen((prev) => {
      return { ...prev, clockIn: true };
    });
  };

  const setBreakActive = () => {
    setButtonActive((prev) => {
      return { ...prev, break: true };
    });
  };

  const setOvertimeActive = () => {
    setButtonActive((prev) => {
      return { ...prev, overtime: true };
    });
  };

  const setBreakUnActive = () => {
    setButtonActive((prev) => {
      return { ...prev, break: false };
    });
  };

  const setOvertimeUnActive = () => {
    setButtonActive((prev) => {
      return { ...prev, overtime: false };
    });
  };

  const hideClockOutModal = () => {
    setOpen((prev) => {
      return { ...prev, clockOut: false };
    });
  };
  const hideClockInModal = () => {
    setOpen((prev) => {
      return { ...prev, clockIn: false };
    });
  };

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: clockIn,
    onSuccess: (data) => {
      console.log(data);
      const { clockInToken, attendance } = data;

      setButtonActive((prev) => {
        return { ...prev, clockIn: true, clockOut: false };
      });

      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current); // Clear existing timer if any
      }

      intervalIdRef.current = setInterval(() => {
        updateTime(attendance.clockInTime);
      }, 1000);

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
      setButtonActive((prev) => {
        return { ...prev, clockIn: false, clockOut: true };
      });
      deleteClockInTokenCookie();
    },
  });

  useEffect(() => {
    setTodayDate(new Date());
  }, []);

  let content = "";

  if (isError && isButtonActive.clockIn) {
    content = `Error: ${
      error.info?.message || "couldn't clock in. Try again. "
    } `;

    // message.error(content);
  }
  if (isClockOutError && isButtonActive.clockOut) {
    content = `Error: ${
      clockOutErr.info?.message || "couldn't clock out. Try again. "
    } `;
    // message.error(content);
  }

  if (data && isButtonActive.clockIn) {
    const { attendance } = data;

    const clockInTime = dayjs(attendance.clockInTime).format(
      "ddd, DD MMM YYYY h:mma"
    );

    content = `Clocked in at ${clockInTime}`;
  }

  if (clockOutData && isButtonActive.clockOut) {
    const { clockOutTime } = clockOutData;

    const clockInTime = dayjs(clockOutTime).format("ddd, DD MMM YYYY h:mma");

    content = `Clocked out at ${clockInTime}`;
  }

  const now = dayjs(todayDate).format("DD MMM YYYY");

  const confirmClockIn = (e) => {
    mutate({ id });
    hideClockInModal();
  };

  const confirmClockOut = (e) => {
    mutateClockOut({ id });
    hideClockOutModal();
  };

  // console.log(street, city, "hmm");

  return (
    <div
      className={`tw-flex tw-flex-col tw-justify-between tw-h-full tw-items-center`}
    >
      <div className="tw-text-center">
        <p className="max-sm:tw-text-ssm md:tw-text-sm">Mon, 09 Jan 2023</p>
        <h3 className="max-sm:tw-text-sbase md:tw-text-base">Hello, James</h3>
      </div>
      <div>
        <Progress
          type="circle"
          size={100}
          percent={workRate}
          format={(percent) => (
            <ClockinTimer clockInTimeElapse={clockInTimeElapse} />
          )}
          className="tw-mb-[5px]"
        />
      </div>
      {/* <div className="max-sm:tw-text-ssm md:tw-text-sm">
        <PlaceIcon /> Potan Office
      </div> */}
      <div className="tw-w-full tw-flex tw-justify-between">
        {!isButtonActive.overtime ? (
          <StartOvertime setOvertimeActive={setOvertimeActive} />
        ) : (
          <EndOvertime setOvertimeUnActive={setOvertimeUnActive} />
        )}
        {!isButtonActive.break ? (
          <StartBreak setBreakActive={setBreakActive} />
        ) : (
          <EndBreak setBreakUnActive={setBreakUnActive} />
        )}
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
        {!isButtonActive.clockIn ? (
          <Button
            className=" tw-bg-[#0000ff]"
            type="primary"
            size={"medium"}
            onClick={showClockInModal}
          >
            {isPending ? <Spin /> : "Clock in"}
          </Button>
        ) : (
          <Button
            className="  tw-bg-[#ff0000]"
            type="primary"
            size={"medium"}
            onClick={showClockOutModal}
          >
            {isClockOutPending ? <Spin /> : "Clock out"}
          </Button>
        )}

        <Modal
          title="Clock in"
          open={isModalOpen.clockIn}
          onCancel={hideClockInModal}
          footer={(_, { CancelBtn }) => (
            <div className="tw-flex">
              <CancelBtn />
              <Button className="tw-bg-[#0000ff]" onClick={confirmClockIn}>
                Yes{" "}
              </Button>
            </div>
          )}
        >
          <p>Are you sure you want to clock in?</p>
        </Modal>
        <Modal
          title="Clock out"
          open={isModalOpen.clockOut}
          onCancel={hideClockOutModal}
          footer={(_, { CancelBtn }) => (
            <div className="tw-flex">
              <CancelBtn />
              <Button className="tw-bg-[#0000ff]" onClick={confirmClockOut}>
                Yes{" "}
              </Button>
            </div>
          )}
        >
          <p>Are you sure you want to clock out?</p>
        </Modal>
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
