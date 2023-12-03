import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import styles from "./History.module.css";

const columns = [
  { field: "duration", sortable: false, headerName: "Duration", width: 130 },
  { field: "type", headerName: "Type", sortable: false, width: 90 },
  {
    field: "day",
    headerName: "Day",
    type: "number",
    sortable: false,
    width: 60,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    description: "This column shows the state of the time-off request.",
    width: 120,
    type: "string",
  },
  {
    field: "mutate",
    headerName: "",
    description: "You can delete pending request.",
    // sortable: false,
    width: 40,
    type: "button",
  },
  {
    field: "view",
    headerName: "",
    description: "You can view your request in.",
    // sortable: false,
    width: 40,
    type: "button",
  },
];

const rows = [
  { id: "1", duration: "Snow", type: "casual", status: "pending", day: 5 },
];

export function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      />
    </div>
  );
}

const History = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userId = "654acbf48626cf74c1d45549";

      const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

      const response = await fetch(
        `${serverURL}/employee/attendance/${userId}`
      );

      if (!response.ok) {
        return;
      }

      const attendance = await response.json();

      setData(() => {
        const newData = [];

        for (let i = 0; i <= attendance.length; i++) {
          newData.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London. ${i}`,
          });
        }

        return newData;
      });
    }

    fetchData();
  }, []);

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      />
    </div>
  );
};

export default History;
