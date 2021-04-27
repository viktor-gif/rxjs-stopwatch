import React from "react";
import s from "./Display.module.css";

const Display = (props) => {
  return (
    <div className={s.watch}>
      <span>{props.hours >= 10 ? props.hours : "0" + props.hours}</span>
      &nbsp;:&nbsp;
      <span>{props.min >= 10 ? props.min : "0" + props.min}</span>
      &nbsp;:&nbsp;
      <span>{props.sec >= 10 ? props.sec : "0" + props.sec}</span>
    </div>
  );
};

export default Display;
