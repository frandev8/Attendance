import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Timeline } from "antd";
import { addDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatAttendanceDateTitle } from "../../../utils/date";
import { fetchAttendanceByDate } from "../../../utils/http";
import CalenderDate from "./CalenderDate";
// export const CalendarAttendanceTimeline = () => (
//   <div className="tw-border-black tw-border-2">
//     <Timeline
//       items={[
//         {
//           children: "clock in at 09:01am",
//         },
//         {
//           children: "break at at 12:22pm",
//         },
//         {
//           children: "clock out at 17:00pm",
//         },
//         {
//           children: "overtime at 17:00pm",
//         },
//       ]}
//     />
//   </div>
// );

export function CalendarAttendanceTimeline() {
  return (
    <div className="tw-w-full tw-max-w-2xl tw-mx-auto tw-bg-white tw-shadow-md tw-rounded-lg tw-overflow-hidden">
      <div className="tw-flex tw-justify-between tw-border-b tw-border-gray-100 tw-px-5 py-4">
        <div>
          <span className="tw-text-gray-700 tw-font-semibold">
            Attendance Tracker
          </span>
        </div>
      </div>
      <div>
        <div className="tw-px-5 tw-py-5 tw-grid tw-grid-cols-2 tw-gap-5">
          <div className="tw-border tw-border-gray-100 tw-p-3 tw-rounded-md">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
              <h3 className="tw-text-gray-600 tw-font-semibold tw-text-lg">
                Check-in Time
              </h3>
            </div>
            <p className="tw-text-gray-600">8:00 AM</p>
          </div>
          <div className="tw-border tw-border-gray-100 tw-p-3 tw-rounded-md">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
              <h3 className="tw-text-gray-600 tw-font-semibold tw-text-lg">
                Check-out Time
              </h3>
            </div>
            <p className="tw-text-gray-600">5:00 PM</p>
          </div>
          <div className="tw-border tw-border-gray-100 tw-p-3 tw-rounded-md">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
              <h3 className="tw-text-gray-600 tw-font-semibold tw-text-lg">
                Break Duration
              </h3>
            </div>
            <p className="tw-text-gray-600">1 Hour</p>
          </div>
          <div className="tw-border tw-border-gray-100 tw-p-3 tw-rounded-md">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
              <h3 className="tw-text-gray-600 tw-font-semibold tw-text-lg">
                Overtime Duration
              </h3>
            </div>
            <p className="tw-text-gray-600">2 Hours</p>
          </div>
          <div className="tw-border tw-border-gray-100 tw-p-3 tw-rounded-md tw-col-span-2">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
              <h3 className="tw-text-gray-600 tw-font-semibold tw-text-lg">
                Status
              </h3>
            </div>
            <p className="tw-text-green-600">Present</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AttendanceCalendar({ setDateData }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const userId = useSelector((state) => {
    return state.user.userId;
  });

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: fetchAttendanceByDate,
    onSuccess: (data) => {
      console.log(data, "my data");
      setDateData(data);
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
    onSuccess: (data) => {
      // console.log(data, "today data");
      setDateData(data);
    },
  });

  const handlePreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const formattedDate = formatAttendanceDateTitle(currentDate);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-border-2 tw-border-black  tw-w-full ">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4  tw-w-full ">
        <p className="tw-text-lg tw-font-bold">{formattedDate}</p>
        <div className="tw-flex tw-items-center tw-space-x-2">
          <button
            onClick={handlePreviousWeek}
            className="tw-p-2 tw-rounded-full tw-bg-[#ffff]"
          >
            <ArrowBackIosIcon />
          </button>
          <button
            onClick={handleNextWeek}
            className="tw-p-2 tw-rounded-full tw-bg-[#ffff]"
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>

      <ul className="tw-flex tw-justify-between tw-border-2 tw-border-black tw-w-full">
        {daysOfWeek.map((day, index) => (
          <li key={index} className="tw-text-center">
            <ul>
              <li> {day}</li>
              <CalenderDate
                currentDate={currentDate}
                index={index}
                mutateDate={mutate}
              />
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
