import { addDays, format } from "date-fns";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { areDatesEqual, setDateOnly } from "../../../utils/date";
import styles from "./CalenderDate.module.css";

function CalenderDate({ currentDate, index, mutateDate }) {
  const [isDateActive, setDateActive] = useState({});

  const userId = useSelector((state) => {
    return state.user.userId;
  });

  const todayDate = new Date();

  const modifiedCalenderDate = setDateOnly(
    currentDate,
    currentDate.getDay() === 0
      ? parseInt(format(addDays(currentDate, index - 6), "d"))
      : parseInt(
          format(addDays(currentDate, index - currentDate.getDay() + 1), "d")
        )
  );

  const match = areDatesEqual(modifiedCalenderDate, todayDate);

  const isToday = match ? "today" : "";

  const onHandleDateClick = () => {
    mutateDate({ id: userId, date: modifiedCalenderDate });
  };

  return (
    <li>
      <div
        className={`${styles[isToday]} tw-w-max tw-h-max tw-text-center tw-p-1`}
        onClick={onHandleDateClick}
      >
        {currentDate.getDay() === 0
          ? format(addDays(currentDate, index - 6), "d")
          : format(addDays(currentDate, index - currentDate.getDay() + 1), "d")}
      </div>
    </li>
  );
}

export default CalenderDate;

CalenderDate.propTypes = {
  currentDate: PropTypes.object,
  index: PropTypes.number,
  mutateDate: PropTypes.func,
};
