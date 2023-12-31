import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { Button, Progress, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { saveOvertimeTokenCookie } from "../../../utils/auth";
import { mutateOvertime } from "../../../utils/http";

function StartOvertime() {
  const userId = useSelector((state) => {
    return state.user.userId;
  });

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: mutateOvertime,
    onSuccess: (data) => {
      const { overtimeToken } = data;
      saveOvertimeTokenCookie(overtimeToken);
      console.log("success");
    },
  });

  const onStartBreakHandler = () => {
    mutate({ id: userId, action: "start" });
  };

  return (
    <Button onClick={onStartBreakHandler}>
      <ArrowUpward />
    </Button>
  );
}

export default StartOvertime;
