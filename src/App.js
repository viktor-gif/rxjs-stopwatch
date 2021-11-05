import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import { interval } from "rxjs";
import { takeWhile } from 'rxjs/operators';


const App = React.memo((props) => {

  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [h, setH] = useState(0);
  const [status, setStatus] = useState("stop");
  const [touchTime, setTouchTime] = useState(0);

  //useEffect depends on the status 
  useEffect(() => {

    let sub = interval(1000).pipe(
      takeWhile(() => status === "run" || status === "reset" || status === "continue")
    ).subscribe((v) => {
      setS((actual) => actual + 1)
    });
    
    if (status !== "wait" && status !== "continue") {
      zeroingStopwatch();
    }

    return () => {
      sub.unsubscribe();
    }

  }, [status]);

  const zeroingStopwatch = () => {
    setS(0);
    setM(0);
    setH(0);
  }
  
  // formatting the stopwatch
  if (s === 60) {
    setS(0);
    setM(actual => actual + 1);
  }
  if (m === 60) {
    setM(0);
    setH(actual => actual + 1);
  }

  // functin start starts the stopwatch
  const start = () => {
    setStatus("run");
  };

  // function stop stops and resets the stopwatch
  const stop = () => {
    setStatus("stop");
  };
  
  // function reset resets the stopwatch and continues from start(zero)
  const reset = () => {
    zeroingStopwatch();
    setStatus("reset");
  };

  // function wait stops the stopwatch (2 clicks, debounce < 300ms) and continues (1 click)
  const wait = () => {
    setStatus("continue");
    if (touchTime === 0) {
      setTouchTime(new Date().getTime());
    } else {
      if (new Date().getTime() - touchTime < 300) {
        setStatus("wait");
      } else {
        setTouchTime(new Date().getTime());
      }
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Stopwatch</h1>
        <Display s={s} m={m} h={h} />
        <Buttons
          start={start}
          status={status}
          s={s}
          stop={stop}
          reset={reset}
          wait={wait}
        />
      </div>
    </div>
  );
});

const Display = ({s, m, h}) => {
  return (
    <div className="watch">
      <span>{h >= 10 ? h : "0" + h}</span>
      &nbsp;:&nbsp;
      <span>{m >= 10 ? m : "0" + m}</span>
      &nbsp;:&nbsp;
      <span>{s >= 10 ? s : "0" + s}</span>
    </div>
  );
};

const Buttons = ({start, stop, wait, reset, status}) => {
  const isStopButton = status === "run" 
  || status === "reset" 
  || status === "wait" 
  || status === "continue";
  return (
    <div className="stopWatchButtons">
      {status === "stop" && <button onClick={start}>Start</button>}
      {isStopButton && (
        <button onClick={stop} className="stopButton">
          Stop
        </button>
      )}
      <button onClick={wait}>Wait</button>
      <button onClick={reset} id="reset">Reset</button>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

export default AppWrapper;
