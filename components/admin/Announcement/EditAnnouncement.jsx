import Paper from "@mui/material/Paper";
import { useMutation } from "@tanstack/react-query";
import { Button, Divider, Form, Input, Space, Spin } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mutateAnnouncement, queryClient } from "../../../utils/http";
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

const ModalOverlay = ({ closeModal, announcementDetails }) => {
  const [form] = Form.useForm();
  const [isFormChanged, setFormMode] = useState(false);

  const adminId = useSelector((state) => state.admin.adminId);
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: mutateAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
    },
  });

  const onFinish = (values) => {
    mutate({
      formData: values,
      id: announcementDetails._id,
      adminId,
    });
  };

  let initialValues = {
    message: announcementDetails.message,
    title: announcementDetails.title,
  };

  function onChangeForm(e) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "title":
        if (value.trim() !== initialValues.title) {
          setFormMode((prev) => ({ ...prev, title: true }));
        } else {
          setFormMode((prev) => ({ ...prev, title: false }));
        }
        break;
      case "message":
        if (value.trim() !== initialValues.message) {
          setFormMode((prev) => ({ ...prev, message: true }));
        } else {
          setFormMode((prev) => ({ ...prev, message: false }));
        }
        break;

      default:
        break;
    }
  }

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
            <div>Edit Announcement </div>
            <Divider />
            <Form
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
              form={form}
              onFinish={onFinish}
              initialValues={initialValues}
            >
              <Form.Item
                label="Title"
                name={"title"}
                rules={[
                  {
                    required: true,
                  },
                  {
                    max: 20,
                    message: "At most 20 characters",
                  },
                ]}
                onChange={onChangeForm}
              >
                <Input name="title" />
              </Form.Item>
              <Form.Item
                label="Message"
                rules={[
                  {
                    required: true,
                  },
                  {
                    max: 100,
                    message: "At most 100 characters",
                  },
                ]}
                name={"message"}
                validateTrigger="onBlur"
                onChange={onChangeForm}
              >
                <TextArea
                  name="message"
                  rows={4}
                  placeholder="Enter your message..."
                />
              </Form.Item>
            </Form>
          </Space>
        </Paper>
        <div className="tw-flex tw-w-[40%]">
          <Button type="primary" danger onClick={() => closeModal()}>
            Cancel
          </Button>

          <SubmitButton
            form={form}
            hasFormChanged={isFormChanged}
            isPending={isPending}
          />

          {/* <Button type="primary" role="submit" htmlType="submit">
            {isPending ? <Spin /> : "Update"}
          </Button> */}
        </div>
      </div>
    </div>
  );
};

const SubmitButton = ({ form, hasFormChanged, isPending }) => {
  const [submittable, setSubmittable] = useState(false);

  const { title, message } = hasFormChanged;

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          if (title || message) {
            setSubmittable(true);
          } else {
            setSubmittable(false);
          }
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values, message, title, form]);

  return (
    <div className="tw-bg-[#f5f3f3] tw-w-full tw-rounded-lg">
      <Button
        htmlType="submit"
        className="tw-bg-[#5295E3]"
        disabled={!submittable}
      >
        {isPending ? <Spin /> : "Update"}
      </Button>
    </div>
  );
};

export const EditAnnouncement = ({ closeModal, announcementDetails }) => {
  return (
    <>
      {createPortal(
        <BackDrop closeModal={closeModal} />,
        document.getElementById("overlay")
      )}
      {createPortal(
        <ModalOverlay
          closeModal={closeModal}
          announcementDetails={announcementDetails}
        />,
        document.getElementById("timeOff-modal")
      )}
    </>
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func,
  announcementDetails: PropTypes.object,
};

EditAnnouncement.propTypes = {
  closeModal: PropTypes.func,
  announcementDetails: PropTypes.object,
};
SubmitButton.propTypes = {
  hasFormChanged: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  form: PropTypes.object,
  isPending: PropTypes.bool,
};

BackDrop.propTypes = {
  closeModal: PropTypes.func,
};
