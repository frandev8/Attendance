import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal, Progress, Spin } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { saveOvertimeTokenCookie } from "../../../utils/auth";
import { mutateOvertime } from "../../../utils/http";

function StartOvertime({ setOvertimeActive }) {
  const userId = useSelector((state) => {
    return state.user.userId;
  });

  const [isModalOpen, setOpen] = useState(false);

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: mutateOvertime,
    onSuccess: (data) => {
      const { overtimeToken } = data;

      saveOvertimeTokenCookie(overtimeToken);
      setOvertimeActive();
      hideOvertimeModal();
    },
  });

  const onStartOvertimeHandler = () => {
    const overtimeTime = new Date();
    mutate({ id: userId, action: "start", overtimeTime });
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
        icon={<AddIcon sx={{ fontSize: "12px" }} />}
        type="dashed"
        className="tw-max-sm:text-ssm tw-p-2 tw-w-[max-content] tw-bg-white"
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
            <Button
              className="tw-bg-[#DBE9F9]"
              onClick={onStartOvertimeHandler}
            >
              Yes{" "}
            </Button>
          </div>
        )}
      >
        <p>Are you sure you want to start overtime?</p>
      </Modal>
    </>
  );
}

export default StartOvertime;
