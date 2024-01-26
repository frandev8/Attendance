import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Timeline } from "antd";
import { addDays, format } from "date-fns";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  calculateTimeBetween,
  formatAttendanceDateTitle,
} from "../../../utils/date";
import { fetchAttendanceByDate } from "../../../utils/http";
import CalenderDate from "./CalenderDate";
export function CalendarAttendanceTimeline({ attendanceData }) {
  const records = attendanceData.current[0];
  return (
    <div className="tw-w-full tw-max-w-2xl tw-mx-auto  tw-overflow-hidden">
      <div>
        <div className="tw-py-5 tw-grid tw-grid-cols-2 tw-gap-5">
          <div className="tw-border tw-shadow-sm tw-bg-white   tw-border-gray-100 tw-p-3 tw-rounded-md">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2  ">
              <h3 className="tw-text-gray-600 tw-font-semibold tw-text-lg">
                Check-in <span className="max-[1090px]:tw-hidden">Time </span>
              </h3>
            </div>
            <p className="tw-text-gray-600">
              {moment(records.clockInTime).format("hh:mm A")}
            </p>
          </div>
          <div className="tw-border tw-shadow-sm  tw-bg-white   tw-p-3 tw-rounded-md">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
              <h3 className="tw-text-gray-600 tw-font-semibold tw-text-lg">
                Check-out <span className="max-[1090px]:tw-hidden">Time </span>
              </h3>
            </div>
            <p className="tw-text-gray-600">
              {" "}
              {moment(records.clockOutTime).format("hh:mm A")}
            </p>
          </div>
          <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100 tw-p-3 tw-rounded-md">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
              <h3 className="tw-text-gray-600 tw-font-semibold tw-text-lg">
                Break <span className="max-[1090px]:tw-hidden">Duration </span>
              </h3>
            </div>
            <p className="tw-text-gray-600">
              {calculateTimeBetween(
                records.breakStartTime,
                records.breakEndTime
              )}
            </p>
          </div>
          <div className="tw-border tw-shadow-sm tw-bg-white   tw-border-gray-100 tw-p-3 tw-rounded-md">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
              <h3 className="tw-text-gray-600 tw-font-semibold tw-text-lg">
                Overtime{" "}
                <span className="max-[1090px]:tw-hidden">Duration </span>
              </h3>
            </div>
            <p className="tw-text-gray-600">
              {calculateTimeBetween(
                records.overtimeStartTime,
                records.overtimeEndTime
              )}
            </p>
          </div>
          <div className="tw-border tw-shadow-sm  tw-bg-white   tw-border-gray-100 tw-p-3 tw-rounded-md tw-col-span-2">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
              <h3 className="tw-text-gray-600 tw-font-semibold tw-text-lg">
                Status
              </h3>
            </div>
            <p className="tw-text-green-600">{records.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AttendanceCalendar({ attendanceData, triggerRerender }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(0);

  const userId = useSelector((state) => {
    return state.user.userId;
  });

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: fetchAttendanceByDate,
    onSuccess: (data) => {
      console.log(data, "my data");

      attendanceData.current = data;
      triggerRerender((prevRerender) => !prevRerender);
    },
    onError: () => {
      console.log("my data");
      attendanceData.current = [];
      triggerRerender((prevRerender) => !prevRerender);
    },
  });

  const {
    data: todayData,
    isPending: isTodayPending,
    error: todayError,
    isError: isTodayError,
  } = useQuery({
    queryKey: ["attendance", { type: "today" }],
    queryFn: () => fetchAttendanceByDate({ id: userId, date: currentDate }),
  });

  useEffect(() => {
    if (todayData) {
      attendanceData.current = todayData;
      triggerRerender((prevRerender) => !prevRerender);
    }
  }, [todayData, triggerRerender, attendanceData]);

  const handlePreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const formattedDate = formatAttendanceDateTitle(currentDate);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="tw-flex tw-flex-col tw-items-center  tw-w-full ">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4  tw-w-full ">
        <p className="tw-text-lg tw-font-bold">{formattedDate}</p>
        <div
          className="tw-flex tw-items-center tw-space-x-2  
       "
        >
          <button
            onClick={handlePreviousWeek}
            className="tw-w-[30px] tw-h-[30px] tw-rounded-full tw-bg-[#dbe9f9] tw-flex tw-justify-center tw-items-center"
          >
            <ArrowBackIosIcon
              style={{ fontSize: "18px", color: "#5295e3" }}
              className="tw-relative tw-left-1"
            />
          </button>
          <button
            onClick={handleNextWeek}
            className="tw-w-[30px] tw-h-[30px]  tw-rounded-full tw-bg-[#dbe9f9]"
          >
            <ArrowForwardIosIcon
              style={{ fontSize: "18px", color: "#5295e3" }}
            />
          </button>
        </div>
      </div>

      <ul className="tw-flex tw-justify-between tw-w-full">
        {daysOfWeek.map((day, index) => (
          <li key={index} className="tw-text-center">
            <ul>
              <li> {day}</li>
              <CalenderDate
                currentDate={currentDate}
                index={index}
                mutateDate={mutate}
                selectDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

AttendanceCalendar.propTypes = {
  attendanceData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  triggerRerender: PropTypes.func,
};
