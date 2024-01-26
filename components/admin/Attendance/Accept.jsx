import { Button } from "@/components/ui/button";
import CheckIcon from "@mui/icons-material/Check";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { endorseAttendance, queryClient } from "../../../utils/http";

function Accept({ adminId, attendanceId, userId }) {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: endorseAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attendance", { type: "pending" }],
      });
      // navigate("../");
    },
  });

  const ConfirmAttendanceHandler = async () => {
    mutate({ adminId, attendanceId, userId, isValid: true });
  };

  return <Button onClick={ConfirmAttendanceHandler}>Accept</Button>;
}

Accept.propTypes = {
  adminId: PropTypes.string,
  attendanceId: PropTypes.string,
  userId: PropTypes.string,
};

export default Accept;
