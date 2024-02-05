export const getColorBasedOnStatus = function (status) {
  if (status === "approved" || status === "confirmed") {
    return "#42CB65"; // Color for approved
  } else if (status === "rejected") {
    return "#FF7875"; // Color for rejected
  } else if (status === "pending") {
    return "#FFB62E"; // Color for pending
  } else {
    return "gray"; // Default color for other statuses
  }
};
