import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Container, Divider, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openViewTimeOffModal } from "../../../src/store/main";
import { calculateDaysBetween, formatLeaveDates } from "../../../utils/date";
import {
  deleteTimeOff,
  fetchTimeOffById,
  queryClient,
} from "../../../utils/http";
import styles from "./History.module.css";
import { ViewTimeOff } from "./ViewTimeOff";

const columns = [
  {
    title: "Duration",
    dataIndex: "duration",
    width: 150,
  },
  {
    title: "Type",
    dataIndex: "type",
    width: 100,
  },
  {
    title: "Days",
    dataIndex: "days",
    width: 100,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 100,
  },
  {
    title: "Del",
    dataIndex: "delete",
    width: 20,
  },
  {
    title: "View",
    dataIndex: "see-more",
  },
];

{
  /* <div>Employee List</div>
            <Divider style={{ marginTop: "5px", marginBottom: "5px" }} /> */
}

const History = () => {
  const userId = useSelector((state) => state.user.userId);

  const isViewModalOpen = useSelector((state) => state.timeOff.isViewModalOpen);

  const [isModalOpen, setOpen] = useState(false);
  const [viewLeaveId, setViewLeaveId] = useState(false);
  const [leaveId, setLeaveId] = useState(false);

  const dispatch = useDispatch();

  const {
    mutate,
    isPending: isMutatePending,
    isError,
    error,
  } = useMutation({
    mutationFn: deleteTimeOff,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leave", { type: "request" }],
      });
    },
  });

  const { data: myData, isPending } = useQuery({
    queryKey: ["leave", { type: "request" }],
    queryFn: () => fetchTimeOffById({ id: userId }),
  });

  const data = [];

  if (myData) {
    myData.forEach((leave) => {
      data.push({
        key: leave.userId,
        duration: formatLeaveDates(leave.startDate, leave.endDate),
        type: leave.type,
        days: calculateDaysBetween(leave.startDate, leave.endDate),
        status: leave.status,
        delete:
          leave.status === "pending" ? (
            <DeleteOutlineIcon
              onClick={() => {
                setLeaveId(leave._id);
                showBreakModal();
              }}
            />
          ) : (
            ""
          ),
        "see-more": (
          <button
            href="#"
            onClick={() => {
              dispatch(openViewTimeOffModal);
              setViewLeaveId(leave.id);
            }}
          >
            see more
          </button>
        ),
      });
    });
  }

  const showBreakModal = () => {
    setOpen(true);
  };

  const hideBreakModal = () => {
    setOpen(false);
  };

  function onDeleteTimeOffHandler() {
    mutate({ id: leaveId });
    hideBreakModal();
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <div>Leave Records</div>
        <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
        <Box sx={{ width: "100%" }}>
          <Table
            columns={columns}
            dataSource={data}
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
        </Box>
      </Container>
      <Modal
        title="Break"
        open={isModalOpen}
        onCancel={hideBreakModal}
        footer={(_, { CancelBtn }) => (
          <div className="tw-flex">
            <CancelBtn />
            <Button
              className="tw-bg-[#0000ff]"
              onClick={onDeleteTimeOffHandler}
            >
              Yes{" "}
            </Button>
          </div>
        )}
      >
        <p>Are you sure you want to delete it?</p>
      </Modal>

      {isViewModalOpen && (
        <ViewTimeOff
          formData={myData.filter((timeOff) => timeOff._id === viewLeaveId)[0]}
        />
      )}
    </>
  );
};
export default History;
