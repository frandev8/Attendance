import { Progress } from "antd";
import PropTypes from "prop-types";
import React from "react";

function TimeOffCard({ typeOfLeave, limit, used }) {
  const usedLength = used?.length;
  const usedPercentage = (usedLength / limit) * 100;

  return (
    <div
      className="flex flex-col  items-start py-2  w-[48%] rounded-md mb-2 border-[1px] border-black "
      style={{ background: "white" }}
    >
      <div className="ml-[5px]">{typeOfLeave} Leave</div>
      <div className="flex items-center  justify-around w-full">
        <Progress
          type="circle"
          percent={usedPercentage}
          size={60}
          strokeColor={"green"}
          format={(percent) => `${usedLength}/${limit}`}
        />
        <ul className="">
          <li>Available - {limit - usedLength}</li>
          <li>Used - {usedLength}</li>
        </ul>
      </div>
    </div>
  );
}
export function TimeOffCard2({ typeOfLeave, limit, used }) {
  const usedLength = used?.length;
  const usedPercentage = (usedLength / limit) * 100;

  return (
    <div
      className="flex flex-col  items-start py-2  w-[48%] rounded-md mb-2 border-[1px] border-black "
      style={{ background: "white" }}
    >
      <div className="ml-[5px]">{typeOfLeave} Leave</div>
      <div className="flex items-center  justify-around w-full">
        <Progress
          type="circle"
          percent={usedPercentage}
          size={60}
          strokeColor={"green"}
          format={(percent) => `${usedLength}/${limit}`}
        />
        <ul className="">
          <li>Available - {limit - usedLength}</li>
          <li>Used - {usedLength}</li>
        </ul>
      </div>
    </div>
  );
}

export default TimeOffCard;

TimeOffCard.propTypes = {
  typeOfLeave: PropTypes.string,
  limit: PropTypes.number,
  used: PropTypes.array,
};
