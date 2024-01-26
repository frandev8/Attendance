import { filterByDate } from "@/utils/date";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { Divider, Empty, Popover, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchTimeOff } from "../../../utils/http";
import { OnTimeOff } from "./OnTimeOff";
import SortTimeOff from "./SortTimeOff";
import styles from "./TimeOff.module.css";
import TimeOffCard from "./TimeOffCard";
// import { fetchAttendance } from "../../../utils/http";
import SearchBox from "../SearchBox";
// import OnLeave from "../TimeOff/OnTimeOff";

export default function TimeOff() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["timeOff", { type: "pending" }],
    queryFn: () => fetchTimeOff({ pending: true }),
    gcTime: 0,
  });

  const timeOffRequestData = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerRerender, setTriggerRerender] = useState(false);

  const [isFilterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (data) {
      console.log(data, "mydata");
      timeOffRequestData.current = data;
      setTriggerRerender((prevRerender) => !prevRerender);
    }
  }, [data]);

  useEffect(() => {
    if (data && searchTerm) {
      timeOffRequestData.current = filterTimeOff(
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

  function resetTimeOffFilter() {
    timeOffRequestData.current = data;
    setTriggerRerender((prevRerender) => !prevRerender);
  }

  const hideFilter = () => {
    setFilterOpen(false);
  };

  const onClearSearchBox = () => {
    timeOffRequestData.current = data;
    setTriggerRerender((prevRerender) => !prevRerender);
  };

  function onFilterTimeOffHandler(filterDates) {
    if (data && searchTerm) {
      timeOffRequestData.current = filterByDate(
        timeOffRequestData.current,
        filterDates,
        "startDate"
      );

      setTriggerRerender((prevRerender) => !prevRerender);
    } else if (data && !searchTerm) {
      timeOffRequestData.current = filterByDate(data, filterDates, "startDate");

      setTriggerRerender((prevRerender) => !prevRerender);
    }
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
              Time-Off Request
            </h2>
            <p>Review and take action on employee requests.</p>
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
                    timeOffRequestData.current.map((timeOff, index) => (
                      <Grid xs={2} sm={4} md={4} key={index}>
                        <TimeOffCard data={timeOff} />
                      </Grid>
                    ))}
                </Grid>
                {!timeOffRequestData?.current.length && (
                  <div className="tw-flex tw-justify-center tw-items-center tw-h-[200px] ">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
              </>
            )}
          </Container>
        </div>
        <div className={`${styles.birthday} tw-border-2 tw-border-black `}>
          <div className={` tw-sticky tw-top-[90px] tw-z-[1000]`}>
            <OnTimeOff />
          </div>
        </div>
      </Container>
    </>
  );
}

function filterTimeOff(data, searchTerm, ...fieldsToMatch) {
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
