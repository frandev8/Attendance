import { Container } from "@mui/material";
import { Tabs } from "antd";
import React from "react";
import { fetchAdminById } from "../../../utils/http";
import AccountSettings from "./AccountSettings";
import Announcement from "./AnnouncementSettings";
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
  {
    key: "3",
    label: "Notification",
    children: <Announcement />,
  },
];
const AdminSettingsPage = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor: "#F1F2F6" }}>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </Container>
);

export async function loader({ id }) {
  if ("geolocation" in navigator) {
    // console.log("available");
  } else {
    /* geolocation IS NOT available */
    // console.log("not available");
  }

  console.log("hey");
  const avatar = await fetchAdminById({ id });

  return avatar;
}
export default AdminSettingsPage;
