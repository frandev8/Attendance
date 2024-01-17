import { Container } from "@mui/material";
import { Tabs } from "antd";
import React from "react";
import { fetchEmployeesById } from "../../../utils/http";
import AccountSettings from "./AccountSettings";
import PasswordSettings from "./PasswordSettings";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Home",
    children: <AccountSettings />,
  },
  {
    key: "2",
    label: "Security",
    children: <PasswordSettings />,
  },
];
const UserSettingsPage = () => {
  if ("geolocation" in navigator) {
    console.log("available");
  } else {
    /* geolocation IS NOT available */
    console.log("not available");
  }

  console.log("hey");
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor: "#F1F2F6" }}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Container>
  );
};

export async function loader({ id }) {
  const avatar = await fetchEmployeesById({ id });

  return avatar;
}

export default UserSettingsPage;
