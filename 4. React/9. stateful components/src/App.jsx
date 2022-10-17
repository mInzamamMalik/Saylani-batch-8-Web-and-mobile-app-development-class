import { useState } from "react";

import './App.css';

function App() {

  let a = 5;
  const [num, setNum] = useState(5);

  console.log("render");

  return (
    <div>
      noraml variable: {a}
      <br />
      state variable: {num}
      <br />

      <button onClick={() => {

        console.log(num);
        const randomNumber = Math.floor(Math.random() * 100);

        console.log(num);

        setNum(num + 1);

      }}>Add variables</button>

    </div>
  );
}

export default App;
