import { ArrowUpward } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { mutateBreak } from "../../../utils/http";
function EndBreak() {
  const userId = useSelector((state) => {
    return state.user.userId;
  });

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: mutateBreak,
    onSuccess: (data) => {

      
      console.log("success");
    },
  });

  const onEndBreakHandler = () => {
    mutate({ id: userId, action: "end" });
  };

  return (
    <Button onClick={onEndBreakHandler}>
      <ArrowUpward />
    </Button>
  );
}

export default EndBreak;
