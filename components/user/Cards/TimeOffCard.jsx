import { Progress } from "antd";
import React from "react";

function TimeOffCard({ typeOfLeave }) {
  return (
    <div className="flex flex-col items-start ">
      <div>{typeOfLeave} Leave</div>
      <div className="flex items-center ">
        <Progress
          type="circle"
          percent={100}
          size={60}
          format={(percent) => `04/04`}
        />
        <ul className="">
          <li>Available - 05</li>
          <li>Used - 00</li>
        </ul>
      </div>
    </div>
  );
}

export default TimeOffCard;
