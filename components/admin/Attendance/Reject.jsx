import { Button } from "@/components/ui/button";
import ClearIcon from "@mui/icons-material/Clear";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import { json, useNavigation, useParams } from "react-router-dom";
import { endorseAttendance, queryClient } from "../../../utils/http";

function Reject({ adminId, attendanceId, userId }) {
  const navigate = useNavigation();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: endorseAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attendance", { type: "pending" }],
      });
      navigate("../");
    },
  });

  const onRejectAttendanceHandler = async () => {
    mutate({ adminId, attendanceId, userId, isValid: false });
  };
  return (
    <Button variant="outline" onClick={onRejectAttendanceHandler}>
      Reject
    </Button>
  );
}

Reject.propTypes = {
  adminId: PropTypes.string,
  attendanceId: PropTypes.string,
  userId: PropTypes.string,
};

export default Reject;
