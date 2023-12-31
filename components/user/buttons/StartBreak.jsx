import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { Button, Progress, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { saveBreakTokenCookie } from "../../../utils/auth";
import { mutateBreak } from "../../../utils/http";

function StartBreak() {
  const userId = useSelector((state) => {
    return state.user.userId;
  });

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: mutateBreak,
    onSuccess: (data) => {
      const { breakToken } = data;
      saveBreakTokenCookie(breakToken);
      console.log("successful start");
    },
  });

  const onEndBreakHandler = () => {
    mutate({ id: userId, action: "start" });
  };

  return (
    <Button onClick={onEndBreakHandler}>
      <ArrowUpward />
    </Button>
  );
}

export default StartBreak;
