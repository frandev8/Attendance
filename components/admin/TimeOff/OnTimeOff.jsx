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
      <OnTimeOff />
    </div>
  );
}

export function OnTimeOff() {
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

  let rows = [];

  for (let i = 0; i < 70; i++) {
    rows.push({
      key: i,
      date: "20 Jan 2023",
      message: "my message",
      title: "my title",
    });
  }

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
          <DatePicker onChange={onChange} />
        </div>
        <Divider></Divider>
        <div className={`tw-mt-4 tw-divide-y ${styles["leaveList"]}`}>
          {isPending && <Spin />}
          {myData &&
            filteredLeavesRef.current.map((timeOff) => {
              return (
                <div
                  key={timeOff._id}
                  className="tw-py-2 tw-flex tw-justify-between tw-items-center"
                >
                  <div>
                    <h4 className="tw-text-lg tw-font-semibold">
                      Employee Name
                    </h4>
                    <p className="tw-text-sm tw-text-gray-500 tw-dark:text-gray-400">
                      {calculateDaysBetween(timeOff.startDate, timeOff.endDate)}{" "}
                      {calculateDaysBetween(
                        timeOff.startDate,
                        timeOff.endDate
                      ) > 1
                        ? " days "
                        : " day "}
                      off
                    </p>
                  </div>
                  <p className="tw-text-sm tw-text-gray-500 tw-dark:text-gray-400">
                    {formatDateRange(timeOff.startDate, timeOff.endDate)}
                  </p>
                </div>
              );
            })}
          {!filteredLeavesRef?.current.length && (
            <div className="tw-flex tw-justify-center tw-items-center tw-h-full ">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Birthday() {
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
        <Button className="tw-bg-red-500 tw-text-white tw-w-max">
          Send Wish
        </Button>
      </CardContent>
    </Card>
  );
}
