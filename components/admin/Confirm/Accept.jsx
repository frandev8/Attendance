import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";
import React from "react";
import { json, useNavigate, useParams } from "react-router-dom";

function Accept({ refreshAttendanceList }) {
  const params = useParams();
  const navigate = useNavigate();

  const ConfirmAttendanceHandler = async () => {
    const attendanceId = "655c8972a805d2a502144812";
    const userId = "654acbf48626cf74c1d45549";

    const loginToken = document.cookie.match("(^|;)\\s?adminLogToken=([^;]+)");

    const response = await fetch(
      `http://localhost:3000/admin/confirm-attendance/${userId}/accept`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attendanceId: attendanceId,
          loginToken: loginToken[2],
        }),
      }
    );

    if (!response.ok) {
      throw json({ msg: "Couldn't fetch data" }, { status: 500 });
    }
    refreshAttendanceList();
  };

  return (
    <div
      className="flex flex-col items-center"
      onClick={ConfirmAttendanceHandler}
    >
      <div className="flex items-center mr-[2px]">
        <span>Confirm</span>{" "}
      </div>
      <div>
        <CheckIcon />
      </div>
    </div>
  );
}

Accept.propTypes = {
  refreshAttendanceList: PropTypes.func,
};

export default Accept;
