import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Calenderview from "./components/Calendarview";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Calendarview" element={<Calenderview/>} />
    </Routes>
  );
};

export default App;
