import EventNoteIcon from "@mui/icons-material/EventNote";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Button, Progress } from "antd";
import React, { useState } from "react";
import canClockIn from "../../../utils/verifyClockIns";

function MyTimeSheet() {
  const [isClockActive, setClockBtn] = useState(false);

  const userId = "654acbf48626cf74c1d45549";

  const onClockInHandler = async () => {
    const res = await fetch(`http://localhost:3000/employee/${userId}`);

    if (!res.ok) {
      return;
    }
    const employee = await res.json();
    const today = new Date();

    if (!canClockIn(today, employee.lastCheckInDate)) {
      const loginToken = document.cookie.match("(^|;)\\s?token=([^;]+)");

      const res = await fetch(
        "http://localhost:3000/employee/attendance/clockIn",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // credentials: "include",
          body: JSON.stringify({
            clockInTime: today.toISOString(),
            loginToken: loginToken[2],
          }),
        }
      );

      if (!res.ok) {
        return;
      }

      const token = await res.json();

      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 20);

      document.cookie = `clockInToken=${
        token.data
      }; maxAge=${expirationDate.toUTCString()}`;

      setClockBtn((prev) => !prev);
    }
  };

  const onClockOutHandler = async () => {
    const date = new Date();

    const loginToken = document.cookie.match("(^|;)\\s?token=([^;]+)");
    const clockInToken = document.cookie.match("(^|;)\\s?clockInToken=([^;]+)");

    const res = await fetch(
      "http://localhost:3000/employee/attendance/clockOut",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clockOutTime: date.toISOString(),
          loginToken: loginToken[2],
          clockInToken: clockInToken[2],
        }),
      }
    );
    setClockBtn((prev) => !prev);
  };

  return (
    <div className={`flex flex-col justify-between items-start h-full`}>
      <div className="mb-[5px]">
        <span>Timesheet</span> <span>15 May 2000</span>
      </div>
      <div>
        {" "}
        <Alert variant="outlined" severity="success" className="mb-[5px]">
          Clocked in at <p>Wed, 11 may 2019 10:00am</p>
        </Alert>
      </div>
      <div className="w-full flex flex-col items-center justify-around border-2 border-black mb-[5px]">
        <Progress
          type="circle"
          size={80}
          percent={75}
          format={(percent) => ` 3.4 hrs`}
          className="mb-[5px]"
        />

        {!isClockActive ? (
          <Button
            className="w-[40%] bg-[#00ff00]"
            type="primary"
            size={"medium"}
            onClick={onClockInHandler}
          >
            Clock in
          </Button>
        ) : (
          <Button
            className="w-[40%]  bg-[#ff0000]"
            onClick={onClockOutHandler}
            type="primary"
            size={"medium"}
          >
            Clock out
          </Button>
        )}
      </div>

      <div className="w-full flex justify-between items-center">
        <Button>Break</Button> <Button>Overtime</Button>
      </div>
    </div>
  );
}

export default MyTimeSheet;
