import { addDays, format } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { areDatesEqual, setDateOnly } from "../../../utils/date";
import styles from "./CalenderDate.module.css";

function CalenderDate({
  currentDate,
  index,
  mutateDate,
  selectDate,
  selectedDate,
}) {
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

  const selected =
    selectedDate ===
    (currentDate.getDay() === 0
      ? addDays(currentDate, index - 6).getDate()
      : addDays(currentDate, index - currentDate.getDay() + 1).getDate());

  const isToday = match ? "today" : "";
  const isSelected = selected ? "select" : "";

  const onHandleDateClick = (e) => {
    mutateDate({ id: userId, date: modifiedCalenderDate });

    selectDate(parseInt(e.target.innerHTML));
    // console.dir(parseInt(e.target.innerHTML));
  };

  return (
    <li>
      <div
        className={`${styles[isSelected]} ${styles[isToday]}   tw-w-[30px] tw-h-[30px] tw-text-center tw-p-1 hover:tw-cursor-pointer`}
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
  selectedDate: PropTypes.number,
  selectDate: PropTypes.func,
};
