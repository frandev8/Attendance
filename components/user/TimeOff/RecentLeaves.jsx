import { useQuery } from "@tanstack/react-query";
import { Avatar, DatePicker, Divider, List, Space, Spin } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { getDateDuration } from "../../../utils/date";
import { fetchEmployeesById, fetchTimeOff } from "../../../utils/http";
import styles from "./RecentLeaves.module.css";

function RecentLeaves() {
  const { data: myData, isPending } = useQuery({
    queryKey: ["leave", { type: "recent" }],
    queryFn: () => fetchTimeOff({ approved: true }),
  });

  // let employee;

  // if (myData) {
  //   employee = fetchEmployeesById({ id: myData.userId });
  // }

  let data = [];

  if (myData) {
    data = myData;
    // console.log(myData);
  }

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Space direction="vertical">
      <div className="flex justify-between items-center">
        <span>Who's on leave</span>
        <button className="w-[180px]">
          {" "}
          <Link to="timeOff"> See More</Link>
        </button>
      </div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div className="flex justify-between items-center">
        <div>
          On Leave: <span> 2</span>
        </div>
        <div>
          <DatePicker onChange={onChange} />
        </div>
      </div>
      <div>
        {isPending && <Spin />}
        <List
          itemLayout="horizontal"
          className={`${styles["main"]}  `}
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={<>Hi</>}
                description={
                  <div>
                    {/* {getDateDuration(item?.startDate)} <span>{item?.type}</span> */}
                    <span>wow</span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </Space>
  );
}

export default RecentLeaves;
