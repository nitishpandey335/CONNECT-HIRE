import React from 'react';
import './CompanyProfile.css';

const CompanyProfile = () => {
  return (
    <div className="company-card">
      <div className="company-card-inner">
        <div className="company-card-front">
          <h2>Tech Innovations Inc.</h2>
          <p>Transforming Ideas into Reality</p>
        </div>
        <div className="company-card-back">
          <h3>About Us</h3>
          <p>Founded: 2010</p>
          <p>Employees: 250+</p>
          <p>Specialties: AI, Blockchain, Web3</p>
          <div className="company-logo">TI</div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;