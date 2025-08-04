import React, { useState } from 'react';
import './JobCard.css';
import ApplicationModal from './ApplicationModal';

const JobCard = () => {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const availableJobs = [
    {
      id: 1,
      company: 'Tech Innovations Inc.',
      position: 'Senior React Developer',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      description: 'We are looking for an experienced React developer to join our team...',
      requirements: [
        '5+ years of React experience',
        'Strong JavaScript fundamentals',
        'Experience with Redux',
        'Familiarity with modern frontend build tools'
      ]
    },
    {
      id: 2,
      company: 'Data Systems Corp',
      position: 'Full Stack Developer',
      location: 'New York, NY',
      salary: '$110,000 - $130,000',
      description: 'Looking for a full stack developer with experience in Node.js and React...',
      requirements: [
        '3+ years of experience with JavaScript',
        'Experience with React and Node.js',
        'Familiarity with database systems',
        'Strong problem-solving skills'
      ]
    }
  ];

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  return (
    <div className="job-card-container">
      <h2>Available Jobs</h2>
      <div className="job-cards-list">
        {availableJobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <h3>{job.position}</h3>
              <span className="job-status">New</span>
            </div>
            <div className="job-company">{job.company}</div>
            <div className="job-details">
              <div className="detail-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{job.location}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-dollar-sign"></i>
                <span>{job.salary}</span>
              </div>
            </div>
            <div className="job-description">
              <p>{job.description}</p>
              <div className="job-requirements">
                <h4>Requirements:</h4>
                <ul>
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="job-actions">
              <button 
                className="apply-btn"
                onClick={() => handleApplyClick(job)}
              >
                <i className="fas fa-paper-plane"></i> Apply Now
              </button>
              <button className="details-btn">
                <i className="fas fa-info-circle"></i> View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {showApplicationModal && (
        <ApplicationModal
          job={selectedJob}
          onClose={() => setShowApplicationModal(false)}
          onSubmit={(formData) => {
            console.log('Application submitted:', formData);
            setShowApplicationModal(false);
          }}
        />
      )}
    </div>
  );
};

export default JobCard;