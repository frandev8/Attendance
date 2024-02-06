import { capitalizeFirstLetter } from "@/utils/typography";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  DatePicker,
  Divider,
  Empty,
  List,
  Space,
  Spin,
} from "antd";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  calculateDaysBetween,
  filterDateByRange,
  formatDateRange,
  getDateDuration,
} from "../../../utils/date";
import {
  fetchEmployeesById,
  fetchTimeOff,
  queryClient,
} from "../../../utils/http";
import styles from "./RecentLeaves.module.css";

const RecentLeaves = ({ enableMore }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["query", selectedDate],
    queryFn: () => fetchTimeOff({ approved: true, filter: selectedDate }),
  });

  useEffect(() => {
    // Fetch data on component mount with the initial date
    refetch();
  }, []); // Empty dependency array ensures it runs only on mount

  const handleDateChange = (date, dateString) => {
    // Update the selected date and trigger a refetch

    if (date) {
      setSelectedDate(dateString);
      refetch();
    }
  };

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error: Something went wrong!</p>;

  // Render your component using the data fetched from the backend

  return (
    <Space direction="vertical">
      <div className="tw-flex tw-justify-between tw-items-center">
        <span>Who's on leave</span>

        <Button
          htmlType="submit"
          className="tw-w-[100px]"
          danger
          disabled={!enableMore}
        >
          <Link to="timeOff"> See More</Link>
        </Button>
      </div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div className="tw-flex tw-justify-between tw-items-center">
        <div>
          On Leave: <span> {data?.length || 0}</span>
        </div>
        <div className="max-[540px]-tw-w-[45%]">
          <DatePicker onChange={handleDateChange} />
        </div>
      </div>
      <div>
        {/* {isPending && <Spin />}

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
                <div> */}
        {/* {getDateDuration(item?.startDate)} <span>{item?.type}</span> */}
        {/* <span>wow</span>
                </div>
              }
            />
          </List.Item>
        )}
      /> */}

        {isLoading ? (
          <div className="tw-flex tw-justify-center tw-items-center tw-w-full ">
            <Spin />
          </div>
        ) : (
          data?.map((timeOff) => (
            <div
              key={timeOff._doc._id}
              className="tw-py-2 tw-flex tw-justify-between tw-items-center"
            >
              <div>
                <h4 className="tw-text-lg tw-font-semibold">
                  {capitalizeFirstLetter(timeOff.firstname)}
                </h4>
                <p className="tw-text-sm tw-text-gray-500 tw-dark:text-gray-400">
                  {calculateDaysBetween(
                    timeOff._doc.startDate,
                    timeOff._doc.endDate
                  )}{" "}
                  {calculateDaysBetween(
                    timeOff._doc.startDate,
                    timeOff._doc.endDate
                  ) > 1
                    ? " days "
                    : " day "}
                  off
                </p>
              </div>
              <p className="tw-text-sm tw-text-gray-500 tw-dark:text-gray-400">
                {formatDateRange(timeOff._doc.startDate, timeOff._doc.endDate)}
              </p>
            </div>
          ))
        )}

        {(isError || (data && !data?.length)) && (
          <div className="tw-flex tw-justify-center tw-items-center tw-h-[150px] ">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </div>
    </Space>
  );
};

// function fetchData(date) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // Simulate fetching data based on date

//       const data = { date };
//       resolve(data);
//     }, 1000);
//   });
// }

export default RecentLeaves;
