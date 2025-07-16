import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CalendarView from "./components/CalendarView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/CalendarView" element={<CalendarView/>} />
    </Routes>
  );
};

export default App;
