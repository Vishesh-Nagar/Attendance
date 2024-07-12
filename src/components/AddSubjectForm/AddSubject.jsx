import React, { useState } from 'react';
import './AddSubject.css';

function AddSubject({ addSubject }) {
  const [formData, setFormData] = useState({ title: '', faculty: '', totalClasses: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.faculty && formData.totalClasses) {
      addSubject(formData);
      setFormData({ title: '', faculty: '', totalClasses: '' });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="faculty"
        placeholder="Faculty"
        value={formData.faculty}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="totalClasses"
        placeholder="Total Classes"
        value={formData.totalClasses}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Add Subject</button>
    </form>
  );
}

export default AddSubject;