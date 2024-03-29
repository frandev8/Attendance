import Paper from "@mui/material/Paper";
import { useMutation } from "@tanstack/react-query";
import { Button, Divider, Form, Input, Space, Spin } from "antd";
import PropTypes from "prop-types";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { postNotification, queryClient } from "../../../utils/http";
import { isNotificationFormValid } from "../../../utils/joiValidation";

const { TextArea } = Input;

const BackDrop = ({ closeModal }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        zIndex: "10",
        background: "rgba(0, 0, 0, 0.75)",
      }}
      onClick={() => closeModal()}
    ></div>
  );
};

const ModalOverlay = ({ closeModal }) => {
  const navigate = useNavigate();

  // const { mutate, isPending, isError, error } = useMutation({
  //   mutationFn: postNotification,
  //   onSuccess: () => {
  //     // queryClient.invalidateQueries({queryKey:[""]})
  //     navigate("./");
  //   },
  // });

  const handleNewNotificationForm = () => {
    // const formData = {
    //   title: titleInputRef.current.input.value?.trim(),
    //   message: textAreaRef.current.resizableTextArea.textArea.value?.trim(),
    //   date: new Date().toISOString(),
    // };
    // const { error } = isNotificationFormValid(formData);
    // if (error) {
    //   return;
    // }
    // // console.log(formData);
    // mutate({ formData: formData });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "50%",
        zIndex: "100",
      }}
    >
      <div className={"tw-flex tw-flex-col tw-items-end "}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            // height: "100%",
          }}
        >
          <Space direction="vertical">
            <div>My Title </div>
            <Divider />
            <div>Message</div>
            {/* <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item label="Title">
                <Input placeholder="" ref={titleInputRef} />
              </Form.Item>
              <Form.Item label="Message">
                <TextArea
                  rows={4}
                  ref={textAreaRef}
                  placeholder="Enter your message..."
                />
              </Form.Item>
            </Form> */}
          </Space>
        </Paper>
        <div className="tw-flex tw-w-[40%]">
          <Button type="primary" danger onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleNewNotificationForm}>
            {/* {isPending ? <Spin /> : "Done"} */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const NewAction = ({ closeModal }) => {
  return (
    <>
      {createPortal(
        <BackDrop closeModal={closeModal} />,
        document.getElementById("overlay")
      )}
      {createPortal(
        <ModalOverlay closeModal={closeModal} />,
        document.getElementById("timeOff-modal")
      )}
    </>
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func,
};

NewAction.propTypes = {
  closeModal: PropTypes.func,
};

BackDrop.propTypes = {
  closeModal: PropTypes.func,
};
