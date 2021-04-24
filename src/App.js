import "./App.css";
import React, { useState } from "react";
import Display from "./components/display/Display";
import Buttons from "./components/buttons/Buttons";

const App = React.memo((props) => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState("stop");

  let updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const runTime = () => {
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    updatedS++;
    return setTime({ h: updatedH, m: updatedM, s: updatedS });
  };

  const start = () => {
    setInterv(setInterval(runTime, 1000));

    setStatus("run");
  };
  const wait = () => {
    clearInterval(interv);
    setStatus("stop");
  };
  const stop = () => {
    clearInterval(interv);
    setStatus("stop");
    setTime({ h: 0, m: 0, s: 0 });
  };

  return (
    <div className="App">
      <div>
        <h1>Stopwatch</h1>
        <Display time={time} />
        <Buttons start={start} status={status} wait={wait} stop={stop} />
      </div>
    </div>
  );
});

export default App;
