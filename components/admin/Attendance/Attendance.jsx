import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, Spin } from "antd";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchAttendance } from "../../../utils/http";
import Accept from "./Accept";
import styles from "./Attendance.module.css";
import ClockIn from "./ClockIn";
import ClockOut from "./ClockOut";
import Reject from "./Reject";
import SortAttendance from "./SortAttendance";

const { Meta } = Card;
const Attendance = () => {
  const { data, isPending } = useQuery({
    queryKey: ["attendance", { type: "pending" }],
    queryFn: () => fetchAttendance({ pending: true }),
  });

  const adminId = useSelector((state) => {
    return state.admin.adminId;
  });

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
                  <Accept
                    key="accept"
                    attendanceId={items._id}
                    userId={items.userId}
                    adminId={adminId}
                  />,
                  <Reject
                    key="reject"
                    attendanceId={items._id}
                    userId={items.userId}
                    adminId={adminId}
                  />,
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
          <SortAttendance />
          {/* </Container> */}
        </div>
      </div>
    </div>
  );
};
export default Attendance;
