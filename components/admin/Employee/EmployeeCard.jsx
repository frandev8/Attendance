import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatAttendanceDate } from "@/utils/date";
import {
  deleteEmployee,
  queryClient,
  toggleEmployeeActiveness,
} from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import { Modal, Spin } from "antd";
import { useState } from "react";

export default function EmployeeCard({ data }) {
  const [isParalyzeModalOpen, setParalyzeOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteOpen] = useState(false);
  const [isReviveModalOpen, setReviveOpen] = useState(false);

  const { isPending: isDeletePending, mutate: delEmployee } = useMutation({
    queryFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee", { type: "subscribed" }],
      });
    },
  });

  const { isPending: isDeactivatePending, mutate: deactivateEmployee } =
    useMutation({
      queryFn: toggleEmployeeActiveness,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["employee", { type: "subscribed" }],
        });
      },
    });

  const { isPending: isActivatePending, mutate: activateEmployee } =
    useMutation({
      queryFn: toggleEmployeeActiveness,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["employee", { type: "subscribed" }],
        });
      },
    });

  const showDeactivateModal = () => {
    setParalyzeOpen(true);
  };
  const showActivateModal = () => {
    setReviveOpen(true);
  };

  const hideDeleteModal = () => {
    setDeleteOpen(false);
  };

  const showDeleteModal = () => {
    setDeleteOpen(true);
  };

  const hideDeactivate = () => {
    setParalyzeOpen(false);
  };

  const hideActivate = () => {
    setReviveOpen(false);
  };

  const confirmDeletion = () => {
    delEmployee({ id: data._id });
    hideDeleteModal();
  };

  const confirmActivating = () => {
    activateEmployee({ id: data._id, action: "activate" });
    hideActivate();
  };

  const confirmDeactivating = () => {
    deactivateEmployee({ id: data._id, action: "deactivate" });
    hideDeactivate();
  };

  return (
    <>
      <Card className="tw-max-w-md tw-mx-auto">
        <CardHeader>
          <div className="tw-flex tw-items-center tw-gap-3">
            <Avatar className="tw-h-14 tw-w-14">
              <AvatarImage alt="Employee Name" src="/placeholder-avatar.jpg" />
              <AvatarFallback>EN</AvatarFallback>
            </Avatar>
            <div className="tw-grid tw-gap-0.5">
              <div className="tw-font-medium tw-text-lg">
                {data.firstname} {data.lastname}{" "}
              </div>
              <div className="tw-text-sm tw-text-gray-500 tw-dark:text-gray-400">
                Position
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="tw-grid tw-gap-2 tw-text-sm">
            <div className="tw-flex tw-items-center tw-gap-2">
              <MailIcon className="tw-h-5 tw-w-5 tw-text-gray-500 tw-dark:text-gray-400" />
              <div>{data.email}</div>
            </div>
            <div className="tw-flex tw-items-center tw-gap-2">
              <PhoneIcon className="tw-h-5 tw-w-5 tw-text-gray-500 tw-dark:text-gray-400" />
              <div>+233 {data.phone}</div>
            </div>
            <div className="tw-flex tw-items-center tw-gap-2">
              <CalendarIcon className="tw-h-5 tw-w-5 tw-text-gray-500 tw-dark:text-gray-400" />
              <div>Joined on {formatAttendanceDate(data.createdAt)}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="tw-flex tw-justify-end tw-gap-2">
          <Button size="icon" variant="outline" onClick={showDeleteModal}>
            <TrashIcon className="tw-h-5 tw-w-5" />
            <span className="tw-sr-only">Delete Employee</span>
          </Button>
          {data.activate ? (
            <Button size="icon" variant="outline" onClick={showDeactivateModal}>
              <MinusCircleIcon
                className="h-5 w-5 "
                style={{ color: "#00ff00" }}
              />
              <span className="tw-sr-only">Deactivate Employee</span>
            </Button>
          ) : (
            <Button size="icon" variant="outline" onClick={showActivateModal}>
              <MinusCircleIcon
                className="h-5 w-5 "
                style={{ color: "#ff0000" }}
              />
              <span className="tw-sr-only">Activate Employee</span>
            </Button>
          )}
        </CardFooter>
      </Card>

      <Modal
        title="Notification"
        open={isDeleteModalOpen}
        onCancel={hideDeleteModal}
        footer={(_, { CancelBtn }) => (
          <div className="tw-flex">
            <CancelBtn />
            <Button
              className="tw-bg-[#5295E3] tw-h-8 tw-text-white"
              onClick={confirmDeletion}
            >
              {isDeletePending ? <Spin /> : "Yes"}
            </Button>
          </div>
        )}
      >
        <p>Are you sure you want to remove employee?</p>
      </Modal>
      <Modal
        title="Deactivate Employee"
        open={isParalyzeModalOpen}
        onCancel={hideDeactivate}
        footer={(_, { CancelBtn }) => (
          <div className="tw-flex">
            <CancelBtn />
            <Button
              className="tw-bg-[#5295E3] tw-h-8 tw-text-white"
              onClick={confirmDeactivating}
            >
              {isDeactivatePending ? <Spin /> : "Yes"}
            </Button>
          </div>
        )}
      >
        <p>Are you sure you want to deactivate employee?</p>
      </Modal>
      <Modal
        title="Activate Employee "
        open={isReviveModalOpen}
        onCancel={hideActivate}
        footer={(_, { CancelBtn }) => (
          <div className="tw-flex">
            <CancelBtn />
            <Button
              className="tw-bg-[#5295E3] tw-h-8 tw-text-white"
              onClick={confirmActivating}
            >
              {isActivatePending ? <Spin /> : "Yes"}
            </Button>
          </div>
        )}
      >
        <p>Are you sure you want to activate employee?</p>
      </Modal>
    </>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MinusCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
