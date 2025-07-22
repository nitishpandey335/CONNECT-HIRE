// src/auth/RoleSelector.jsx
import React, { useState } from 'react';
import './Auth.css';

const RoleSelector = ({ onSelect }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>Welcome to ConnectHire</h1>
        <p>Select your role to get started</p>
      </div>
      
      <div className="role-cards">
        <div 
          className={`role-card ${hoveredCard === 'jobseeker' ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredCard('jobseeker')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => onSelect('jobseeker')}
        >
          <div className="card-inner">
            <div className="card-front">
              <div className="role-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3>Job Seeker</h3>
              <p>Find your dream job</p>
            </div>
            <div className="card-back">
              <p>Create profile, apply to jobs, track applications</p>
              <button className="select-btn">Select as Job Seeker</button>
            </div>
          </div>
        </div>
        
        <div 
          className={`role-card ${hoveredCard === 'employer' ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredCard('employer')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => onSelect('employer')}
        >
          <div className="card-inner">
            <div className="card-front">
              <div className="role-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>Employer</h3>
              <p>Find top talent</p>
            </div>
            <div className="card-back">
              <p>Post jobs, manage applications, hire candidates</p>
              <button className="select-btn">Select as Employer</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="auth-footer">
        <p>Already have an account? <a href="#" onClick={() => onSelect('login')}>Login</a></p>
      </div>
    </div>
  );
};

export default RoleSelector;