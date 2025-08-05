// src/components/employer/ApplicantRow.jsx
import React from 'react';
import './ApplicantRow.css';

const ApplicantRow = ({ applicant, onClick, onStatusChange }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'New':
        return 'status-new';
      case 'Reviewed':
        return 'status-reviewed';
      case 'Interview':
        return 'status-interview';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <div className="applicant-row" onClick={onClick}>
      <div className="applicant-cell candidate">
        <div className="applicant-avatar">
          {applicant.name.charAt(0)}
        </div>
        <div className="applicant-info">
          <h4>{applicant.name}</h4>
          <p>{applicant.experience} experience</p>
        </div>
      </div>
      <div className="applicant-cell position">
        <p>{applicant.position}</p>
      </div>
      <div className="applicant-cell date">
        <p>{new Date(applicant.date).toLocaleDateString()}</p>
      </div>
      <div className="applicant-cell status">
        <span className={`status-badge ${getStatusClass(applicant.status)}`}>
          {applicant.status}
        </span>
      </div>
      <div className="applicant-cell actions">
        <select
          value={applicant.status}
          onChange={(e) => onStatusChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="status-select"
        >
          <option value="New">New</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button 
          className="view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ApplicantRow;