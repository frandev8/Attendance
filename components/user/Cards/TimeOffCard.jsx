import { Progress, Spin } from "antd";
import PropTypes from "prop-types";
import React from "react";

function TimeOffCard({ typeOfLeave, limit, used, isPending }) {
  const usedLength = used?.length || 0;
  const usedPercentage = (usedLength / limit) * 100;

  return (
    <div
      className="tw-flex tw-flex-col  tw-items-start tw-py-2  tw-w-[48%] tw-rounded-md tw-mb-2 tw-shadow-sm "
      style={{ background: "white" }}
    >
      <div className="tw-ml-[5px]">{typeOfLeave} Leave</div>
      <div className="tw-flex tw-items-center  tw-justify-around tw-w-full">
        <Progress
          type="circle"
          percent={usedPercentage}
          size={60}
          strokeColor={"green"}
          format={(percent) => {
            if (isPending) {
              return <Spin size="small" />;
            } else {
              return `${usedLength}/${limit}`;
            }
          }}
        />
        <ul className="">
          <li>Available - {limit - usedLength}</li>
          <li>Used - {usedLength}</li>
        </ul>
      </div>
    </div>
  );
}
export function TimeOffCard2({ typeOfLeave, limit, used, isPending }) {
  const usedLength = used?.length || 0;
  const usedPercentage = (usedLength / limit) * 100;

  return (
    <div
      className="tw-flex tw-flex-col max-[480px]:tw-items-center tw-shadow-sm  tw-items-start tw-py-2  tw-w-[48%] tw-rounded-md tw-mb-2 "
      style={{ background: "white" }}
    >
      <div className="tw-ml-[5px]">
        {typeOfLeave} <span className="max-[480px]:tw-hidden">Leave</span>
      </div>
      <div className="tw-flex max-[480px]:tw-flex-col tw-items-center  tw-justify-around tw-w-full">
        <Progress
          type="circle"
          percent={usedPercentage}
          size={60}
          strokeColor={"#42CB65"}
          format={(percent) => {
            if (isPending) {
              return <Spin size="small" />;
            } else {
              return `${usedLength}/${limit}`;
            }
          }}
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
  isPending: PropTypes.bool,
};

TimeOffCard2.propTypes = {
  typeOfLeave: PropTypes.string,
  limit: PropTypes.number,
  used: PropTypes.array,
  isPending: PropTypes.bool,
};
