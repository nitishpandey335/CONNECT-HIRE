import React, { useState } from 'react';
import './JobRequestForm.css';

const JobRequestForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    budget: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.budget <= 0) {
      alert("Budget must be greater than 0.");
      return;
    }

    if (new Date(formData.deadline) < new Date()) {
      alert("Deadline must be a future date.");
      return;
    }

    console.log('Job Request Submitted:', formData);

    // Optional: Reset form after submission
    setFormData({
      jobTitle: '',
      description: '',
      budget: '',
      deadline: ''
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="job-form">
        <h2>New Job Request</h2>

        <div className="input-group">
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
          <label htmlFor="jobTitle">Job Title</label>
        </div>

        <div className="input-group">
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Description</label>
        </div>

        <div className="form-row">
          <div className="input-group">
            <input
              type="number"
              id="budget"
              name="budget"
              min="1"
              value={formData.budget}
              onChange={handleChange}
              required
            />
            <label htmlFor="budget">Budget (Rs.)</label>
          </div>

          <div className="input-group">
            <input
              type="date"
              id="deadline"
              name="deadline"
              min={new Date().toISOString().split("T")[0]}
              value={formData.deadline}
              onChange={handleChange}
              required
            />
            <label htmlFor="deadline">Deadline</label>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Post Job
          <span className="btn-edge"></span>
        </button>
      </form>
    </div>
  );
};

export default JobRequestForm;
