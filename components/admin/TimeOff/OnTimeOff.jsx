import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculateDaysBetween,
  filterDateByRange,
  formatDateRange,
} from "@/utils/date";
import { fetchTimeOff } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { DatePicker, Divider, Empty, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import styles from "./OnTimeOff.module.css";

export default function OnLeave() {
  return (
    <div className="tw-sticky tw-top-[90px] tw-z-[1000]">
      <Birthday />
      <RecentLeaves />
    </div>
  );
}

export const Birthday = function () {
  return (
    <Card className="tw-bg-yellow-200 tw-rounded-lg tw-shadow-lg  tw-mb-8">
      <CardHeader>
        <CardTitle className="tw-text-2xl tw-font-bold">
          Employee's Birthday
        </CardTitle>
      </CardHeader>
      <CardContent className="tw-flex tw-items-center tw-justify-between">
        <div className="tw-flex tw-items-center tw-space-x-4">
          <Avatar>
            <AvatarImage alt="Employee Name" src="/placeholder-avatar.jpg" />
            <AvatarFallback>EN</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="tw-text-lg tw-font-semibold">Employee Name</h4>
            <p className="tw-text-sm tw-text-gray-500 tw-dark:text-gray-400">
              Happy Birthday!
            </p>
          </div>
        </div>
        <Button
          className="bg-[#5295E3] text-white tw-w-max"
          style={{ backgroundColor: "#5295E3" }}
        >
          Send Wish
        </Button>
      </CardContent>
    </Card>
  );
};

export function RecentLeaves() {
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

  return (
    <Card className="tw-bg-white tw-rounded-lg tw-shadow-lg ">
      <CardHeader>
        <CardTitle className="tw-text-2xl tw-font-bold">
          Time Off Requests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 tw-flex tw-items-center tw-justify-between">
          <Label htmlFor="filter-date">Filter by Date</Label>
          <DatePicker onChange={handleDateChange} />
        </div>
        <Divider></Divider>
        <div className={`tw-mt-4 tw-divide-y ${styles["leaveList"]}`}>
          {isLoading ? (
            <div className="tw-flex tw-justify-center tw-items-center tw-w-full ">
              <Spin />
            </div>
          ) : (
            data.map((timeOff) => {
              return (
                <div
                  key={timeOff._doc._id}
                  className="tw-py-2 tw-flex tw-justify-between tw-items-center"
                >
                  <div>
                    <h4 className="tw-text-lg tw-font-semibold">
                      {timeOff.firstname}
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
                    {formatDateRange(
                      timeOff._doc.startDate,
                      timeOff._doc.endDate
                    )}
                  </p>
                </div>
              );
            })
          )}
          {(isError || !data?.length) && (
            <div className="tw-flex tw-justify-center tw-items-center tw-h-full ">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
