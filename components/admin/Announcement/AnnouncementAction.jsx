import { Button } from "@/components/ui/button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Modal, Spin } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

export const AnnouncementAction = ({
  openModal,
  setModalDetails,
  data,
  isPending,
  delNotification,
}) => {
  const [isModalOpen, setOpen] = useState(false);

  function onEditAnnouncementHandler() {
    openModal(true);
    // console.log(data, "mydata");
    setModalDetails(data);
  }

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const confirmDeletion = () => {
    delNotification(data._id);
    hideModal();
  };

  return (
    <>
      <ul className="tw-flex tw-items-center tw-gap-5">
        <li>
          <Button size="sm" onClick={onEditAnnouncementHandler}>
            Edit
          </Button>
        </li>
        <li>
          <button className="tw-w-max">
            <DeleteOutlineIcon onClick={showModal} />
          </button>
        </li>
      </ul>

      <Modal
        title="Announcement"
        open={isModalOpen}
        onCancel={hideModal}
        footer={(_, { CancelBtn }) => (
          <div className="tw-flex">
            <CancelBtn />
            <Button
              className="tw-h-8 tw-text-white"
              style={{ backgroundColor: "#5295E3" }}
              onClick={confirmDeletion}
            >
              {isPending ? <Spin /> : "Yes"}
            </Button>
          </div>
        )}
      >
        <p>Are you sure you want to delete announcement?</p>
      </Modal>
    </>
  );
};

AnnouncementAction.propTypes = {
  hasFormChanged: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  data: PropTypes.object,
  isPending: PropTypes.bool,
  openModal: PropTypes.func,
  setModalDetails: PropTypes.func,
  deleteAnnouncement: PropTypes.func,
};
