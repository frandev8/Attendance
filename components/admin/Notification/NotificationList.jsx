import { Button, Table } from "antd";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Clock in",
    dataIndex: "name",
  },
  {
    title: "status",
    dataIndex: "age",
  },
  {
    title: "Clock in",
    dataIndex: "address",
  },
];

const NotificationList = () => {
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
            address: `London, Park Lane no. ${i}`,
          });
        }

        return newData;
      });
    }

    fetchData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default NotificationList;
