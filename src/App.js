import "./App.css";
import React, { useState } from "react";
import Display from "./components/display/Display";
import Buttons from "./components/buttons/Buttons";

const App = React.memo((props) => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  const start = () => {
    runTime();
    setInterval(runTime, 1000);
  };

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

  return (
    <div className="App">
      <div>
        <h1>Stopwatch</h1>
        <Display time={time} />
        <Buttons start={start} />
      </div>
    </div>
  );
});

export default App;
