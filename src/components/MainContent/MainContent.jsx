import React, { useState, useEffect } from 'react';
import { getSubjects, saveSubjects } from '../Data/Data';
import AddSubject from '../AddSubjectForm/AddSubject';
import '../Subject/Subject';
import Faculty from '../../assets/Faculty.jpg';

function MainContent() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    setSubjects(getSubjects());
  }, []);

  const addSubject = (newSubject) => {
    const updatedSubjects = [...subjects, { ...newSubject, attendance: 0 }];
    setSubjects(updatedSubjects);
    saveSubjects(updatedSubjects);
  };

  const addAttendance = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].attendance = (updatedSubjects[index].attendance || 0) + 1;
    setSubjects(updatedSubjects);
    saveSubjects(updatedSubjects);
  };

  return (
    <div className="container">
      <div className="form-box">
        <AddSubject addSubject={addSubject} />
      </div>
      <div className="subjects">
        {subjects.map((subject, index) => (
          <div className="subject-card" key={index}>
            <img className="faculty-image" src={Faculty} alt="Faculty" />
            <h3 className="subject-title">{subject.title}</h3>
            <p className="faculty">Faculty: {subject.faculty}</p>
            <p>Attendance: {subject.attendance || 0}</p>
            <p className="total-classes">Total Classes: {subject.totalClasses}</p>
            <button className='attendance-button' onClick={() => addAttendance(index)}>Add Attendance</button>
            <div className="progress-bar">
              <progress value={(subject.attendance || 0) / subject.totalClasses * 100} max="100"></progress>
              <span className="percentage">{((subject.attendance || 0) / subject.totalClasses * 100).toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainContent;
