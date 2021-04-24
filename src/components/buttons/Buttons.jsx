import React from "react";
import s from "./Buttons.module.css";

const Buttons = (props) => {
  return (
    <div className={s.stopWatchButtons}>
      {props.status === "stop" && <button onClick={props.start}>Start</button>}
      {props.status === "run" && <button onClick={props.stop}>Stop</button>}
      <button onClick={props.wait}>Wait</button>
      <button>Reset</button>
    </div>
  );
};

export default Buttons;
