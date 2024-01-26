import { filterByDate } from "@/utils/date";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { experimentalStyled as styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { Card, Empty, Popover, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAttendance, queryClient } from "../../../utils/http";
import SearchBox from "../SearchBox";
import OnLeave from "../TimeOff/OnTimeOff";
import Accept from "./Accept";
import styles from "./Attendance.module.css";
import AttendanceCard from "./AttendanceCard";
import ClockIn from "./ClockIn";
import ClockOut from "./ClockOut";
import Reject from "./Reject";
import SortAttendance from "./SortAttendance";
const { Meta } = Card;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Attendance = () => {
  const { data, isPending } = useQuery({
    queryKey: ["attendance", { type: "pending" }],
    queryFn: () => fetchAttendance({ pending: true }),
    gcTime: 0,
  });

  const attendanceRequestData = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerRerender, setTriggerRerender] = useState(false);

  const adminId = useSelector((state)=> state.admin.adminId)

  const [isFilterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (data) {
      attendanceRequestData.current = data;
      setTriggerRerender((prevRerender) => !prevRerender);
    }
  }, [data]);

  useEffect(() => {
    if (data && searchTerm) {
      attendanceRequestData.current = filterAttendance(
        data,
        searchTerm,
        "firstName",
        "lastname",
        "username"
      );

      setTriggerRerender((prevRerender) => !prevRerender);
    }
  }, [data, searchTerm]);

  const handleOpenChange = (newOpen) => {
    setFilterOpen(newOpen);
  };

  function resetAttendanceFilter() {
    attendanceRequestData.current = data;
    setTriggerRerender((prevRerender) => !prevRerender);
  }

  const hideFilter = () => {
    setFilterOpen(false);
  };

  const onClearSearchBox = () => {
    attendanceRequestData.current = data;
    setTriggerRerender((prevRerender) => !prevRerender);
  };

  function onFilterAttendanceHandler(filterDates) {
    if (data && searchTerm) {
      attendanceRequestData.current = filterByDate(
        attendanceRequestData.current,
        filterDates,
        "clockInTime"
      );

      setTriggerRerender((prevRerender) => !prevRerender);
    } else if (data && !searchTerm) {
      attendanceRequestData.current = filterByDate(
        data,
        filterDates,
        "clockInTime"
      );

      setTriggerRerender((prevRerender) => !prevRerender);
    }
  }

  const content = (
    <SortAttendance
      hideFilter={hideFilter}
      filterAttendance={onFilterAttendanceHandler}
      resetFilter={resetAttendanceFilter}
    />
  );

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          backgroundColor: "#F1F2F6",
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
        className={`${styles.wrapper}`}
      >
        <div className={`${styles.attendance}`}>
          <div className="tw-flex tw-flex-col tw-justify-around tw-sticky tw-top-[60px] tw-z-[1000] tw-bg-white tw-mb-[10px] tw-px-6">
            <h2 className="tw-mt-[20px] tw-text-lg tw-font-semibold">
              {" "}
              Attendance
            </h2>
            <div className="tw-flex tw-justify-end  ">
              <SearchBox
                clearSearchBox={onClearSearchBox}
                filterBySearchBox={setSearchTerm}
              />
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
          </div>
          <Container maxWidth="lg" sx={{ mb: 4, border: "2px solid blue" }}>
            {isPending ? (
              <Spin />
            ) : (
              <>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 2, sm: 8, md: 12 }}
                  className={`${styles["main"]}`}
                >
                  {data &&
                    attendanceRequestData.current.map((attendance, index) => (
                      <Grid xs={2} sm={4} md={4} key={index}>
                        <AttendanceCard adminId={adminId} data={attendance} />
                      </Grid>
                    ))}
                </Grid>
                {!attendanceRequestData?.current.length && (
                  <div className="tw-flex tw-justify-center tw-items-center tw-h-[200px] ">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
              </>
            )}
          </Container>
        </div>
        <div className={`${styles.birthday} tw-border-2 tw-border-black`}>
          {" "}
          <OnLeave />
        </div>
      </Container>
    </>
  );
};
export default Attendance;

function filterAttendance(data, searchTerm, ...fieldsToMatch) {
  return data.filter((item) => {
    return fieldsToMatch.some((field) => {
      const fieldValue = item[field];
      return (
        fieldValue &&
        fieldValue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  });
}
