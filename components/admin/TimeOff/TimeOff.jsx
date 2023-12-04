import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, Spin } from "antd";
import { Navigate } from "react-router-dom";
import { fetchTimeOff } from "../../../utils/http";
import Accept from "./Accept";
import ClockIn from "./ClockIn";
import ClockOut from "./ClockOut";
import Reject from "./Reject";
import SortTimeOff from "./SortTimeOff";
import styles from "./TimeOff.module.css";
const { Meta } = Card;

const TimeOff = () => {
  const token = document.cookie.match("(^|;)\\s?adminLogToken=([^;]+)");

  const { data, isPending } = useQuery({
    queryKey: ["timeOff", { type: "pending" }],
    queryFn: () => fetchTimeOff({ pending: true }),
  });

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.item1}>
        <Container maxWidth="lg" sx={{ mb: 4, border: "2px solid blue" }}>
          {isPending && <Spin />}
          {data &&
            data.map((items, id) => (
              <Card
                style={{
                  width: "100%",
                  marginTop: 16,
                }}
                actions={[
                  <ClockIn key={"clockIn"} />,
                  <ClockOut key={"clockOut"} />,
                  <Accept key="accept" refreshAttendanceList={() => {}} />,
                  <Reject key="reject" refreshAttendanceList={() => {}} />,
                ]}
                key={id}
              >
                <Meta
                  avatar={
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                  }
                  title="Card title"
                  description={<b>2nd Jan 2023</b>}
                />
              </Card>
            ))}
        </Container>
      </div>
      <div className={styles.item2}>
        <div className={styles.item2Child}>
          {/* <Container maxWidth="md" sx={{ mb: 4, border: "2px solid black" }}> */}
          <SortTimeOff />
          {/* </Container> */}
        </div>
      </div>
    </div>
  );
};
export default TimeOff;
