import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

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

/**
 * @desc attendance http
 *
 */

export async function fetchAttendance({ pending }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee";

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

export async function postTimeOff({ formData }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/timeOff/new";

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
    url += "/" + "?approved=true";
  }

  if (pending) {
    url += "/" + "?pending=true";
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

export async function fetchTimeOffById({ id }) {
  const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

  let url = serverURL + "/employee/timeOff/:" + id;

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
