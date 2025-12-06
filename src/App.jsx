import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Task from "./component/Task";
import {Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Box from "./component/Box";
import Register from "./component/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <>
        <Route path="Login" element={<Login/>}/>
        <Route path="/" element={<Task/>}/>
        <Route path="Box" element={<Box/>}/>
        <Route path="Register" element={<Register/>}/>
      </>
    </Routes>
  );
}

export default App;
