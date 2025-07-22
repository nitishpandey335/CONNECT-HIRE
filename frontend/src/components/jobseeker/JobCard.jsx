// src/components/JobCard.jsx
import React, { useState } from 'react';
import './JobCard.css';

const JobCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div className="job-card-container">
      <div className={`job-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="job-card-front">
          <div className="job-header">
            <div className="company-logo">
              <div className="logo-placeholder">NT</div>
            </div>
            <div className="job-info">
              <h3 className="job-title">Senior UX Designer</h3>
              <p className="company-name">Nexus Technologies</p>
            </div>
          </div>
          
          <div className="job-details">
            <div className="detail-item">
              <span className="detail-icon">💰</span>
              <span>$110,000 - $130,000</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span>San Francisco, CA</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">⏱️</span>
              <span>Full-time</span>
            </div>
          </div>
          
          <div className="job-tags">
            <span className="tag">UX Design</span>
            <span className="tag">Figma</span>
            <span className="tag">User Research</span>
          </div>
          
          <div className="job-footer">
            <span className="time-posted">Posted 2 days ago</span>
            <button className="btn-view">View Details</button>
          </div>
        </div>
        
        <div className="job-card-back">
          <h3>Job Description</h3>
          <p>
            We're looking for a talented Senior UX Designer to join our product team. 
            You'll be responsible for creating intuitive and engaging user experiences 
            across our digital platforms.
          </p>
          
          <h4>Responsibilities:</h4>
          <ul>
            <li>Lead UX design for new features and products</li>
            <li>Conduct user research and usability testing</li>
            <li>Create wireframes, prototypes, and high-fidelity designs</li>
            <li>Collaborate with product managers and engineers</li>
          </ul>
          
          <h4>Requirements:</h4>
          <ul>
            <li>5+ years of UX design experience</li>
            <li>Proficiency in Figma and Adobe Creative Suite</li>
            <li>Strong portfolio showcasing UX process</li>
            <li>Excellent communication and collaboration skills</li>
          </ul>
          
          <div className="back-footer">
            <button className="btn-apply">Apply Now</button>
            <button className="btn-save">Save Job</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;