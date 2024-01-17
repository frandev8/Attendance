import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import { DatePicker, Select, Space } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

function SortEmployee({ hideFilter, filterEmployee, resetFilter }) {
  const [timeSelectFormat, setTimeSelectFormat] = useState("rg");
  const [date1Value, setDate1Value] = useState(
    dayjs().startOf("week").subtract(1, "week")
  );
  const [date2Value, setDate2Value] = useState(dayjs());

  const onDate1Change = (date, dateString) => {
    setDate1Value(dateString);
    // console.log(date, dateString);
  };

  const onDate2Change = (date, dateString) => {
    setDate2Value(dateString);
    // console.log(date, dateString);
  };

  const handleChange = (value) => {
    setTimeSelectFormat(value);
  };

  function onHandleApplyButton() {
    switch (timeSelectFormat) {
      case "rg":
        if (!date1Value || !date2Value) {
          return;
        }
        filterEmployee([date1Value, date2Value]);

        break;
      case "sp":
        if (!date1Value) {
          return;
        }
        filterEmployee([date1Value]);
        break;
      default:
        return;
    }
  }

  function refetchEmployee() {
    setDate1Value(dayjs().startOf("week").subtract(1, "week"));
    setDate2Value(dayjs());
    setTimeSelectFormat("rg");
    resetFilter();
    hideFilter();
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        width: "300px",
      }}
    >
      <div>
        <Button variant="contained" color="primary" onClick={refetchEmployee}>
          Reset
        </Button>
      </div>
      <div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="time"
            name="radio-buttons-group"
          >
            <FormControlLabel value="date" control={<Radio />} label="Date" />
            <FormControlLabel value="time" control={<Radio />} label="Time" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="tw-mb-[10px]">
        <Select
          value={timeSelectFormat}
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "sp",
              label: "specific",
            },
            {
              value: "rg",
              label: "range",
            },
          ]}
        />
      </div>
     <div className="tw-mb-[10px]">
        <Space direction="horizontal">
          <DatePicker
            defaultValue={date1Value}
            size="large"
            onChange={onDate1Change}
          />
          {timeSelectFormat === "rg" && (
            <>
              to
              <DatePicker
                defaultValue={date2Value}
                size="large"
                onChange={onDate2Change}
              />
            </>
          )}
        </Space>
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="error" onClick={hideFilter}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onHandleApplyButton}
          >
            Apply
          </Button>
        </Stack>
      </div>
    </Paper>
  );
}

export default SortEmployee;
