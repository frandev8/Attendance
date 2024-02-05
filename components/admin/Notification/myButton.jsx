import React from "react";

function MyButton({ delNotification }) {
  function onHandleClick() {
    delNotification("doddsds");
  }

  return <div onClick={onHandleClick}>myButton</div>;
}

export default MyButton;
