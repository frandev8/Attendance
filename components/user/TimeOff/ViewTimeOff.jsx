import { Button } from "antd";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeViewTimeOffModal } from "../../../src/store/main";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  formatAttendanceDate,
  calculateDaysBetween,
} from "../../../utils/date";
import { Badge } from "@/components/ui/badge";

const BackDrop = () => {
  const dispatch = useDispatch();

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
      onClick={() => dispatch(closeViewTimeOffModal())}
    ></div>
  );
};

const ModalOverlay = ({ formData }) => {
  const dispatch = useDispatch();

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
      <Card className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-md ">
        <CardHeader>
          <div className="tw-flex tw-items-center tw-justify-between">
            <CardTitle>Leave Request</CardTitle>
            <Button
              className="tw-ml-auto tw-w-[50px]"
              variant="ghost"
              onClick={() => dispatch(closeViewTimeOffModal())}
            >
              X
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div className="tw-flex tw-flex-col">
              <label className="tw-text-sm tw-font-medium">Start Date</label>
              <div className="tw-text-sm">
                {formatAttendanceDate(formData.startDate)}
              </div>
            </div>
            <div className="tw-flex tw-flex-col">
              <label className="tw-text-sm tw-font-medium">End Date</label>
              <div className="tw-text-sm">
                {formatAttendanceDate(formData.endDate)}
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-col-span-2">
              <label className="tw-text-sm tw-font-medium">Reason</label>
              <div className="tw-text-sm">{formData.reason}</div>
            </div>
            <div className="tw-flex tw-flex-col tw-col-span-2">
              <label className="tw-text-sm tw-font-medium">Type</label>
              <div className="tw-text-sm">{formData.type} Leave </div>
            </div>
            <div className="tw-flex tw-flex-col tw-col-span-2">
              <label className="tw-text-sm tw-font-medium">Days</label>
              <div className="tw-text-sm">
                {calculateDaysBetween(formData.startDate, formData.endDate)}{" "}
                {calculateDaysBetween(formData.startDate, formData.endDate) > 1
                  ? "Days"
                  : "Day"}
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-col-span-2">
              <label className="tw-text-sm tw-font-medium">Status</label>
              <Badge variant="secondary" className="tw-w-max">
                {formData.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const ViewTimeOff = ({ closeModal, formData }) => {
  return (
    <>
      {createPortal(
        <BackDrop closeModal={closeModal} />,
        document.getElementById("overlay")
      )}
      {createPortal(
        <ModalOverlay closeModal={closeModal} formData={formData} />,
        document.getElementById("timeOff-modal")
      )}
    </>
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func,
  formData: PropTypes.object,
};

ViewTimeOff.propTypes = {
  closeModal: PropTypes.func,
  formData: PropTypes.object,
};

BackDrop.propTypes = {
  closeModal: PropTypes.func,
};
