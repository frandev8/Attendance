import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { Divider, Empty, Popover, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchEmployees, queryClient } from "../../../utils/http";
import SearchBox from "../SearchBox";
// import OnLeave from "../TimeOff/OnTimeOff";
import { filterByDate } from "@/utils/date";
import EmployeeCard from "./EmployeeCard";
import styles from "./EmployeeList.module.css";
import SortEmployee from "./SortEmployee";

export default function EmployeeList() {
  const { data, isPending } = useQuery({
    queryKey: ["employee", { type: "active" }],
    queryFn: () => fetchEmployees({ active: true }),
    gcTime: 0,
  });

  const adminId = useSelector((state) => {
    return state.admin.adminId;
  });

  const employeeRequestData = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerRerender, setTriggerRerender] = useState(false);

  const [isFilterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (data) {
      employeeRequestData.current = data;
      setTriggerRerender((prevRerender) => !prevRerender);
    }
  }, [data]);

  useEffect(() => {
    if (data && searchTerm) {
      employeeRequestData.current = filterEmployee(
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

  function resetEmployeeFilter() {
    employeeRequestData.current = data;
    setTriggerRerender((prevRerender) => !prevRerender);
  }

  const hideFilter = () => {
    setFilterOpen(false);
  };

  const onClearSearchBox = () => {
    employeeRequestData.current = data;
    setTriggerRerender((prevRerender) => !prevRerender);
  };

  function onFilterEmployeeHandler(filterDates) {
    if (data && searchTerm) {
      employeeRequestData.current = filterByDate(
        employeeRequestData.current,
        filterDates,
        "createdAt"
      );

      setTriggerRerender((prevRerender) => !prevRerender);
    } else if (data && !searchTerm) {
      employeeRequestData.current = filterByDate(
        data,
        filterDates,
        "createdAt"
      );

      setTriggerRerender((prevRerender) => !prevRerender);
    }
  }

  const content = (
    <SortEmployee
      hideFilter={hideFilter}
      filterEmployee={onFilterEmployeeHandler}
      resetFilter={resetEmployeeFilter}
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
              Employee List
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
            {isPending && <Spin />}
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
              className={`${styles["main"]}`}
            >
              {data &&
                employeeRequestData.current.map((employee, index) => (
                  <Grid xs={2} sm={4} md={4} key={index}>
                    <EmployeeCard data={employee} />
                  </Grid>
                ))}
            </Grid>

            {!employeeRequestData?.current.length && (
              <div className="tw-flex tw-justify-center tw-items-center tw-h-[200px] ">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </Container>
        </div>
        <div className={`${styles.birthday} tw-border-2 tw-border-black`}>
          {" "}
        </div>
      </Container>
    </>
  );
}
function filterEmployee(data, searchTerm, ...fieldsToMatch) {
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
