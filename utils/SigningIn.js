import { json } from "react-router-dom";

export const land = async (role = "employee", data) => {
  
  const response = await fetch(`${serverURL}/${role}/login`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};
export const create = async (role, data) => {


  const response = await fetch(`${serverURL}/${role}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });


  return response;
};
