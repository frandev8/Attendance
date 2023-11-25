import { Avatar, DatePicker, Divider, List, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  // {
  //   title: "Ant Design Title 3",
  // },
  // {
  //   title: "Ant Design Title 4",
  // },
];

function RecentLeaves() {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Space direction="vertical">
      <p>Who's on leave</p>{" "}
      <button>
        {" "}
        <Link to="timeOff"> See More</Link>
      </button>
      <Divider />
      <div className="flex ">
        <div>
          On Leave: <span> 2</span>
        </div>
        <div>
          <DatePicker onChange={onChange} />
        </div>
      </div>
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

export default RecentLeaves;
