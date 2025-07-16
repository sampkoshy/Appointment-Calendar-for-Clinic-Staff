import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CalendarView from "./components/Calendarview"; // ✅ matched correctly

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/CalendarView" element={<CalendarView />} /> {/* ✅ corrected */}
    </Routes>
  );
};

export default App;
