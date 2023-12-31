import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { Button, Progress, Spin } from "antd";
import { useSelector } from "react-redux";
import { deleteOvertimeTokenCookie } from "../../../utils/auth";
import { mutateOvertime } from "../../../utils/http";
function EndOvertime() {
  const userId = useSelector((state) => {
    return state.user.userId;
  });

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: mutateOvertime,
    onSuccess: (data) => {
      deleteOvertimeTokenCookie();
      console.log("successful overtime end");
    },
  });

  const onEndOvertimeHandler = () => {
    mutate({ id: userId, action: "end" });
  };

  return (
    <Button onClick={onEndOvertimeHandler}>
      <ArrowDownward />
    </Button>
  );
}

export default EndOvertime;
