import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import {
  deleteAnnouncement,
  fetchAnnouncement,
  queryClient,
} from "../../../utils/http";
import { AnnouncementAction } from "./AnnouncementAction";
import "./AnnouncementList.css";
import { EditAnnouncement } from "./EditAnnouncement";

import { formatTimeOffDate } from "@/utils/date";
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
  {
    title: <div className="tw-text-white">action</div>,
    dataIndex: "action",
  },
];

const AnnouncementList = () => {
  const { data, isPending } = useQuery({
    queryKey: ["announcement"],
    queryFn: fetchAnnouncement,
    // staleTime: 5000,
  });

  const {
    mutate,
    isPending: isDeletePending,
    isError,
    error,
  } = useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcement"],
      });
    },
  });

  const [isEditAnnounceOpen, setEditAnnounceStatus] = useState(false);
  const [editAnnounceDetails, setEditAnnounceDetails] = useState(null);

  function openEditAnnounceModal() {
    setEditAnnounceStatus(true);
  }

  function closeEditAnnouncementModal() {
    setEditAnnounceStatus(false);
  }

  const confirmDeletion = (id) => {
    mutate({ id });
  };

  let original = [];

  if (data) {
    original = data.map((list) => {
      return {
        ...list,
        key: list._id,
        date: formatTimeOffDate(list._date),
        action: (
          <AnnouncementAction
            openModal={openEditAnnounceModal}
            setModalDetails={setEditAnnounceDetails}
            data={list}
            isPending={isDeletePending}
            delNotification={confirmDeletion}
          ></AnnouncementAction>
        ),
      };
    });
  }

  return (
    <div>
      {isPending ? (
        <Spin />
      ) : (
        <Table
          columns={columns}
          dataSource={original}
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
      )}{" "}
      {isEditAnnounceOpen && (
        <EditAnnouncement
          closeModal={closeEditAnnouncementModal}
          announcementDetails={editAnnounceDetails}
        />
      )}
    </div>
  );
};
export default AnnouncementList;
