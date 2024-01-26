import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, DatePicker, Divider, List, Space, Spin } from "antd";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { filterDateByRange, getDateDuration } from "../../../utils/date";
import { fetchEmployeesById, fetchTimeOff } from "../../../utils/http";
import styles from "./RecentLeaves.module.css";

function RecentLeaves({ enableMore }) {
  const filteredLeavesRef = useRef([]);
  const [searchDate, setSearchDate] = useState("");
  const [triggerRerender, setTriggerRerender] = useState(false);

  const { data: myData, isPending } = useQuery({
    queryKey: ["leave", { type: "recent" }],
    queryFn: () => fetchTimeOff({ approved: true }),
  });

  useEffect(() => {
    if (myData) {
      filteredLeavesRef.current = filterDateByRange(
        myData,
        new Date(),
        "startDate",
        "endDate"
      );
    }
  }, [myData]);

  useEffect(() => {
    if (myData && searchDate) {
      filteredLeavesRef.current = filterDateByRange(
        myData,
        searchDate,
        "startDate",
        "endDate"
      );

      setTriggerRerender((prevRerender) => !prevRerender);
    }
  }, [myData, searchDate]);

  const onChange = (date, dateString) => {
    setSearchDate(dateString);
  };

  return (
    <Space direction="vertical">
      <div className="tw-flex tw-justify-between tw-items-center">
        <span>Who's on leave</span>

        <Button
          htmlType="submit"
          className="tw-w-[100px]"
          disabled={!enableMore}
        >
          <Link to="timeOff"> See More</Link>
        </Button>
      </div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div className="tw-flex tw-justify-between tw-items-center">
        <div>
          On Leave: <span> {filteredLeavesRef.current.length}</span>
        </div>
        <div className="max-[540px]-tw-w-[45%]">
          <DatePicker onChange={onChange} />
        </div>
      </div>
      <div>
        {isPending && <Spin />}

        <List
          itemLayout="horizontal"
          className={`${styles["main"]}  `}
          dataSource={filteredLeavesRef.current}
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

RecentLeaves.propTypes = {
  enableMore: PropTypes.bool,
};
