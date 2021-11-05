import React from "react";
import styles from "./Display.module.css";

const Display = ({s, m, h}) => {
  return (
    <div className={styles.watch}>
      <span>{h >= 10 ? h : "0" + h}</span>
      &nbsp;:&nbsp;
      <span>{m >= 10 ? m : "0" + m}</span>
      &nbsp;:&nbsp;
      <span>{s >= 10 ? s : "0" + s}</span>
    </div>
  );
};

export default Display;
