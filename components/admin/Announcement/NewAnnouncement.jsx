import Paper from "@mui/material/Paper";
import { useMutation } from "@tanstack/react-query";
import { Button, Divider, Form, Input, Space, Spin } from "antd";
import PropTypes from "prop-types";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAnnouncement, queryClient } from "../../../utils/http";
import { isAnnouncementFormValid } from "../../../utils/joiValidation";

const { TextArea } = Input;

const validateMessages = {
  required: "${label} is required!",
};

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
  const textAreaRef = useRef();
  const titleInputRef = useRef();

  const navigate = useNavigate();

  const adminId = useSelector((state) => state.admin.adminId);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      closeModal();
    },
  });

  // const handleNewAnnouncementForm = () => {
  //   const formData = {
  //     title: titleInputRef.current.input.value?.trim(),
  //     message: textAreaRef.current.resizableTextArea.textArea.value?.trim(),
  //     date: new Date().toISOString(),
  //   };

  //   if (isAnnouncementFormValid(formData)) {
  //     mutate({ formData: formData });
  //   }
  // };

  const onFinish = (values) => {
    const formData = {
      ...values,
      date: new Date().toISOString(),
      adminId,
    };

    mutate({ formData });
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
            <div>New Announcement </div>
            <Divider />
            <Form
              labelCol={{
                span: 4,
              }}
              layout="horizontal"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                  },
                  { max: 20, message: "Can't be more than 20 characters" },
                ]}
                validateTrigger="onBlur"
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                label="Message"
                name={"message"}
                rules={[
                  {
                    required: true,
                  },
                  { max: 200, message: "Can't be more than 200 characters" },
                ]}
                validateTrigger="onBlur"
              >
                <TextArea rows={4} placeholder="Enter your message..." />
              </Form.Item>
              <Form.Item className="tw-flex tw-justify-end">
                <div className="tw-flex">
                  <Button type="primary" danger onClick={() => closeModal()}>
                    Cancel
                  </Button>
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="tw-bg-[#5295E3]"
                  >
                    {isPending ? <Spin /> : "Done"}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Space>
        </Paper>
        {/* <div className="tw-flex tw-w-[40%]">
          <Button type="primary" danger onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleNewAnnouncementForm}
            style={{ backgroundColor: "#5295E3" }}
          >
            {isPending ? <Spin /> : "Done"}
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export const NewAnnouncement = ({ closeModal }) => {
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

NewAnnouncement.propTypes = {
  closeModal: PropTypes.func,
};

BackDrop.propTypes = {
  closeModal: PropTypes.func,
};
