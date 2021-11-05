import "./App.css";
import React, { useEffect, useState } from "react";
import Display from "./components/display/Display";
import Buttons from "./components/buttons/Buttons";
import { HashRouter } from "react-router-dom";
import { fromEvent, interval, of } from "rxjs";
import { Observable } from 'rxjs';
import { concatMap, distinctUntilChanged, filter, take, takeUntil, takeWhile } from 'rxjs/operators';

const App_ = React.memo((props) => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState("stop");
  const [touchTime, setTouchTime] = useState(0);

  const isZero = status === "reset" || status === "run";
  let updatedS = isZero ? 0 : time.s,
    updatedM = isZero ? 0 : time.m,
    updatedH = isZero ? 0 : time.h;

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
    setTime({ h: updatedH, m: updatedM, s: updatedS });
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
        setStatus("reset");
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

  const int = interval(1000);

  const sub = int.subscribe(i => console.log(i));
  
  setTimeout(() => {
    sub.unsubscribe();
  }, 4000);

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

const App__ = React.memo((props) => {


  console.log('rerendered');

  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [interv, setInterv] = useState(interval(1000));
  const [status, setStatus] = useState("stop");
  const [touchTime, setTouchTime] = useState(0);

  const isZero = status === "reset" || status === "run";
  let updatedS = isZero ? 0 : time.s,
    updatedM = isZero ? 0 : time.m,
    updatedH = isZero ? 0 : time.h;

  // function runTime increments the time
  // const runTime = () => {
  //   console.log(time.s);
  //   if (time.s >= 60) {
  //     setTime((actual) => {
  //       return {h: actual.h, m: actual.m + 1, s: 0};
  //     });
  //   }
  //   if (time.m >= 60) {
  //     setTime((actual) => {
  //       return {h: actual.h + 1, m: 0, s: actual.s}
  //     });
  //   }
  //   setTime({h: time.h, m: time.m, s: time.s + 1});
  // };

  const runTime = () => {
    if (updatedS >= 60) {
      updatedS = 0;
      updatedM++;
    }
    if (updatedM >= 60) {
      updatedM = 0;
      updatedH++;
    }
    updatedS++;
    setTime({ h: updatedH, m: updatedM, s: updatedS });
  };

  interv.pipe(
    filter(x => x > 3),
    distinctUntilChanged()
  ).subscribe(x => console.log(x))

  
  useEffect(() => {
    console.log(status);
    let sub = interval(1000).pipe(
      takeWhile((v) => status === "run"),
    ).subscribe(runTime);
    console.log(status);
    // if (status !== "run") {
    //   sub.unsubscribe(runTime);
    // }
    // if (status === "run") {
      
    // } else if (status === "stop") {
    //   sub.unsubscribe();
    // }
  }, [status]);

  // interv.pipe(
  //   distinctUntilChanged()
  // ).subscribe(runTime)

  // useEffect(() => )
  // let sub = interv.subscribe(runTime);
  // const sub = interv.subscribe(runTime);
  // if (status === "run") {
  //   let sub = interv.subscribe(runTime);
  // } else if (status === "stop") {
    // sub.unsubscribe();
  //   setTime({ h: 0, m: 0, s: 0 });
  // }

  // functin start starts the stopwatch
  const start = () => {
    // setInterv(setInterval(runTime, 1000));
    // const sub = interv.subscribe(runTime);

    setStatus("run");
  };

  // function wait pauses the stopWatch
  const wait = () => {
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

  // function stop resets the stopWatch and stops it
  const stop = () => {
    setStatus("stop");
  };

  // function stop resets the stopWatch and startsthe stopWatch again
  const reset = () => {
    setStatus("reset");
    setTime({ h: 0, m: 0, s: 0 });
    clearInterval(interv);
    setInterv(setInterval(runTime, 1000));
  };

  // const int = interval(1000);

  // const sub = int.subscribe(i => console.log(i));
  
  // setTimeout(() => {
  //   sub.unsubscribe();
  // }, 4000);

  
 


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

const App___ = React.memo((props) => {


  console.log('rerendered');

  // const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [h, setH] = useState(0);
  const [interv, setInterv] = useState(interval(1000));
  const [status, setStatus] = useState("stop");
  const [touchTime, setTouchTime] = useState(0);

  

  // function runTime increments the time
  const runTime = () => {
    console.log(s);
    if (s >= 60) {
      setS(0);
      setM((actual) => actual + 1);
    }
    if (m >= 60) {
      setM(0);
      setH((actual) => actual + 1);
    }
    setS((actual) => actual + 1);
  };


  
  useEffect(() => {
    console.log(status);
    let sub = interval(1000).pipe(
      takeWhile(() => status !== "run")
    ).subscribe((v) => {
      setS((actual) => actual + 1)
    });
    // if (status !== "run") {
    //   sub.unsubscribe();
    // }
    
    console.log(status);
    
  }, [status]);


  // functin start starts the stopwatch
  const start = () => {

    setStatus("run");
  };

  

  // function stop resets the stopWatch and stops it
  const stop = () => {
    setStatus("stop");
  };

  
 


  return (
    <div className="App">
      <div>
        <h1>Stopwatch</h1>
        <Display s={s} m={m} h={h} />
        <Buttons
          start={start}
          status={status}
          // wait={wait}
          stop={stop}
          // reset={reset}
        />
      </div>
    </div>
  );
});

const App = React.memo((props) => {
  console.log('rerendered');

  // const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [s, setS] = useState(0);
  const [m, setM] = useState(0);
  const [h, setH] = useState(0);
  const [interv, setInterv] = useState(interval(1000));
  const [status, setStatus] = useState("stop");
  const [touchTime, setTouchTime] = useState(0);

  

  // function runTime increments the time
  const runTime = () => {
    console.log(s);
    if (s >= 60) {
      setS(0);
      setM((actual) => actual + 1);
    }
    if (m >= 60) {
      setM(0);
      setH((actual) => actual + 1);
    }
    setS((actual) => actual + 1);
  };


  
  useEffect(() => {
    console.log(status);

    setInterv(actual => {actual.pipe(
      takeWhile(() => status === "run")
    ).subscribe((v) => {
      setS((actual) => actual + 1)
    })})

    // let sub = interv.pipe(
    //   takeWhile(() => status === "run")
    // ).subscribe((v) => {
    //   setS((actual) => actual + 1)
    // });
    // if (status !== "run") {
    //   sub.unsubscribe();
    // }
    
    console.log(status);
    
  }, [status]);


  // functin start starts the stopwatch
  const start = () => {
    setStatus("run");
  };

  // function stop resets the stopWatch and stops it
  const stop = () => {
    setStatus("stop");
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
        />
      </div>
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
