import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { json, useNavigate, useParams } from "react-router-dom";
import { endorseTimeOff, queryClient } from "../../../utils/http";

function AcceptBtn({ timeOffId }) {
  const params = useParams();
  const navigate = useNavigate();

  const adminId = useSelector((state) => {
    return state.admin.adminId;
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: endorseTimeOff,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["timeOff", { type: "pending" }],
      });
    },
  });

  const ConfirmAttendanceHandler = async () => {
    mutate({ adminId, timeOffId, isValid: true });
  };

  return (
    <Button
      onClick={ConfirmAttendanceHandler}
      style={{ backgroundColor: "#5295E3" }}
    >
      Accept
    </Button>
  );
}

AcceptBtn.propTypes = {
  refreshAttendanceList: PropTypes.func,
};

export default AcceptBtn;
