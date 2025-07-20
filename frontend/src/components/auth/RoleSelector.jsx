import React from 'react';
import './auth.css';

const RoleSelector = ({ onSelect }) => {
  return (
    <div className="auth-container">
      <h2>Select Your Role</h2>
      <div className="role-buttons">
        <button onClick={() => onSelect('jobseeker')}>Job Seeker</button>
        <button onClick={() => onSelect('employer')}>Employer</button>
      </div>
    </div>
  );
};

export default RoleSelector;
