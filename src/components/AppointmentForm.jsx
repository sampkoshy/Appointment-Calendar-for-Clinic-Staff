import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ date, onClose, onSave, editData = null }) => {
  const patients = ["Alice", "Bob", "Charlie"];
  const doctors = ["Dr. Smith", "Dr. Adams", "Dr. John"];

  // If editing, use existing data; else use defaults
  const [patient, setPatient] = useState(editData ? editData.patient : patients[0]);
  const [doctor, setDoctor] = useState(editData ? editData.doctor : doctors[0]);
  const [time, setTime] = useState(editData ? editData.time : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: editData ? editData.id : Date.now(), // generate id if new
      date,
      patient,
      doctor,
      time,
    };

    onSave(newAppointment);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{editData ? "Edit" : "Book"} Appointment for {date}</h3>
        <form onSubmit={handleSubmit}>
          <label>Patient:</label>
          <select value={patient} onChange={(e) => setPatient(e.target.value)}>
            {patients.map((p, i) => (
              <option key={i}>{p}</option>
            ))}
          </select>

          <label>Doctor:</label>
          <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
            {doctors.map((d, i) => (
              <option key={i}>{d}</option>
            ))}
          </select>

          <label>Time:</label>
          <input
            type="time"
            value={time}
            required
            onChange={(e) => setTime(e.target.value)}
          />

          <div className="form-buttons">
            <button type="submit">{editData ? "Update" : "Save"}</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
