import CheckIcon from "@mui/icons-material/Check";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { endorseAttendance } from "../../../utils/http";

function Accept({ adminId, attendanceId, userId }) {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: endorseAttendance,
    onSuccess: () => {
      // queryClient.invalidateQueries({queryKey:[""]})
      // navigate("../");
    },
  });

  const ConfirmAttendanceHandler = async () => {
    mutate({ adminId, attendanceId, userId, isValid: true });
  };

  return (
    <div
      className="tw-flex tw-flex-col tw-items-center"
      onClick={ConfirmAttendanceHandler}
    >
      <div className="tw-flex tw-items-center tw-mr-[2px]">
        <span>Confirm</span>
      </div>
      <div>
        <CheckIcon />
      </div>
    </div>
  );
}

Accept.propTypes = {
  adminId: PropTypes.string,
  attendanceId: PropTypes.string,
  userId: PropTypes.string,
};

export default Accept;
