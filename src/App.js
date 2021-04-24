import "./App.css";
import React, { useState } from "react";
import Display from "./components/display/Display";
import Buttons from "./components/buttons/Buttons";

const App = React.memo((props) => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  return (
    <div className="App">
      <div>
        <h1>Stopwatch</h1>
        <Display time={time} />
        <Buttons />
      </div>
    </div>
  );
});

export default App;
