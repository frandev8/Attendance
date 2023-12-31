import ClearIcon from "@mui/icons-material/Clear";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import { json, useNavigation, useParams } from "react-router-dom";
import { endorseTimeOff } from "../../../utils/http";

function Reject({ adminId, timeOffId }) {
  const navigate = useNavigation();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: endorseTimeOff,
    onSuccess: () => {
      // queryClient.invalidateQueries({queryKey:[""]})
      navigate("../");
    },
  });

  const onRejectAttendanceHandler = async () => {
    mutate({ adminId, timeOffId, isValid: false });
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
