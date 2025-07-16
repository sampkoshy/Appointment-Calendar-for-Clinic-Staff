import React, { useState, useEffect } from "react";
import "./CalendarView.css";
import AppointmentForm from "./AppointmentForm";

const Calendarview = () => {
  const today = new Date();
  const [editAppointment, setEditAppointment] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileDate, setMobileDate] = useState(today.toISOString().split("T")[0]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);
// mobileview
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = () => {
    return new Date(currentYear, currentMonth, 1).getDay();
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day).toDateString();
    setSelectedDate(clickedDate);
    setEditAppointment(null);
    setShowForm(true);
  };

  const getAppointmentsForDay = (day) => {
    const dateStr = new Date(currentYear, currentMonth, day).toDateString();
    return appointments.filter((a) => a.date === dateStr);
  };

  const renderCalendarCells = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth();
    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="cell empty"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(currentYear, currentMonth, day);
      const todayObj = new Date();
      todayObj.setHours(0, 0, 0, 0);
      const isPast = dateObj < todayObj;

      const dailyAppointments = getAppointmentsForDay(day);

      cells.push(
        <div
          key={day}
          className={`cell ${isPast ? "past-date" : ""}`}
          onClick={() => {
            if (!isPast) handleDateClick(day);
          }}
        >
          <div className="cell-date">{day}</div>
          {dailyAppointments.map((appt, i) => (
            <div
              key={i}
              className="appt"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDate(appt.date);
                setEditAppointment(appt);
                setShowForm(true);
              }}
            >
              <strong>{appt.time}</strong><br />
              {appt.patient} with <em>{appt.doctor}</em>
            </div>
          ))}
        </div>
      );
    }

    return cells;
  };

  const renderMobileView = () => {
    const selected = new Date(mobileDate);
    const dateStr = selected.toDateString();
    const day = selected.getDate();
    const appointmentsForDay = getAppointmentsForDay(day);

    return (
      <div className="mobile-view">
        <input
          type="date"
          value={mobileDate}
          onChange={(e) => setMobileDate(e.target.value)}
          className="date-picker"
        />

        <div className="mobile-day-box" onClick={() => handleDateClick(day)}>
          <div className="cell-date">{day}</div>
          {appointmentsForDay.map((appt, i) => (
            <div
              key={i}
              className="appt"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDate(appt.date);
                setEditAppointment(appt);
                setShowForm(true);
              }}
            >
              <strong>{appt.time}</strong><br />
              {appt.patient} with <em>{appt.doctor}</em>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">
        {new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "long",
        })}{" "}
        {currentYear}
      </h2>

      {isMobile ? (
        renderMobileView()
      ) : (
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
          {renderCalendarCells()}
        </div>
      )}

      {showForm && (
        <AppointmentForm
          date={selectedDate}
          editData={editAppointment}
          onClose={() => {
            setShowForm(false);
            setEditAppointment(null);
          }}
          onSave={(appt) => {
            const updated = editAppointment
              ? appointments.map((a) => (a.id === editAppointment.id ? appt : a))
              : [...appointments, { ...appt, id: Date.now() }];

            setAppointments(updated);
            localStorage.setItem("appointments", JSON.stringify(updated));
            setShowForm(false);
            setEditAppointment(null);
          }}
        />
      )}
    </div>
  );
};

export default Calendarview;
