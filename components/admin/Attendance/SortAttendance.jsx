import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import { Select, Space, TimePicker } from "antd";
import dayjs from "dayjs";
import React from "react";

function SortAttendance() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        width: "200px",
      }}
    >
      <div>
        <button>Reset</button>
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
      <div>
        <Select
          defaultValue="range"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "specific",
              label: "specific",
            },
            {
              value: "range",
              label: "range",
            },
          ]}
        />
      </div>
      <div>
        <Space wrap>
          <TimePicker
            defaultValue={dayjs("12:08:23", "HH:mm:ss")}
            size="large"
          />
          to
          <TimePicker
            defaultValue={dayjs("12:08:23", "HH:mm:ss")}
            size="small"
          />
        </Space>
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Apply
          </Button>
        </Stack>
      </div>
    </Paper>
  );
}

export default SortAttendance;
