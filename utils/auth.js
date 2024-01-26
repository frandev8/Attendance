import { redirect } from "react-router-dom";

/**
 * @def user log token
 * @param {*} token
 */

export const getUserLoginToken = () => {
  const token = document.cookie.match("(^|;)\\s?userLogToken=([^;]+)");

  if (!token) {
    return "";
  }

  return token[2];
};

export const setUserLoginToken = (token) => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 6);

  document.cookie = `userLogToken=${token}; expires=${expirationDate.toUTCString()}`;
};

export function deleteUserLoginToken() {
  document.cookie = `userLogToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie named 'token'
}

/**
 * @def admin log token
 * @param {*} token
 */
export const getAdminLoginToken = () => {
  const token = document.cookie.match("(^|;)\\s?adminLogToken=([^;]+)");

  if (!token) {
    return "";
  }

  return token[2];
};

export const setAdminLoginToken = (token) => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 6);

  document.cookie = `adminLogToken=${token}; expires=${expirationDate.toUTCString()}`;
};

export function deleteAdminLoginToken() {
  document.cookie = `adminLogToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie named 'token'
}

/**
 * @def Clock-in token
 * @param {*} token
 */

export const getClockInTokenCookie = () => {
  const token = document.cookie.match("(^|;)\\s?clockInToken=([^;]+)");

  if (!token) {
    return "";
  }

  return token[2];
};

export const saveClockInTokenCookie = (token) => {
  const expirationTime = new Date();
  expirationTime.setHours(23, 40, 0, 0);

  document.cookie = `clockInToken=${token}; expires=${expirationTime.toUTCString()}`;
};

export function deleteClockInTokenCookie() {
  document.cookie = `clockInToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie named 'token'
  document.cookie = `clockInToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/user;`; // Delete the cookie named 'token'
}

/**
 * @def Break token
 * @param {*} token
 */

export const saveBreakTokenCookie = (token) => {
  const expirationTime = new Date();

  expirationTime.setHours(23, 30, 0, 0);

  document.cookie = `breakToken=${token}; expires=${expirationTime.toUTCString()}`;
};

export const getBreakTokenCookie = () => {
  const token = document.cookie.match("(^|;)\\s?breakToken=([^;]+)");

  if (!token) {
    return "";
  }

  return token[2];
};

export function deleteBreakTokenCookie() {
  document.cookie = `breakToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/user;`; // Delete the cookie named 'token'
}

/**
 * @def Overtime token
 * @param {*} token
 */

export const saveOvertimeTokenCookie = (token) => {
  const expirationTime = new Date();

  expirationTime.setHours(24, 50, 0, 0);

  document.cookie = `overtimeToken=${token}; expires=${expirationTime.toUTCString()}`;
};

export const getOvertimeTokenCookie = () => {
  const token = document.cookie.match("(^|;)\\s?overtimeToken=([^;]+)");
  if (!token) {
    return "";
  }

  return token[2];
};

export function deleteOvertimeTokenCookie() {
  document.cookie = `overtimeToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/user;`; // Delete the cookie named 'token'
}

/**
 * @def local storage
 * @param {*} token
 */

export const saveClockInTime = (time) => {
  localStorage.setItem("clockInTime", time);

  // Check for a previous timeout and clear it to avoid multiple executions
  clearTimeout(removeTokenTimeout);

  const nextMidnight = new Date();
  nextMidnight.setHours(0, 0, 0, 0);
  nextMidnight.setDate(nextMidnight.getDate() + 1);

  const millisecondsTilMidnight = nextMidnight - new Date();

  const removeTokenTimeout = setTimeout(() => {
    localStorage.removeItem("clockInTime");
  }, millisecondsTilMidnight);
};

export const getClockInTime = () => {
  return localStorage.getItem("clockInTime");
};

export const saveClockOutTime = (time) => {
  localStorage.setItem("clockOutTime", time);
  // Check for a previous timeout and clear it to avoid multiple executions
  clearTimeout(removeTokenTimeout);

  const nextMidnight = new Date();
  nextMidnight.setHours(0, 0, 0, 0);
  nextMidnight.setDate(nextMidnight.getDate() + 1);

  const millisecondsTilMidnight = nextMidnight - new Date();

  const removeTokenTimeout = setTimeout(() => {
    localStorage.removeItem("clockOutTime");
  }, millisecondsTilMidnight);
};

export const getClockOutTime = () => {
  return localStorage.getItem("clockOutTime");
};

export const saveBreakTime = (time) => {
  localStorage.setItem("breakTime", time);
  // Check for a previous timeout and clear it to avoid multiple executions
  clearTimeout(removeTokenTimeout);

  const nextMidnight = new Date();
  nextMidnight.setHours(0, 0, 0, 0);
  nextMidnight.setDate(nextMidnight.getDate() + 1);

  const millisecondsTilMidnight = nextMidnight - new Date();

  const removeTokenTimeout = setTimeout(() => {
    localStorage.removeItem("breakTime");
  }, millisecondsTilMidnight);
};

export const getBreakTime = () => {
  return localStorage.getItem("breakTime");
};

export const saveUserId = (userId) => {
  localStorage.setItem("userId", userId);
};

export const getUserId = () => {
  return localStorage.getItem("userId");
};

export const deleteUserId = () => {
  localStorage.removeItem("userId");
};

export const saveAdminId = (userId) => {
  localStorage.setItem("adminId", userId);
};

export const saveSignUpPersonal = (values) => {
  localStorage.setItem("personal", JSON.stringify(values));
};

export const getSignUpPersonal = () => {
  return localStorage.getItem("personal");
};

export const getAdminId = () => {
  return localStorage.getItem("adminId");
};

export const deleteAdminId = () => {
  localStorage.removeItem("adminId");
};

export function userTokenLoader() {
  return getUserLoginToken();
}

export function adminTokenLoader() {
  return getAdminLoginToken();
}

export function checkUserLoginTokenLoader() {
  const token = getUserLoginToken();

  if (!token) {
    return redirect("/");
  }
  return null;
}

export function checkAdminLoginTokenLoader() {
  const token = getAdminLoginToken();

  if (!token) {
    return redirect("/");
  }
  return null;
}
