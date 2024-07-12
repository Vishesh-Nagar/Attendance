import React, { useState } from 'react';
import './Subject.css'

function Subject({ title, faculty, facultyImage, totalClasses, handleDelete }) {
  const [attendance, setAttendance] = useState(0);

  const addAttendance = () => {
    if (attendance < totalClasses) {
      setAttendance(attendance + 1);
    }
  };

  const percentage = (attendance / totalClasses) * 100;

  return (
    <div className="Subject">
      {facultyImage && <img src={facultyImage} alt={faculty} className="faculty-image" />}
      <h2>{title}</h2>
      <p>Faculty: {faculty}</p>
      <button onClick={addAttendance}>Add Attendance</button>
      <div className="progress-bar">
        <progress value={percentage} max="100"></progress>
        <span className="percentage">{percentage.toFixed(2)}%</span>
      </div>
      <button onClick={handleDelete}>Delete Subject</button>
    </div>
  );
}

export default Subject;
