// src/components/employer/JobCard.jsx
import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onEdit, onDelete, onClick }) => {
  return (
    <div className="job-card" onClick={onClick}>
      <div className="job-header">
        <h3>{job.title}</h3>
        <span className={`job-status ${job.status.toLowerCase()}`}>
          {job.status}
        </span>
      </div>
      <div className="job-details">
        <p><i className="fas fa-money-bill-wave"></i> {job.salary}</p>
        <p><i className="fas fa-map-marker-alt"></i> {job.location}</p>
        <p><i className="fas fa-clock"></i> Posted on {new Date(job.posted).toLocaleDateString()}</p>
        <p><i className="fas fa-user-friends"></i> {job.applications} applications</p>
      </div>
      <div className="job-description">
        <p>{job.description}</p>
      </div>
      <div className="job-actions">
        <button className="edit-btn" onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}>
          <i className="fas fa-edit"></i> Edit
        </button>
        <button className="delete-btn" onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}>
          <i className="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;