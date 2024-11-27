import React, { useState, useEffect } from "react";
import { getSubjects, saveSubjects } from "../Data/Data";
import "./MainContent.css";
import AddSubject from "../AddSubjectForm/AddSubject";

function MainContent() {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        setSubjects(getSubjects());
    }, []);

    const addSubject = (newSubject) => {
        const updatedSubjects = [
            ...subjects,
            { ...newSubject, present: 0, absent: 0 },
        ];
        setSubjects(updatedSubjects);
        saveSubjects(updatedSubjects);
    };

    const markPresent = (index) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].present += 1;
        setSubjects(updatedSubjects);
        saveSubjects(updatedSubjects);
    };

    const markAbsent = (index) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].absent += 1;
        setSubjects(updatedSubjects);
        saveSubjects(updatedSubjects);
    };

    return (
        <div className="container">
            <div className="form-box">
                <AddSubject addSubject={addSubject} />
            </div>

            <div className="subjects">
                {subjects.map((subject, index) => {
                    const totalClasses = subject.present + subject.absent;
                    const percentage =
                        totalClasses > 0
                            ? (subject.present / totalClasses) * 100
                            : 0;

                    const progressClass =
                        percentage >= 75 ? "sufficient" : "low";

                    return (
                        <div className="subject-card" key={index}>
                            <h3 className="subject-title">{subject.title}</h3>
                            <p className="faculty">
                                Faculty: {subject.faculty}
                            </p>
                            <p>Total Classes: {totalClasses}</p>
                            <p>Present: {subject.present}</p>
                            <p>Absent: {subject.absent}</p>
                            <button
                                className="attendance-button-present"
                                onClick={() => markPresent(index)}
                            >
                                Present
                            </button>
                            <button
                                className="attendance-button-absent"
                                onClick={() => markAbsent(index)}
                            >
                                Absent
                            </button>
                            <div className="progress-bar">
                                <progress
                                    value={percentage || 0}
                                    max="100"
                                    className={progressClass}
                                ></progress>
                                <span className="percentage">
                                    {percentage.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MainContent;