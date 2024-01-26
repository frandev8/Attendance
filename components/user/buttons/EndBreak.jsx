import { ArrowUpward } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useMutation } from "@tanstack/react-query";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { deleteBreakTokenCookie } from "../../../utils/auth";
import { mutateBreak } from "../../../utils/http";

function EndBreak({ setBreakUnActive }) {
  const userId = useSelector((state) => {
    return state.user.userId;
  });

  const [isModalOpen, setOpen] = useState(false);

  const { data, isPending, mutate, error, isError } = useMutation({
    mutationFn: mutateBreak,
    onSuccess: (data) => {
      deleteBreakTokenCookie();
      setBreakUnActive();
      hideBreakModal();
      console.log("success");
    },
  });

  const onEndBreakHandler = () => {
    const breakTime = new Date();
    mutate({ id: userId, action: "end", breakTime });
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
        icon={<CancelIcon sx={{ fontSize: "12px" }} />}
        type="dashed"
        danger
        onClick={showBreakModal}
        className="tw-max-sm:text-ssm tw-p-2 tw-w-[max-content] tw-bg-white"
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
            <Button className="tw-bg-[#0000ff]" onClick={onEndBreakHandler}>
              Yes{" "}
            </Button>
          </div>
        )}
      >
        <p>Are you sure you want to end break?</p>
      </Modal>
    </>
  );
}

export default EndBreak;
