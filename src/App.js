import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import { interval } from "rxjs";
import { debounce, debounceTime, share, take, takeUntil, takeWhile } from 'rxjs/operators';


const App = React.memo((props) => {
  console.log('rerendered');

  // const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [h, setH] = useState(0);
  const [interv, setInterv] = useState(interval(1000));
  const [status, setStatus] = useState("stop");
  const [touchTime, setTouchTime] = useState(0);
  
  useEffect(() => {
    console.log(status);

    let sub = interv.pipe(
      takeWhile(() => status === "run")
    ).subscribe((v) => {
      setS((actual) => actual + 1)
    });
    console.log(status);
    return () => {
      sub.unsubscribe();
      setS(0);
    }
  }, [status]);

  useEffect(() => {
    console.log(status);

    let sub = interv.pipe(
      takeWhile(() => status === "reset" && status !== "before_reset"),
    ).subscribe((v) => {
      setS((actual) => actual + 1)
    });
    console.log(status);
    return () => {
      sub.unsubscribe();
      setS(0);
    }
    
  }, [status]);


  // functin start starts the stopwatch
  const start = () => {
    setStatus("run");
  };

  // function stop stops the stopwatch
  const stop = () => {
    setStatus("stop");
  };
  
  const reset = () => {
    setStatus("reset");
    setS(0);

    if (touchTime === 0) {
      setTouchTime(new Date().getTime());
    } else {
      if (new Date().getTime() - touchTime > 0) {
        let sub = interv.pipe(
          takeWhile(() => status === "reset"),
        ).subscribe((v) => {
          setS((actual) => actual + 1)
        });
        sub.unsubscribe();
      } else {
        setTouchTime(new Date().getTime());
      }
      setTouchTime(0)
    }

    // let sub = interv.pipe(
    //   takeWhile(() => status === "reset"),
    // ).subscribe((v) => {
    //   setS((actual) => actual + 1)
    // });
    // console.log(status);
    
      // sub.unsubscribe();
    
  };

  const wait = () => {
    setStatus("wait");

    if (touchTime === 0) {
      setTouchTime(new Date().getTime());
    } else {
      if (new Date().getTime() - touchTime < 300) {
        clearInterval(interv);
        setStatus("reset");
        setTouchTime(0);
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

const Buttons = (props) => {
  return (
    <div className="stopWatchButtons">
      {props.status === "stop" && <button onClick={props.start}>Start</button>}
      {(props.status === "run" || props.status === "reset" || props.status === "wait") && (
        <button onClick={props.stop} className="stopButton">
          Stop
        </button>
      )}
      <button onClick={props.wait}>Wait</button>
      <button onClick={props.reset}>Reset</button>
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
