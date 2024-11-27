export const getSubjects = () => {
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    return subjects;
};

export const saveSubjects = (subjects) => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
};