import { Badge } from "@/components/ui/badge";
import { getColorBasedOnStatus } from "@/utils/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, Divider, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Modal, Popover, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openViewTimeOffModal } from "../../../src/store/main";
import {
  calculateDaysBetween,
  filterByDate,
  formatLeaveDates,
} from "../../../utils/date";
import {
  deleteTimeOff,
  fetchTimeOffById,
  queryClient,
} from "../../../utils/http";
import styles from "./History.module.css";
import SortTimeOff from "./SortTimeOff";
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
    width: 60,
  },
  {
    title: "View",
    dataIndex: "see-more",
  },
];

const History = () => {
  const timeOffRequestData = useRef([]);
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
    gcTime: 0,
  });

  // const [searchTerm, setSearchTerm] = useState("");
  const [triggerRerender, setTriggerRerender] = useState(false);

  const [isFilterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (myData) {
      timeOffRequestData.current = myData.map((leave) => {
        const badgeColor = getColorBasedOnStatus(leave.status);

        console.log(badgeColor, "data");

        return {
          key: leave._id,
          duration: formatLeaveDates(leave.startDate, leave.endDate),
          type: leave.type,
          days: calculateDaysBetween(leave.startDate, leave.endDate),
          status: (
            <Badge
              className={`tw-w-max `}
              style={{ backgroundColor: badgeColor }}
            >
              {leave.status}
            </Badge>
          ),
          delete:
            leave.status === "pending" ? (
              <DeleteOutlineIcon
                onClick={() => {
                  setLeaveId(leave._id);
                  showBreakModal();
                }}
                className="hover:tw-cursor-pointer "
                style={{ color: "#FF7875" }}
              />
            ) : (
              ""
            ),
          "see-more": (
            <button
              className="tw-w-max tw-text-[#5295E3]"
              href="#"
              onClick={() => {
                dispatch(openViewTimeOffModal());
                setViewLeaveId(leave._id);
              }}
            >
              see more
            </button>
          ),
        };
      });
      setTriggerRerender((prevRerender) => !prevRerender);
    }
  }, [myData, dispatch]);

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

  const handleOpenChange = (newOpen) => {
    setFilterOpen(newOpen);
  };

  function resetTimeOffFilter() {
    timeOffRequestData.current = myData;
    setTriggerRerender((prevRerender) => !prevRerender);
  }

  const hideFilter = () => {
    setFilterOpen(false);
  };

  function onFilterTimeOffHandler(filterDates) {
    timeOffRequestData.current = filterByDate(myData, filterDates, "startDate");

    setTriggerRerender((prevRerender) => !prevRerender);
  }

  const content = (
    <SortTimeOff
      hideFilter={hideFilter}
      filterTimeOff={onFilterTimeOffHandler}
      resetFilter={resetTimeOffFilter}
    />
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <div className="tw-flex tw-items-center tw-justify-between">
          <div>Leave Records</div>
          <Popover
            placement="bottomLeft"
            open={isFilterOpen}
            title={""}
            trigger="hover"
            onOpenChange={handleOpenChange}
            content={content}
          >
            <Button className="tw-w-max " variant="outlined">
              <FilterListIcon /> Filter
            </Button>
          </Popover>
        </div>
        <Divider style={{ marginTop: "5px", marginBottom: "5px" }} />
        <Box sx={{ width: "100%" }}>
          <Table
            columns={columns}
            dataSource={timeOffRequestData.current}
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
              className="tw-bg-[#5295E3]"
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
