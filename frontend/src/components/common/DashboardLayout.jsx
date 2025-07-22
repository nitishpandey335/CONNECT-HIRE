import React from 'react';
import Navbar from './Navbar';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="floating-cube"></div>
        <div className="floating-pyramid"></div>
        
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;