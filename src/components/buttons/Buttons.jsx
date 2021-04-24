import React from "react";
import s from "./Buttons.module.css";

const Buttons = (props) => {
  return (
    <div className={s.stopWatchButtons}>
      {props.status === "stop" && <button onClick={props.start}>Start</button>}
      {(props.status === "run" || props.status === "reset") && (
        <button onClick={props.stop} className={s.stopButton}>
          Stop
        </button>
      )}
      <button onClick={props.wait}>Wait</button>
      <button onClick={props.reset}>Reset</button>
    </div>
  );
};

export default Buttons;
