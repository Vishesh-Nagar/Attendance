import React, { useState } from "react";

function AddSubject({ addSubject, onCancel }) {
    const [formData, setFormData] = useState({
        title: "",
        faculty: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.faculty) {
            addSubject(formData);
            setFormData({ title: "", faculty: "" });
        }
    };

    return (
        <form className="flex flex-col items-center px-1" onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mb-2.5 p-2 w-fit text-center rounded border border-gray-300"
            />
            <input
                type="text"
                name="faculty"
                placeholder="Faculty"
                value={formData.faculty}
                onChange={handleInputChange}
                required
                className="mb-2.5 p-2 w-[200px] text-center rounded border border-gray-300"
            />
            <div className="flex gap-2">
                <button 
                    type="submit"
                    className="px-4 py-2.5 bg-green-500 text-white rounded hover:bg-green-600 transition w-24 h-10 items-center flex justify-center"
                >
                    Add
                </button>
                <button 
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2.5 bg-red-500 text-white rounded hover:bg-red-600 transition w-24 h-10 flex justify-center items-center"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default AddSubject;