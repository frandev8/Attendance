import { Container } from "@mui/material";
import { Tabs } from "antd";
import React from "react";
import { fetchEmployeesById, queryClient } from "../../../utils/http";
import AccountSettings from "./AccountSettings";
import PasswordSettings from "./PasswordSettings2";

const onChange = (key) => {};
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
    // console.log("available");
  } else {
    /* geolocation IS NOT available */
    // console.log("not available");
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, backgroundColor: "#F1F2F6" }}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Container>
  );
};

export async function loader({ id }) {
  return queryClient.fetchQuery({
    queryKey: ["employee", { details: "personal" }],
    queryFn: () => fetchEmployeesById({ id }),
  });
}

export default UserSettingsPage;
