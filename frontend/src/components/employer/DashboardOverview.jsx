// src/components/employer/DashboardOverview.jsx
import React from 'react';
import './DashboardOverview.css';

const DashboardOverview = ({ jobs, applications, onViewJobs, onViewApplicants }) => {
  const activeJobs = jobs.filter(job => job.status === 'Active').length;
  const newApplications = applications.filter(app => app.status === 'New').length;

  return (
    <div className="dashboard-overview">
  
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e3f2fd' }}>
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="stat-info">
            <h3>{jobs.length}</h3>
            <p>Total Jobs</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e8f5e9' }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{activeJobs}</h3>
            <p>Active Jobs</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fff8e1' }}>
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{applications.length}</h3>
            <p>Total Applicants</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#ffebee' }}>
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{newApplications}</h3>
            <p>New Applications</p>
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={onViewJobs}>
            <i className="fas fa-plus"></i> Post New Job
          </button>
          <button className="action-btn" onClick={onViewApplicants}>
            <i className="fas fa-user-check"></i> Review Applicants
          </button>
          <button className="action-btn">
            <i className="fas fa-chart-bar"></i> View Reports
          </button>
        </div>
      </div>
      
      <div className="recent-section">
        <div className="recent-jobs">
          <div className="section-header">
            <h3>Recent Job Postings</h3>
            <button className="view-all" onClick={onViewJobs}>View All</button>
          </div>
          {jobs.slice(0, 3).map(job => (
            <div key={job.id} className="recent-item">
              <h4>{job.title}</h4>
              <p>{job.applications} applications • Posted on {new Date(job.posted).toLocaleDateString()}</p>
            </div>
          ))}
          {jobs.length === 0 && (
            <p className="no-data">No jobs posted yet</p>
          )}
        </div>
        
        <div className="recent-applicants">
          <div className="section-header">
            <h3>Recent Applications</h3>
            <button className="view-all" onClick={onViewApplicants}>View All</button>
          </div>
          {applications.slice(0, 3).map(app => (
            <div key={app.id} className="recent-item">
              <h4>{app.name}</h4>
              <p>Applied for {app.position} • {new Date(app.date).toLocaleDateString()}</p>
            </div>
          ))}
          {applications.length === 0 && (
            <p className="no-data">No applications yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;