import CheckIcon from "@mui/icons-material/Check";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { endorseTimeOff } from "../../../utils/http";

function Accept({ adminId, timeOffId }) {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: endorseTimeOff,
    onSuccess: () => {
      // queryClient.invalidateQueries({queryKey:[""]})
      navigate("../");
    },
  });

  const ConfirmAttendanceHandler = async () => {
    mutate({ adminId, timeOffId, isValid: true });
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
