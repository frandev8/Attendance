import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";
import React from "react";
import { json, useNavigation, useParams } from "react-router-dom";

function Reject({ refreshAttendanceList }) {
  const navigate = useNavigation();

  const onRejectAttendanceHandler = async () => {
    console.log("clicked");
    const attendanceId = "655c8972a805d2a502144812";
    const userId = "654acbf48626cf74c1d45549";

    const loginToken = document.cookie.match("(^|;)\\s?adminLogToken=([^;]+)");

    const response = await fetch(
      `http://localhost:3000/admin/confirm-attendance/${userId}/reject`,
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
    <div className="flex flex-col items-center">
      <div
        className="flex items-center mr-[2px] "
        onClick={onRejectAttendanceHandler}
      >
        <span>Reject</span>{" "}
      </div>
      <div>
        <ClearIcon />
      </div>
    </div>
  );
}

Reject.propTypes = {
  refreshAttendanceList: PropTypes.func,
};

export default Reject;
