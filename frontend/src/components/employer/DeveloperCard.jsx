import React from 'react';
import './DeveloperCard.css';

const DeveloperCard = ({ name, skills, rate, experience }) => {
  return (
    <div className="developer-card">
      <div className="card-content">
        <div className="card-front">
          <div className="avatar"></div>
          <h3>{name}</h3>
          <p className="title">Senior Developer</p>
          <div className="skills">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
        
        <div className="card-back">
          <div className="stats">
            <div className="stat-item">
              <span>Rate</span>
              <strong>${rate}/hr</strong>
            </div>
            <div className="stat-item">
              <span>Experience</span>
              <strong>{experience} years</strong>
            </div>
            <div className="stat-item">
              <span>Projects</span>
              <strong>120+</strong>
            </div>
            <div className="stat-item">
              <span>Rating</span>
              <strong>4.9/5.0</strong>
            </div>
          </div>
          <button className="hire-btn">Hire Now</button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;