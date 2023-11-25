import { json } from "react-router-dom";

export const land = async (role = "employee", data) => {
  const response = await fetch(`http://localhost:300/${role}/login`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};
export const create = async (role, data) => {
  const response = await fetch(`http://localhost:3000/${role}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });


  return response;
};
