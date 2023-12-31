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
import { fetchTimeOff } from "../../../utils/http";
import Accept from "./Accept";
import ClockIn from "./ClockIn";
import ClockOut from "./ClockOut";
import Reject from "./Reject";
import SortTimeOff from "./SortTimeOff";
import styles from "./TimeOff.module.css";
const { Meta } = Card;

const TimeOff = () => {
  const { data, isPending } = useQuery({
    queryKey: ["timeOff", { type: "pending" }],
    queryFn: () => fetchTimeOff({ pending: true }),
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
            data.map((items, id) => {
              return (
                <Card
                  style={{
                    width: "100%",
                    marginTop: 16,
                  }}
                  actions={[
                    <ClockIn key={"start"} />,
                    <ClockOut key={"end"} />,
                    <Accept
                      key="Start"
                      timeOffId={items._id}
                      adminId={adminId}
                    />,
                    <Reject
                      key="End"
                      timeOffId={items._id}
                      adminId={adminId}
                    />,
                  ]}
                  key={id}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                    }
                    title={items.username}
                    description={<b>2nd Jan 2023</b>}
                  />
                </Card>
              );
            })}
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
