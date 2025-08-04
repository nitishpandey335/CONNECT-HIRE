import React from 'react';
import './Applications.css';

const Applications = () => {
  const applications = [
    {
      id: 1,
      jobId: 1,
      status: 'Submitted',
      date: '2023-10-20',
      company: 'Tech Innovations Inc.',
      position: 'Senior React Developer',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000'
    },
    {
      id: 2,
      jobId: 2,
      status: 'Review',
      date: '2023-10-18',
      company: 'Creative Solutions',
      position: 'UX/UI Designer',
      location: 'Remote',
      salary: '$90,000 - $110,000'
    }
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'status-submitted';
      case 'review':
        return 'status-review';
      case 'interview scheduled':
        return 'status-interview';
      case 'rejected':
        return 'status-rejected';
      case 'offered':
        return 'status-offered';
      default:
        return '';
    }
  };

  return (
    <div className="applications-container">
      <h2>My Applications</h2>
      <div className="applications-list">
        {applications.length > 0 ? (
          applications.map((application) => (
            <div key={application.id} className="application-card">
              <div className="application-header">
                <h3>{application.position}</h3>
                <span className={`status-badge ${getStatusClass(application.status)}`}>
                  {application.status}
                </span>
              </div>
              <div className="application-company">{application.company}</div>
              <div className="application-details">
                <div className="detail-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{application.location}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-dollar-sign"></i>
                  <span>{application.salary}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-calendar-alt"></i>
                  <span>Applied: {application.date}</span>
                </div>
              </div>
              <div className="application-actions">
                <button className="action-btn view-btn">
                  <i className="fas fa-eye"></i> View Details
                </button>
                <button className="action-btn withdraw-btn">
                  <i className="fas fa-trash-alt"></i> CancelApplication
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-applications">
            <i className="fas fa-briefcase"></i>
            <p>You haven't applied to any jobs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;