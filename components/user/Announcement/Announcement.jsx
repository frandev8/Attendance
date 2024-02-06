import { useQuery } from "@tanstack/react-query";
import { Avatar, Divider, Empty, List, Space, Spin } from "antd";
import moment from "moment";
import React from "react";
import { getDateDuration } from "../../../utils/date";
import { fetchAnnouncement } from "../../../utils/http";
import styles from "./Announcement.module.css";

function Announcement() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["announcement"],
    queryFn: fetchAnnouncement,
  });

  return (
    <Space direction="vertical">
      <div>
        Announcement <span>(1 new)</span>
      </div>
      <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
      <div>
        {isPending && <Spin />}

        {data && (
          <List
            itemLayout="horizontal"
            dataSource={data}
            className={`${styles["main"]}  `}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`/src/assets/images/bell.png`} />}
                  title={<>{item?.title}</>}
                  description={
                    <div>
                      <div>{item?.message}</div>
                      <div>{getDateDuration(item?.date)}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}

        {(isError || (data && !data?.length)) && (
          <div className="tw-flex tw-justify-center tw-items-center tw-h-[150px] ">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </div>
    </Space>
  );
}

export default Announcement;
