import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { Button, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { fetchAnnouncement } from "../../../utils/http";

const columns = [
  { field: "date", sortable: false, headerName: "Date", width: 130 },
  { field: "title", headerName: "title", sortable: false, width: 90 },

  // {
  //   field: "date",
  //   headerName: "Day",
  //   sortable: false,
  //   width: 60,
  // },
  {
    field: "message",
    headerName: "Message",
    sortable: false,
    description: "This column shows the message of the notification.",
    width: 120,
    type: "string",
  },
];

const AnnouncementList = () => {
  let rows = [];

  const { data, isPending } = useQuery({
    queryKey: ["announcement"],
    queryFn: fetchAnnouncement,
    // staleTime: 5000,
  });

  if (data) {
    console.log(data);
    rows = data.map((list) => {
      return { ...list, id: list._id };
    });
  }

  return (
    <div>
      {isPending && <Spin />}
      {data && (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
        />
      )}
    </div>
  );
};
export default AnnouncementList;
