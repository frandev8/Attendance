import ClearIcon from "@mui/icons-material/Clear";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import { json, useNavigation, useParams } from "react-router-dom";
import { endorseAttendance } from "../../../utils/http";

function Reject({ adminId, attendanceId, userId }) {
  const navigate = useNavigation();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: endorseAttendance,
    onSuccess: () => {
      // queryClient.invalidateQueries({queryKey:[""]})
      navigate("../");
    },
  });

  const onRejectAttendanceHandler = async () => {
    mutate({ adminId, attendanceId, userId, isValid: false });
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
  adminId: PropTypes.string,
  attendanceId: PropTypes.string,
  userId: PropTypes.string,
};

export default Reject;
