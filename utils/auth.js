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
  document.cookie = `userLogToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie named 'userLogToken'
  document.cookie = `userLogToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/user;`; // Delete the cookie named 'userLogToken'
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
  document.cookie = `adminLogToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie named 'adminLogToken'
  document.cookie = `adminLogToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;`; // Delete the cookie named 'adminLogToken'
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
  expirationTime.setHours(17, 0, 0, 0);

  document.cookie = `clockInToken=${token}; expires=${expirationTime.toUTCString()}`;
};

export function deleteClockInTokenCookie() {
  document.cookie = `clockInToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie named 'token'
  document.cookie = `clockInToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/user;`; // Delete the cookie named 'token'
}

/**
 * @def Clock-out token
 * @param {*} token
 */

export const getClockOutTokenCookie = () => {
  const token = document.cookie.match("(^|;)\\s?clockOutToken=([^;]+)");

  if (!token) {
    return "";
  }

  return token[2];
};

export const saveClockOutTokenCookie = (token) => {
  const expirationTime = new Date();
  expirationTime.setHours(19, 0, 0, 0);

  document.cookie = `clockOutToken=${token}; expires=${expirationTime.toUTCString()}`;
};

export function deleteClockOutTokenCookie() {
  document.cookie = `clockOutToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie named 'token'
  document.cookie = `clockOutToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/user;`; // Delete the cookie named 'token'
}

/**
 * @def Break token
 * @pa  ram {*} token
 */

export const saveBreakTokenCookie = (token) => {
  const expirationTime = new Date();
  console.log("called");
  expirationTime.setHours(15, 0, 0, 0);

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
  console.log("called!, deleting");
  document.cookie = `breakToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie named 'token'
  document.cookie = `breakToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/user;`; // Delete the cookie named 'token'
}

/**
 * @def Overtime token
 * @param {*} token
 */

export const saveOvertimeTokenCookie = (token) => {
  const expirationTime = new Date();

  expirationTime.setHours(19, 0, 0, 0);

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
  document.cookie = `overtimeToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Delete the cookie named 'token'
  document.cookie = `overtimeToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/user;`;

  // Delete the cookie named 'token'
}

/**
 * @def local storage
 * @param {*} token
 */

// * clock in

export const saveClockInTime = (time) => {
  localStorage.setItem("clockInTime", time);

  // Check for a previous timeout and clear it to avoid multiple executions

  const expireDate = new Date();
  expireDate.setHours(0, 0, 0, 0);
  expireDate.setDate(expireDate.getDate() + 1);

  localStorage.setItem("clockInTimeExpireDate", expireDate.toISOString());
};

export const getClockInTime = () => {
  const clockInTime = localStorage.getItem("clockInTime");

  if (clockInTime) {
    const duration = getTokenDuration("clockInTimeExpireDate");

    if (duration < 0) {
      delClockInTimeToken();
      delClockInTimeExpireToken();
      return "";
    } else return clockInTime;
  } else return "";
};

export function delClockInTimeToken() {
  localStorage.removeItem("clockInTime");
}
export function delClockInTimeExpireToken() {
  localStorage.removeItem("clockInTimeExpireDate");
}

//* clock out

export const saveClockOutTime = (time) => {
  localStorage.setItem("clockOutTime", time);

  // Check for a previous timeout and clear it to avoid multiple executions

  const expireDate = new Date();
  expireDate.setHours(0, 0, 0, 0);
  expireDate.setDate(expireDate.getDate() + 1);

  localStorage.setItem("clockOutTimeExpireDate", expireDate.toISOString());
};

export const getClockOutTime = () => {
  const clockOutTime = localStorage.getItem("clockOutTime");

  if (clockOutTime) {
    const duration = getTokenDuration("clockOutTimeExpireDate");

    if (duration < 0) {
      delClockOutTimeToken();
      delClockInTimeExpireToken();
      return "";
    } else return clockOutTime;
  } else return "";
};

export function delClockOutTimeToken() {
  localStorage.removeItem("clockOutTime");
}
export function delClockOutTimeExpireToken() {
  localStorage.removeItem("clockOutTimeExpireDate");
}

// * break

export const saveBreakTime = (time) => {
  localStorage.setItem("breakTime", time);
  // Check for a previous timeout and clear it to avoid multiple executions

  const expireDate = new Date();
  expireDate.setHours(0, 0, 0, 0);
  expireDate.setDate(expireDate.getDate() + 1);

  localStorage.setItem("breakTimeExpireDate", expireDate.toISOString());
};

export const getBreakTime = () => {
  const breakTime = localStorage.getItem("breakTime");

  if (breakTime) {
    const duration = getTokenDuration("breakTimeExpireDate");

    if (duration < 0) {
      delBreakTimeToken();
      delBreakTimeExpireToken();
      return "";
    } else return breakTime;
  } else return "";
};

export function delBreakTimeToken() {
  localStorage.removeItem("breakTime");
}
export function delBreakTimeExpireToken() {
  localStorage.removeItem("breakTimeExpireDate");
}

// * token duration
export const getTokenDuration = (tokenName) => {
  const storedExpirationDate = localStorage.getItem(tokenName);
  const expirationDate = new Date(storedExpirationDate);

  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();

  return duration;
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
    return redirect("/auth");
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
