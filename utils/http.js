import { QueryClient } from "@tanstack/react-query";
import {
  getAdminLoginToken,
  getClockInTokenCookie,
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

  // console.log("detecting role, checking signup", formData);

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

export async function fetchEmployees({ active }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee";

  if (active) {
    url += "/" + "?active=true";
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
    const error = new Error("An error occurred while logging employee in");
    error.code = response.status;
    error.info = await response.json();
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

export async function checkEmployeeDuplicate({ formData }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/register/duplicate";

  console.log(formData, "checking ...");

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
  console.log("successful, checking");
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
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while changing your password");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  console.log("successful pass update");
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

  let url = serverURL + "/employee/admin/" + id;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while changing your password");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  console.log("successful pass update");
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
    url += "/" + "?approved=true";
  }

  if (rejected) {
    url += "/" + "?rejected=true";
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

  if (!canClockIn(today, employee.lastCheckInDate)) {
    const loginToken = getUserLoginToken();

    const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

    const url = `${serverURL}/employee/attendance/clock-in/${id}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + loginToken[2],
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

    console.log("results", results);

    return results;
  }

  return null;
}

export async function clockOut({ id }) {
  const now = new Date();

  const clockInToken = document.cookie.match("(^|;)\\s?clockInToken=([^;]+)");
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const res = await fetch(`${serverURL}/employee/attendance/clock-out/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + clockInToken[2],
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
export async function postNotification({ formData }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/admin/notification/new";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
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

export async function fetchTimeOff({ approved, pending }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/timeOff";

  if (approved) {
    url += "/" + "?accepted=true";
  }

  if (pending) {
    url += "?pending=true";
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

  console.log(results);
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

export async function endorseTimeOff({ isValid, timeOffId, adminId }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const loginToken = getAdminLoginToken();

  let url = serverURL + "/admin/timeOff/endorse";

  if (isValid) {
    url += "?action=accept";
  } else {
    url += "?action=decline";
  }

  console.log(url);

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

export async function mutateBreak({ id, action }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const breakTime = new Date();

  let url = serverURL + "/employee/attendance/break/" + id;

  if (action === "start") {
    url += "?mode=start";
  } else if (action === "end") {
    url += "?mode=end";
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getClockInTokenCookie(),
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
 * @desc user break http
 *
 */

export async function mutateOvertime({ id, action }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const overtimeTime = new Date();

  let url = serverURL + "/employee/attendance/overtime/" + id;

  if (action === "start") {
    url += "?mode=start";
  } else if (action === "end") {
    url += "?mode=end";
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getClockInTokenCookie(),
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
