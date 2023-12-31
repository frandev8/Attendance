import Paper from "@mui/material/Paper";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Spin,
} from "antd";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postTimeOff, queryClient } from "../../../utils/http";
import { isTimeOffFormValid } from "../../../utils/joiValidation";

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
  const textAreaRef = useRef();
  const [timeOffType, setTimeOffType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const userId = useSelector((state) => state.user.userId);

  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postTimeOff,
    onSuccess: () => {
      // queryClient.invalidateQueries({queryKey:[""]})
      navigate("../");
    },
  });

  const handleTimeOffType = (value) => {
    setTimeOffType(value);
  };

  const handleStartDateChange = (date, dateString) => {
    setStartDate(dateString);
  };
  const handleEndDateChange = (date, dateString) => {
    setEndDate(dateString);
  };

  const handleNewTimeOffForm = () => {
    console.log(textAreaRef.current.resizableTextArea.textArea.value);
    const formData = {
      type: timeOffType,
      startDate,
      endDate,
      reason: textAreaRef.current.resizableTextArea.textArea.value?.trim(),
    };

    const { error } = isTimeOffFormValid(formData);
    if (error) {
      return;
    }
    mutate({ formData: formData, id: userId });
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
      <div className={"flex flex-col items-end "}>
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
            <div>Request Time Off </div>
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
            >
              <Form.Item label="Type">
                <Select
                  placeholder="Select Leave Type"
                  onChange={handleTimeOffType}
                >
                  <Select.Option value="casual">casual</Select.Option>
                  <Select.Option value="sick">sick</Select.Option>
                  <Select.Option value="earned">earned</Select.Option>
                  <Select.Option value="adjustment">adjustment</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Start Date">
                <DatePicker onChange={handleStartDateChange} />
              </Form.Item>
              <Form.Item label="End Date">
                <DatePicker onChange={handleEndDateChange} />
              </Form.Item>
              <Form.Item label="Reason">
                <TextArea
                  rows={4}
                  ref={textAreaRef}
                  placeholder="What's the reason?"
                />
              </Form.Item>
            </Form>
          </Space>
        </Paper>
        <div className="flex w-[40%]">
          <Button type="primary" danger onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleNewTimeOffForm}>
            {isPending ? <Spin /> : "Done"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const NewTimeOff = ({ closeModal }) => {
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

NewTimeOff.propTypes = {
  closeModal: PropTypes.func,
};

BackDrop.propTypes = {
  closeModal: PropTypes.func,
};
