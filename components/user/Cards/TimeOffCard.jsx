import { Progress } from "antd";
import PropTypes from "prop-types";
import React from "react";

function TimeOffCard({ typeOfLeave, limit, used }) {
  const usedLength = used?.length;
  const usedPercentage = (usedLength / limit) * 100;

  return (
    <div
      className="tw-flex tw-flex-col  tw-items-start tw-py-2  tw-w-[48%] tw-rounded-md tw-mb-2 tw-border-[1px] tw-border-black "
      style={{ background: "white" }}
    >
      <div className="tw-ml-[5px]">{typeOfLeave} Leave</div>
      <div className="tw-flex tw-items-center  tw-justify-around tw-w-full">
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
      className="tw-flex tw-flex-col  tw-items-start tw-py-2  tw-w-[48%] tw-rounded-md tw-mb-2 tw-border-[1px] tw-border-black "
      style={{ background: "white" }}
    >
      <div className="tw-ml-[5px]">{typeOfLeave} Leave</div>
      <div className="tw-flex tw-items-center  tw-justify-around tw-w-full">
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
