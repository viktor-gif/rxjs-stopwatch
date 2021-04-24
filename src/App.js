import "./App.css";
import React, { useState } from "react";
import Display from "./components/display/Display";
import Buttons from "./components/buttons/Buttons";

const App = React.memo((props) => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState("stop");
  const [touchTime, setTouchTime] = useState(0);

  let updatedS = status === "reset" || status === "run" ? 0 : time.s,
    updatedM = status === "reset" || status === "run" ? 0 : time.m,
    updatedH = status === "reset" || status === "run" ? 0 : time.h;

  // function runTime increments the time
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

  // functin start starts the stopwatch
  const start = () => {
    setInterv(setInterval(runTime, 1000));

    setStatus("run");
  };

  // function wait pauses the stopWatch
  const wait = () => {
    if (touchTime === 0) {
      setTouchTime(new Date().getTime());
    } else {
      if (new Date().getTime() - touchTime < 300) {
        clearInterval(interv);
        setStatus("stop");
        setTouchTime(0);
      } else {
        setTouchTime(new Date().getTime());
      }
    }
  };

  // function stop resets the stopWatch and stops it
  const stop = () => {
    clearInterval(interv);
    setStatus("stop");
    setTime({ h: 0, m: 0, s: 0 });
  };

  // function stop resets the stopWatch and startsthe stopWatch again
  const reset = () => {
    setStatus("reset");
    setTime({ h: 0, m: 0, s: 0 });
    clearInterval(interv);
    setInterv(setInterval(runTime, 1000));
  };

  return (
    <div className="App">
      <div>
        <h1>Stopwatch</h1>
        <Display time={time} />
        <Buttons
          start={start}
          status={status}
          wait={wait}
          stop={stop}
          reset={reset}
        />
      </div>
    </div>
  );
});

export default App;
