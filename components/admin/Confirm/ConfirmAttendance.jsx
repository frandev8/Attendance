import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Container } from "@mui/material";
import { Avatar, Card } from "antd";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Accept from "./Accept";
import ClockIn from "./ClockIn";
import ClockOut from "./ClockOut";
import styles from "./ConfirmAttendance.module.css";
import Reject from "./Reject";
import SortConfirm from "./SortConfirm";
const { Meta } = Card;
const ConfirmAttendance = () => {
  const [data, setData] = useState([]);

  const token = document.cookie.match("(^|;)\\s?adminLogToken=([^;]+)");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  async function fetchData() {
    const userId = "654acbf48626cf74c1d45549";

    const response = await fetch(
      `http://localhost:3000/admin/confirm-attendance/pending`
    );

    if (!response.ok) {
      return;
    }

    const attendance = await response.json();

    setData(() => {
      const newData = [];

      for (let i = 1; i <= attendance.length; i++) {
        newData.push({
          key: i,
          name: `Edward King ${i}`,
          age: 32,
          address: `London, Park Lane no. ${i}`,
        });
      }

      return newData;
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.item1}>
        <Container maxWidth="lg" sx={{ mb: 4, border: "2px solid blue" }}>
          {data.map((items, id) => (
            <Card
              style={{
                width: "100%",
                marginTop: 16,
              }}
              actions={[
                <ClockIn key={"clockIn"} />,
                <ClockOut key={"clockOut"} />,
                <Accept key="accept" refreshAttendanceList={fetchData} />,
                <Reject key="reject" refreshAttendanceList={fetchData} />,
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
          <SortConfirm />
          {/* </Container> */}
        </div>
      </div>
    </div>
  );
};
export default ConfirmAttendance;
