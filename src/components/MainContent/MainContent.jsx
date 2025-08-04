import { useState, useEffect } from "react";
import { getSubjects, saveSubjects } from "../Data/Data";
import AddSubject from "../AddSubjectForm/AddSubject";
import Subject from "../Subject/Subject";

function MainContent() {
    const [subjects, setSubjects] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

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
        setIsFormVisible(false);
    };

    const handleCancel = () => {
        setIsFormVisible(false);
    };

    const handleShowForm = () => {
        setIsFormVisible(true);
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

    const deleteSubject = (index) => {
        const updatedSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(updatedSubjects);
        saveSubjects(updatedSubjects);
    };

    return (
        <div className="flex flex-col items-center p-5 bg-zinc-800 min-h-screen">
            {isFormVisible ? (
                <div className="flex flex-col items-center justify-center mb-5 w-[220px] bg-gray-700 rounded-lg shadow-md p-4 border border-gray-300">
                    <AddSubject
                        addSubject={addSubject}
                        onCancel={handleCancel}
                    />
                </div>
            ) : (
                <button
                    onClick={handleShowForm}
                    className="px-4 py-2.5 bg-green-500 text-white rounded hover:bg-green-600 transition mb-5"
                >
                    Add Subject
                </button>
            )}
            <hr className="w-[90%] border-t border-gray-400 mt-2 mb-1" />

            <div className="flex flex-wrap justify-center items-start gap-5 w-full max-w-[900px] mt-5">
                {subjects.map((subject, index) => {
                    const totalClasses = subject.present + subject.absent;
                    const percentage =
                        totalClasses > 0
                            ? (subject.present / totalClasses) * 100
                            : 0;

                    return (
                        <Subject
                            key={index}
                            title={subject.title}
                            faculty={subject.faculty}
                            present={subject.present}
                            absent={subject.absent}
                            totalClasses={totalClasses}
                            percentage={percentage}
                            markPresent={() => markPresent(index)}
                            markAbsent={() => markAbsent(index)}
                            handleDelete={() => deleteSubject(index)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default MainContent;