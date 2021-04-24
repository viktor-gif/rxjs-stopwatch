import React from "react";
import s from "./Buttons.module.css";

const Buttons = (props) => {
  return (
    <div className={s.stopWatchButtons}>
      <button>Start / Stop</button>
      <button>Wait</button>
      <button>Reset</button>
    </div>
  );
};

export default Buttons;
