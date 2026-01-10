import { useState } from "react";
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
        <Route path="/" element={<Login/>}/>
        <Route path="Home" element={<Task/>}/>
        <Route path="Box" element={<Box/>}/>
        <Route path="Register" element={<Register/>}/>
      </>
    </Routes>
  );
}

export default App;
