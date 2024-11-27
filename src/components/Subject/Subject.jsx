import React, { useState } from "react";
import "./Subject.css";

function Subject({ title, faculty, facultyImage, handleDelete }) {
    const [present, setPresent] = useState(0);
    const [absent, setAbsent] = useState(0);

    const totalClasses = present + absent;

    const addPresent = () => {
        setPresent(present + 1);
    };

    const addAbsent = () => {
        setAbsent(absent + 1);
    };

    const percentage = totalClasses > 0 ? (present / totalClasses) * 100 : 0;

    return (
        <div className="Subject">
            {facultyImage && (
                <img
                    src={facultyImage}
                    alt={faculty}
                    className="faculty-image"
                />
            )}
            <h2>{title}</h2>
            <p>Faculty: {faculty}</p>
            <button onClick={addPresent}>Present</button>
            <button onClick={addAbsent}>Absent</button>
            <div className="progress-bar">
                <progress value={percentage} max="100"></progress>
                <span className="percentage">{percentage.toFixed(2)}%</span>
            </div>
            <p>Present: {present}</p>
            <p>Absent: {absent}</p>
            <p>Total: {totalClasses}</p>
            {/* <button onClick={handleDelete}>Delete Subject</button> */}
        </div>
    );
}

export default Subject;
