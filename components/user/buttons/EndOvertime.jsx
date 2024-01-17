import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal, Progress, Spin } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { deleteOvertimeTokenCookie } from "../../../utils/auth";
import { mutateOvertime } from "../../../utils/http";

function EndOvertime({ setOvertimeUnActive }) {
  const userId = useSelector((state) => {
    return state.user.userId;
  });
  const [isModalOpen, setOpen] = useState(false);

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: mutateOvertime,
    onSuccess: (data) => {
      deleteOvertimeTokenCookie();
      setOvertimeUnActive();
      hideOvertimeModal();
    },
  });

  const onEndOvertimeHandler = () => {
    const overtimeTime = new Date();
    mutate({ id: userId, action: "end", overtimeTime });
  };

  const showOvertimeModal = () => {
    setOpen(true);
  };

  const hideOvertimeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        icon={<CancelIcon sx={{ fontSize: "12px" }} />}
        type="dashed"
        danger
        classNametw-="tw-max-sm:text-ssm tw-p-2 tw-w-[max-content]"
        onClick={showOvertimeModal}
      >
        overtime
      </Button>

      <Modal
        title="Overtime"
        open={isModalOpen}
        onCancel={hideOvertimeModal}
        footer={(_, { CancelBtn }) => (
          <div className="tw-flex">
            <CancelBtn />
            <Button className="tw-bg-[#0000ff]" onClick={onEndOvertimeHandler}>
              Yes{" "}
            </Button>
          </div>
        )}
      >
        <p>Are you sure you want to end overtime?</p>
      </Modal>
    </>
  );
}

export default EndOvertime;
