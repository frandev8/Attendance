import { Settings } from "@mui/icons-material";
import React from "react";

function Today() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex items-center">
        <img src="../../../src/assets/Icons/sunshine.svg" alt="" />
        <div>
          <p>8:02:09 AM</p>
          <p>Realtime Insight</p>
        </div>
      </div>
      <div>
        <span>Today:</span> <br />
        <span>2nd August 2023</span>
      </div>
      <div>
        <button>
          <Settings /> Advanced configuration
        </button>
      </div>
    </div>
  );
}

export default Today;
