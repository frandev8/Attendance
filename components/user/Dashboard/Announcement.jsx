import { Avatar, Divider, List, Space } from "antd";
import React from "react";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
];

function Announcement() {
  return (
    <Space direction="vertical">
      <div>
        Who's on leave <span>(1 new)</span>
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
                title={<a href="https://ant.design">{item.title}</a>}
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
