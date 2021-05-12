import "./App.css";
import React, { useState } from "react";
import Display from "./components/display/Display";
import Buttons from "./components/buttons/Buttons";
import { HashRouter } from "react-router-dom";
import { concat, interval, Observable, of, Subject } from "rxjs";
import {
  map,
  repeatWhen,
  scan,
  share,
  startWith,
  takeUntil,
  takeWhile,
  cleanInterval,
} from "rxjs/operators";

const App = React.memo((props) => {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hours, setHours] = useState(0);
  // const [interv, setInterv] = useState();
  const [status, setStatus] = useState("stop");
  const [touchTime, setTouchTime] = useState(0);
  const [test, setTest] = useState();

  const stream$ = new Observable((observer) => {
    // setInterval(() => {
    //   observer.next(setSec(sec + 1));
    // }, 1000);
  });
  stream$.subscribe((val) => console.log("val: ", val));

  const zeroingTimer = status === "reset" || status === "run";
  let updatedS = zeroingTimer ? 0 : sec,
    updatedM = zeroingTimer ? 0 : min,
    updatedH = zeroingTimer ? 0 : hours;
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
    console.log(updatedS);
    setHours(updatedH);
    setMin(updatedM);
    setSec(updatedS);
  };

  const start$ = interval(1000)
    .pipe(
      startWith(0),
      scan((time) => time + 1),
      // takeWhile((status) => status !== "stop")
      takeWhile((v) => v < 5)
    )
    .pipe(share());

  const action$ = new Subject();

  const stop$ = concat(start$, of(0)).pipe(repeatWhen(() => action$));

  // const sub = () => start$.subscribe(setSec);
  const a = () => {
    const sub = start$.subscribe(setSec);
  };

  // functin start starts the stopwatch
  const start = () => {
    // const sub = start$.subscribe(setInterv(setInterval(runTime, 1000)));
    start$.subscribe(setSec);
    debugger;
    setStatus("run");
    // return sub.unsubscribe();
  };

  // function wait pauses the stopWatch using double click < 300ms
  // (not doubleClick)
  const wait = () => {
    if (touchTime === 0) {
      setTouchTime(new Date().getTime());
    } else {
      if (new Date().getTime() - touchTime < 300) {
        debugger;
        setTimeout(() => {
          start$.unsubscribe();
        }, 10);

        alert("hello");
        setStatus("stop");
        setTouchTime(0);
      } else {
        setTouchTime(new Date().getTime());
      }
    }
  };

  // function stop resets the stopWatch and stops it
  const stop = () => {
    // clearInterval(interv);
    stop$.subscribe(setSec);
    setStatus("stop");
    setSec(0);
    setMin(0);
    setHours(0);
  };

  // function stop resets the stopWatch and startsthe stopWatch again
  const reset = () => {
    action$.next("reset");
    setSec(0);
    setMin(0);
    setHours(0);
    // clearInterval(interv);
    // setInterv(setInterval(runTime, 1000));
  };

  // learn RxJS

  return (
    <div className="App">
      <div>
        <h1 onClick={a}>{test}sss</h1>
        <h1>Stopwatch</h1>
        <Display sec={sec} min={min} hours={hours} />
        <Buttons
          start={start}
          status={status}
          wait={wait}
          stop={stop}
          reset={reset}
        />
      </div>
      {/* learn RxJS */}
      <div></div>
    </div>
  );
});

const AppWrapper = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

export default AppWrapper;
