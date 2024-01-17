import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { json, useNavigation, useParams } from "react-router-dom";
import { endorseTimeOff } from "../../../utils/http";

function RejectBtn({ timeOffId }) {
  const navigate = useNavigation();

  const adminId = useSelector((state) => {
    return state.admin.adminId;
  });

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
    <Button variant="outline" onClick={onRejectAttendanceHandler}>
      Reject
    </Button>
  );
}

RejectBtn.propTypes = {
  refreshAttendanceList: PropTypes.func,
};

export default RejectBtn;
