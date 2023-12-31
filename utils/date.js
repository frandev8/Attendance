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
