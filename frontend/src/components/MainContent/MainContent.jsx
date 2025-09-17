import { useState, useEffect } from "react";
import { getSubjects, saveSubjects, patchSubject } from "../Data/Data";
import AddSubject from "../AddSubjectForm/AddSubject";
import Subject from "../Subject/Subject";
import { useCallback } from "react";

function MainContent() {
    const [subjects, setSubjects] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [auth, setAuth] = useState({ authenticated: false });

    useEffect(() => {
        let mounted = true;
        (async () => {
            const loaded = await getSubjects();
            if (mounted) setSubjects(loaded || []);
        })();
        return () => { mounted = false; };
    }, []);

    const checkAuth = useCallback(async () => {
        try {
            const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
            const res = await fetch(`${BACKEND}/api/me/`, { credentials: 'include' });
            if (!res.ok) return setAuth({ authenticated: false });
            const data = await res.json();
            setAuth(data);
        } catch (e) {
            setAuth({ authenticated: false });
        }
    }, []);

    useEffect(() => { checkAuth(); }, [checkAuth]);

    useEffect(() => {
        const handler = (e) => {
            const detail = e?.detail || {};
            if (detail.authenticated) {
                // reload subjects from server when logged in
                (async () => {
                    const loaded = await getSubjects();
                    setSubjects(loaded || []);
                })();
            } else {
                // clear subjects when logged out
                setSubjects([]);
            }
            setAuth(detail);
        };
        window.addEventListener('authChanged', handler);
        return () => window.removeEventListener('authChanged', handler);
    }, []);

    const addSubject = (newSubject) => {
        const updatedSubjects = [
            ...subjects,
            { ...newSubject, present: 0, absent: 0 },
        ];
    setSubjects(updatedSubjects);
    (async () => {
        const saved = await saveSubjects(updatedSubjects).catch(() => null);
        if (saved && Array.isArray(saved)) {
            setSubjects(saved);
        }
    })();
        setIsFormVisible(false);
    };

    const handleCancel = () => {
        setIsFormVisible(false);
    };

    const handleShowForm = () => {
        setIsFormVisible(true);
    };

    const markPresent = async (index) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].present += 1;
        setSubjects(updatedSubjects);

        const id = updatedSubjects[index].id;
        if (id) {
            const patched = await patchSubject(id, { present: updatedSubjects[index].present });
            if (!patched) saveSubjects(updatedSubjects).catch(() => {});
        } else {
            saveSubjects(updatedSubjects).catch(() => {});
        }
    };

    const markAbsent = async (index) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].absent += 1;
        setSubjects(updatedSubjects);

        const id = updatedSubjects[index].id;
        if (id) {
            const patched = await patchSubject(id, { absent: updatedSubjects[index].absent });
            if (!patched) saveSubjects(updatedSubjects).catch(() => {});
        } else {
            saveSubjects(updatedSubjects).catch(() => {});
        }
    };

    const deleteSubject = (index) => {
        const updatedSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(updatedSubjects);
        saveSubjects(updatedSubjects);
    };

    if (!auth.authenticated) {
        return (
            <div className="flex flex-col items-center p-5 bg-zinc-800 min-h-screen text-white">
                <div className="text-xl">Please sign in to manage attendance.</div>
            </div>
        );
    }

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