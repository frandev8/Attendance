import moment from "moment";

export const getDateDuration = function (date) {
  const originalTime = moment(date);

  //calculate duration from now
  const duration = moment.duration(moment().diff(originalTime));

  // Define a threshold (e.g., 1 week)
  const threshold = moment.duration(1, "weeks");

  // Format the date based on the duration
  const formattedDate =
    duration < threshold
      ? duration.humanize() + " ago" // Show relative time (e.g., "2 minutes ago")
      : originalTime.format("MMM D, YYYY [at] h:mm A"); // Show absolute time after 1 week

  return formattedDate;
};

export const calculateDaysBetween = function (startDate, endDate) {
  const parsedStartDate = moment(startDate);
  const parsedEndDate = moment(endDate);

  // Get the difference in days, ensuring a positive value
  const daysDifference = parsedEndDate.diff(parsedStartDate, "days");

  return daysDifference;
};

export const formatLeaveDates = function (startDate, endDate) {
  const parsedStartDate = moment(startDate);
  const parsedEndDate = moment(endDate);

  // Format dates with month names using 'MMM' format
  const formattedStartDate = parsedStartDate.format("MMM DD");
  const formattedEndDate = parsedEndDate.format("MMM DD");

  // Combine formatted dates with a hyphen
  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;

  return formattedDateRange;
};

export const formatAttendanceDates = function (date) {
  const momentDate = moment(date);
  return momentDate.format("YYYY-MM-DD");
};

export const setDateOnly = function (date, newDate) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Create a new Date object with the desired date, year, and month
  const modifiedDate = new Date(year, month, newDate);

  // Return the modified Date object
  return modifiedDate;
};

export const areDatesEqual = function (date1, date2) {
  // Create Moment objects from the input dates
  const momentDate1 = moment(date1);
  const momentDate2 = moment(date2);

  // Compare only the year, month, and day using 'isSame'
  return momentDate1.isSame(momentDate2, "day");
};

export const formatAttendanceDateTitle = function (date) {
  const momentDate = moment(date);

  // Extract and return the full month name
  return momentDate.format("MMMM YYYY");
};

export const formatTodayDate = function () {
  const momentDate = moment(new Date());

  // Extract and return the full month name
  return momentDate.format("Do MMMM YYYY");
};

export const formatTimeOffDate = function (date) {
  const momentDate = moment(date);

  // Extract and return the full month name
  return momentDate.format("MMM D, YYYY");
};

export const formatDateRange = function (startDate, endDate) {
  const formattedStartDate = moment(startDate).format("Do MMM");
  const formattedEndDate = moment(endDate).format("Do MMM");

  return `${formattedStartDate} - ${formattedEndDate}`;
};

export const formatAttendanceDate = function (date) {
  const momentDate = moment(date);

  // Extract and return the full month name
  return momentDate.format("Do MMMM YYYY");
};

export const formatAttendanceTime = function (dateTime) {
  const momentDateTime = moment(dateTime);
  return momentDateTime.format("hh:mm a");
};

export const calculateTimeBetween = function (startDate, endDate) {
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));

  if (duration.asSeconds() < 60) {
    return `${Math.floor(duration.asSeconds())} sec`;
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())} mins`;
  } else {
    return `${Math.floor(duration.asHours())} hrs`;
  }
};

export const calculateHoursBetween = function (startDate, endDate) {
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));

  return duration.asHours().toFixed(2);
};

export const toDayBreakHourPair = function (originalData) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const transformedData = [];

  // Create an object for each day of the week, initialized with null breakStartTime
  daysOfWeek.forEach((day) => {
    transformedData.push({ name: day, hours: 0 });
  });

  // Fill in the breakStartTimes from the original data
  originalData.forEach((item) => {
    const dayIndex = daysOfWeek.indexOf(getDayName(item.clockInTime));
    if (dayIndex !== -1) {
      transformedData[dayIndex].hours = calculateHoursBetween(
        item.breakStartTime,
        item.breakEndTime
      );
    }
  });

  return transformedData;
};

export const toDayOvertimeHourPair = function (originalData) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const transformedData = [];

  // Create an object for each day of the week, initialized with null breakStartTime
  daysOfWeek.forEach((day) => {
    transformedData.push({ name: day, hours: 0 });
  });

  // Fill in the breakStartTimes from the original data
  originalData.forEach((item) => {
    const dayIndex = daysOfWeek.indexOf(getDayName(item.clockInTime));
    if (dayIndex !== -1) {
      transformedData[dayIndex].hours = calculateHoursBetween(
        item.overtimeStartTime,
        item.overtimeEndTime
      );
    }
  });

  return transformedData;
};

// Helper function to get the day name from a Date object
function getDayName(date) {
  return moment(date).format("ddd");
}

export const filterDateByRange = function (
  data,
  targetDate,
  startField = "startDate",
  endField = "endDate"
) {
  const targetDateMoment = moment(targetDate);

  return data.filter((item) => {
    const startDateMoment = moment(item[startField]);
    const endDateMoment = moment(item[endField]);

    // Check if the target date falls within the closed range (inclusive of both ends)
    return targetDateMoment.isBetween(
      startDateMoment,
      endDateMoment,
      null,
      "[]"
    );
  });
};


export const filterByDate = function (
  data,
  targetDates, // Array of target dates
  startField = "startDate"
) {
  return data.filter((item) => {
    const itemStartDateMoment = moment(item[startField]);

    if (targetDates.length === 1) {
      const targetDateMoment = moment(targetDates[0]);
      return itemStartDateMoment.isSame(targetDateMoment); // Exact match for single target date
    } else if (targetDates.length === 2) {
      const startDateMoment = moment(targetDates[0]);
      const endDateMoment = moment(targetDates[1]);
      return itemStartDateMoment.isBetween(startDateMoment, endDateMoment, null, "[]"); // Range match for two target dates
    } else {
      return false; // Handle invalid targetDates length
    }
  });
};

export const getDurationBetweenDates = function (startDate, endDate) {
  // Parse the input dates using moment
  const startMoment = moment(startDate, "YYYY-MM-DD HH:mm:ss");
  const endMoment = moment(endDate, "YYYY-MM-DD HH:mm:ss");

  // Calculate the duration in milliseconds
  const durationInMillis = endMoment.diff(startMoment);

  // Convert milliseconds to moment duration
  const duration = moment.duration(durationInMillis);

  // Format the duration as "hh:mm:ss"
  const formattedDuration = moment.utc(durationInMillis).format("HH:mm:ss");

  return formattedDuration;
};
