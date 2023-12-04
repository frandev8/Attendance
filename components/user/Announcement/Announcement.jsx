import { useQuery } from "@tanstack/react-query";
import { Avatar, Divider, List, Space } from "antd";
import React from "react";
import { fetchNotification } from "../../../utils/http";

function Announcement() {
  // const { data, isPending } = useQuery({
  //   queryKey: ["notification"],
  //   queryFn: fetchNotification,
  // });
  const data = [
    // {
    //   title: "Ant Design Title 1",
    // },
    // {
    //   title: "Ant Design Title 2",
    // },
  ];

  return (
    <Space direction="vertical">
      <div>
        Announcement <span>(1 new)</span>
      </div>
      <Divider />
      <div>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item?.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
    </Space>
  );
}

export default Announcement;
