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
    console.log('Job Request Submitted:', formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="job-form">
        <h2>New Job Request</h2>
        
        <div className="input-group">
          <input 
            type="text" 
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
          <label>Job Title</label>
        </div>
        
        <div className="input-group">
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label>Description</label>
        </div>
        
        <div className="form-row">
          <div className="input-group">
            <input 
              type="number" 
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            />
            <label>Budget ($)</label>
          </div>
          
          <div className="input-group">
            <input 
              type="date" 
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
            <label>Deadline</label>
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