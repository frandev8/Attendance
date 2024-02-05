import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal, Progress, Spin } from "antd";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { saveBreakTime, saveBreakTokenCookie } from "../../../utils/auth";
import { fetchAutoEndBreakAttendance, mutateBreak } from "../../../utils/http";

function StartBreak({
  setBreakActive,
  autoEndBreakRef,
  autoEndBreakIntervalRef,
}) {
  const userId = useSelector((state) => {
    return state.user.userId;
  });

  const [isModalOpen, setOpen] = useState(false);

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: mutateBreak,
    onSuccess: (data) => {
      const { breakToken, breakTime } = data;
      setBreakActive();
      hideBreakModal();
      saveBreakTokenCookie(breakToken);
      saveBreakTime(breakTime);

      if (autoEndBreakIntervalRef.current) {
        clearInterval(autoEndBreakIntervalRef.current);
      }

      autoEndBreakIntervalRef.current = setInterval(() => {
        autoEndBreakRef.current = fetchAutoEndBreakAttendance({ id: userId });
      }, 2 * 1000);
    },
  });

  const onStartBreakHandler = () => {
    const breakTime = new Date();

    mutate({ id: userId, action: "start", breakTime });
  };

  const showBreakModal = () => {
    setOpen(true);
  };

  const hideBreakModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        icon={<AddIcon sx={{ fontSize: "12px" }} />}
        type="dashed"
        onClick={showBreakModal}
        className="tw-max-sm:text-ssm tw-p-2 tw-w-[max-content] tw-bg-white  "
      >
        Break
      </Button>
      <Modal
        title="Break"
        open={isModalOpen}
        onCancel={hideBreakModal}
        footer={(_, { CancelBtn }) => (
          <div className="tw-flex">
            <CancelBtn />
            <Button className="tw-bg-[#5295E3]" onClick={onStartBreakHandler}>
              {isPending ? <Spin /> : "Yes"}
            </Button>
          </div>
        )}
      >
        <p>Are you sure you want to start break?</p>
      </Modal>
    </>
  );
}

export default StartBreak;
