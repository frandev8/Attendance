import { createPortal } from "react-dom";

const BackDrop = () => {
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
    ></div>
  );
};

const ModalOverlay = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        transition: "translateX(-50px)",
        zIndex: "100",
      }}
    ></div>
  );
};

export const NewTimeOff = () => {
  <>
    {createPortal(<BackDrop />, document.getElementById("overlay"))}
    {createPortal(<ModalOverlay />, document.getElementById("timeOff-modal"))}
  </>;
};
