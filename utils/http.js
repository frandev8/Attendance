import { QueryClient } from "@tanstack/react-query";
import {
  getAdminLoginToken,
  getBreakTokenCookie,
  getClockInTokenCookie,
  getClockOutTokenCookie,
  getOvertimeTokenCookie,
  getUserLoginToken,
} from "./auth";
import canClockIn from "./verifyClockIns";

export const queryClient = new QueryClient();

/**
 * @desc utility http
 *
 */
export async function logIn({ formData }) {
  const role = formData.role;

  if (role === "employee") {
    return await logInEmployee({ formData });
  } else if (role === "admin") {
    return await logInAdmin({ formData });
  }
}
export function register({ formData }) {
  const role = formData.role;
  if (role === "employee") {
    return registerEmployee({ formData });
  } else if (role === "admin") {
    return registerAdmin({ formData });
  }
}

export async function checkSignUpCredentials({ formData }) {
  const role = formData.role;

  if (role === "employee") {
    return await checkEmployeeDuplicate({ formData });
  } else if (role === "admin") {
    return await checkAdminDuplicate({ formData });
  }
}

/**
 * @desc employee http
 *
 */

export async function fetchEmployees() {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee";

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the employee");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchEmployeesById({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/" + id;

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the employee");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function logInEmployee({ formData }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const results = await response.json();

    const error = new Error(results.msg);
    error.code = response.status;
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function registerEmployee({ formData }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const response = await fetch(`${serverURL}/employee/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while registering employee");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function employeeRegisterVerify({ id, token, pin }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const response = await fetch(
    `${serverURL}/employee/register/verify/${id}/${token}/${pin}`
  );

  if (!response.ok) {
    const error = new Error(
      "An error occurred while activating employee account"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function checkEmployeeDuplicate({ formData }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/register/duplicate";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred while checking for employee duplication"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function changeEmployeePassword({ formData, id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/password/" + id;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData }),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while changing your password");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function mutateEmployeePersonalDetails({
  formData,
  id,
  mutatedFields,
}) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/personal/" + id;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData, mutatedFields }),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred while changing employee personal details"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

/**
 * @desc admin http
 *
 */
export async function logInAdmin({ formData }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while logging admin in");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function registerAdmin({ formData }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const response = await fetch(`${serverURL}/admin/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while registering admin");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();
  return results;
}

export async function adminRegisterVerify({ id, token, pin }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const response = await fetch(
    `${serverURL}/admin/register/verify/${id}/${token}/${pin}`
  );

  if (!response.ok) {
    const error = new Error(
      "An error occurred while activating admin account "
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function checkAdminDuplicate({ formData }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/register/duplicate";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred while checking for admin duplication"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchAdminById({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/" + id;

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the admin");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function changeAdminPassword({ formData, id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/password/" + id;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData }),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while changing your password");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const results = await response.json();

  return results;
}

export async function mutateAdminPersonalDetails({
  formData,
  id,
  mutatedFields,
}) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/personal/" + id;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData, mutatedFields }),
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred while changing admin personal details"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function toggleEmployeeActiveness({ id, action }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/toggle-activeness/" + id;

  if (action === "deactivate") {
    url += "?action=deactivate";
  } else if (action === "activate") {
    url += "?action=activate";
  }

  const response = await fetch(url, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred while activating/deactivating employee"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function deleteEmployee({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/" + id;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting employee");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

/**
 * @desc attendance http
 *
 */

export async function fetchAttendanceSummary({
  late,
  onTime,
  earlyDeparture,
  absent,
}) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/attendanceSummary";

  if (late) {
    url += "/" + "?late=true";
  }
  if (onTime) {
    url += "/" + "?onTime=true";
  }
  if (earlyDeparture) {
    url += "/" + "?earlyDeparture=true";
  }
  if (absent) {
    url += "/" + "?absent=true";
  }

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the attendance");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchAttendance({ pending }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/attendance";

  if (pending) {
    url += "/" + "?pending=true";
  }

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the employee");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchAttendanceById({ approved, id, rejected }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/attendance/" + id;

  if (approved) {
    url += "?approved=true";
  }

  if (rejected) {
    url += "?rejected=true";
  }

  // if (pending) {
  //   url +=  "?pending=true";
  // }

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the employee");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchBreakAttendance({ id, currentDate }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url =
    serverURL +
    "/employee/attendance/break/" +
    id +
    `?date=${currentDate.toISOString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the break attendance"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchAutoClockOutAttendance({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;
  let url = serverURL + "/employee/attendance/auto/clock-out/" + id;

  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the auto clock out attendance"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();
  return results;
}
export async function fetchAutoEndBreakAttendance({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;
  let url = serverURL + "/employee/attendance/auto/break/" + id;

  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the auto break attendance"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();
  return results;
}
export async function fetchAutoEndOvertimeAttendance({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;
  let url = serverURL + "/employee/attendance/auto/overtime/" + id;

  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the auto overtime attendance"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();
  return results;
}

export async function fetchOvertimeAttendance({ id, currentDate }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url =
    serverURL +
    "/employee/attendance/overtime/" +
    id +
    `?date=${currentDate.toISOString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the overtime attendance"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchAttendanceByDate({ id, date }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/attendance/date/" + id;

  if (date) {
    url += `?match=${date.toISOString()}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + getClockInTokenCookie(),
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the attendance");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchClockInAttendance({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/attendance/clock-in/" + id;

  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + getClockInTokenCookie(),
    },
  });

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the clock-in attendance"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchClockOutAttendance({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/attendance/clock-out/" + id;

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the employee");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function endorseAttendance({
  isValid,
  attendanceId,
  adminId,
  userId,
}) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const loginToken = getAdminLoginToken();

  let url = serverURL + "/admin/attendance/endorse";

  if (isValid) {
    url += "?action=accept";
  } else {
    url += "?action=decline";
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + loginToken[2],
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attendanceId,
      adminId,
      userId,
    }),
  });

  if (!response.ok) {
    const error = new Error(
      `An error occurred while ${
        isValid ? "confirming" : "rejecting"
      } the attendance`
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function clockIn({ id }) {
  const today = new Date();

  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const res = await fetch(`${serverURL}/employee/${id}`);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching employee");
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const employee = await res.json();

  if (canClockIn(today, employee.lastCheckInDate)) {
    const loginToken = getUserLoginToken();

    const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

    const url = `${serverURL}/employee/attendance/clock-in/${id}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + loginToken,
        "Content-Type": "application/json",
      },
      // credentials: "include",
      body: JSON.stringify({
        clockInTime: today.toISOString(),
      }),
    });

    if (!res.ok) {
      const error = new Error("An error occurred while checking in. Try again");
      error.code = res.status;
      error.info = await res.json();
      throw error;
    }

    const results = await res.json();

    return results;
  }

  return null;
}

export async function clockOut({ id }) {
  const now = new Date();

  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const res = await fetch(`${serverURL}/employee/attendance/clock-out/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + getClockInTokenCookie(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clockOutTime: now.toISOString(),
    }),
  });

  if (!res.ok) {
    const error = new Error("An error occurred while checking out. Try again");
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const results = await res.json();

  return results;
}

/**
 * @desc Notification http
 *
 */
export async function postNotification({ formData, adminId }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/notification";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData, adminId }),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while posting new notification");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchNotification() {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/notification";

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the notifications"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function mutateNotification({ formData, id, adminId }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/notification/" + id;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData, adminId }),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while editing notification");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}
export async function deleteNotification({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/notification/" + id;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting notification");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

/**
 * @desc Announcement http
 *
 */

export async function fetchAnnouncement() {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/announcement";

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the notifications"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function postAnnouncement({ formData }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/announcement/new";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while posting new announcement");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function mutateAnnouncement({ formData, id, adminId }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/announcement/" + id;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData, adminId }),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while editing announcement");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function deleteAnnouncement({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/announcement/" + id;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting announcement");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

/**
 * @desc TimeOff http
 *
 */

export async function postTimeOff({ formData, id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/timeOff/new/" + id;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while requesting leave");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchTimeOff({ approved, pending, filter }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/timeOff";

  if (approved) {
    url += "?accepted=true";
  }

  if (pending) {
    url += "?pending=true";
  }

  if (filter) {
    url += `&filter=${filter}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the timeOff");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function fetchTimeOffById({ id, approved }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/timeOff/" + id;

  if (approved) {
    url += "?status=approved";
  }

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the notifications"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function deleteTimeOff({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/timeOff/" + id;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting leave");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function endorseTimeOff({ isValid, timeOffId, adminId }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const loginToken = getAdminLoginToken();

  let url = serverURL + "/admin/timeOff/endorse";

  if (isValid) {
    url += "?action=accept";
  } else {
    url += "?action=decline";
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + loginToken[2],
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeOffId,
      adminId,
    }),
  });

  if (!response.ok) {
    const error = new Error(
      `An error occurred while ${
        isValid ? "confirming" : "rejecting"
      } the timeOff`
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

/**
 * @desc employee avatar http
 *
 */

export async function getEmployeeAvatar({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/avatar/" + id;

  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(
      "An error occurred while getting avatar. Try again"
    );
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const results = await res.json();
  return results;
}
export async function upLoadEmployeeAvatar({ id, imgUrl }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/avatar/" + id;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imgUrlBase64: imgUrl, id }),
  });

  if (!response.ok) {
    // Handle errors here
    const error = new Error("An error occurred while saving avatar");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

/**
 * @desc admin avatar http
 *
 */
export async function getAdminAvatar({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/avatar/" + id;

  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(
      "An error occurred while getting avatar. Try again"
    );
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const results = await res.json();
  return results;
}

export async function upLoadAdminAvatar({ id, imgUrl }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/avatar/" + id;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imgUrlBase64: imgUrl }),
  });

  if (!response.ok) {
    // Handle errors here
    const error = new Error("An error occurred while saving avatar");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

/**
 * @desc user break http
 *
 */
export async function mutateBreak({ id, action, breakTime }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/attendance/break/" + id;

  if (action === "start") {
    url += "?mode=start";
  } else if (action === "end") {
    url += "?mode=end";
  }

  const token = getClockInTokenCookie() + "/" + getBreakTokenCookie();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ breakTime }),
  });

  if (!response.ok) {
    // Handle errors here
    const error = new Error("An error occurred while performing break actions");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

/**
 * @desc user overtime http
 *
 */

export async function mutateOvertime({ id, action, overtimeTime }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/attendance/overtime/" + id;

  if (action === "start") {
    url += "?mode=start";
  } else if (action === "end") {
    url += "?mode=end";
  }

  const token = getClockOutTokenCookie() + "/" + getOvertimeTokenCookie();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ overtimeTime }),
  });

  if (!response.ok) {
    // Handle errors here
    const error = new Error(
      "An error occurred while performing overtime actions"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const results = await response.json();

  return results;
}

export async function getPageBanner({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/media/banner" + id;

  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(
      "An error occurred while getting page banner. Try again"
    );
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const results = await res.json();
  return results;
}

export async function getMediaLogo({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/media/logo" + id;

  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(
      "An error occurred while getting page banner. Try again"
    );
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const results = await res.json();
  return results;
}
