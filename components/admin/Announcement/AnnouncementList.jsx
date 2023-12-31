import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { Button, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { fetchAnnouncement } from "../../../utils/http";
import "./AnnouncementList.css";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    width: 130,
  },
  {
    title: "Title",
    dataIndex: "title",
    width: 100,
  },
  {
    title: "Message",
    dataIndex: "message",
  },
];

const AnnouncementList = () => {
  const { data, isPending } = useQuery({
    queryKey: ["announcement"],
    queryFn: fetchAnnouncement,
    // staleTime: 5000,
  });

  let rows = [];

  for (let i = 0; i < 70; i++) {
    rows.push({
      key: i,
      date: "20 Jan 2023",
      message: "my message",
      title: "my title",
    });
  }

  let original = [];

  if (data) {
    console.log(data);
    original = data.map((list) => {
      return { ...list, key: list._id };
    });

    console.log(original);
  }

  return (
    <div>
      {isPending && <Spin />}
      {data && (
        <Table
          columns={columns}
          dataSource={rows}
          pagination={{
            pageSize: 10,
          }}
          style={{ tableLayout: "fixed" }}
          scroll={{
            y: 240,
            x: true,
          }}
          className={"customTable"}
        />
      )}
    </div>
  );
};
export default AnnouncementList;
