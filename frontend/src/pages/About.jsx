import React, { useRef, useEffect } from 'react';
import './About.css';

const About = () => {
  const sceneRef = useRef(null);
  
  useEffect(() => {
    // This would be where more complex 3D animations would be implemented
    // For this example, we'll use CSS 3D transforms
  }, []);

  return (
    <div className="about-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title"><span className="highlight">ConnectHire</span></h1>
          <p className="hero-subtitle">
            Where Talent Meets Opportunity
          </p>
          <div className="hero-description">
            <p>
              ConnectHire is revolutionizing the job market by creating meaningful connections between 
              exceptional talent and forward-thinking companies.
            </p>
            <p>
              Our platform combines intelligent matching with a human-centered approach to transform 
              how people find careers and how businesses discover talent.
            </p>
          </div>
        </div>
        <div className="hero-graphic">
          <div className="cube-container">
            <div className="cube">
              <div className="face front">Talent</div>
              <div className="face back">Growth</div>
              <div className="face right">Connect</div>
              <div className="face left">Hire</div>
              <div className="face top">Careers</div>
              <div className="face bottom">Success</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mission-section">
        <div className="mission-card">
          <h2>Our Mission</h2>
          <p>
            To eliminate the friction in the hiring process by creating a platform that values human 
            potential as much as technical skills, and company culture as much as business objectives.
          </p>
          <div className="globe-animation">
            <div className="orbit">
              <div className="planet"></div>
              <div className="satellite"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why ConnectHire Stands Out</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="card-icon">📝</div>
            <h3>Intelligent Job Matching</h3>
            <p>Our AI understands your skills and career aspirations to match you with ideal opportunities.</p>
            <div className="card-animation"></div>
          </div>

          <div className="feature-card">
            <div className="card-icon">🔍</div>
            <h3>Candidate Insights</h3>
            <p>Employers gain deep insights into candidates' potential beyond just resumes.</p>
            <div className="card-animation"></div>
          </div>

          <div className="feature-card">
            <div className="card-icon">🤝</div>
            <h3>Human Connection</h3>
            <p>We prioritize meaningful interactions over automated processes.</p>
            <div className="card-animation"></div>
          </div>

          <div className="feature-card">
            <div className="card-icon">🚀</div>
            <h3>Career Growth</h3>
            <p>Tools and resources to help you grow professionally at every stage.</p>
            <div className="card-animation"></div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-value">250K+</div>
          <div className="stat-label">Successful Hires</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">98%</div>
          <div className="stat-label">Satisfaction Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">15K+</div>
          <div className="stat-label">Companies</div>
        </div>
      </div>

      <div className="team-section">
        <h2 className="section-title">Our Visionaries</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-photo"></div>
            <h3>Nitish Pandey</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h3>Aryan Raj</h3>
            <p>Head of Product</p>
          </div>
          <div className="team-member">
            <div className="member-photo"></div>
            <h3>Rishabh Anad</h3>
            <p>Tech Lead</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Join Our Community</h2>
        <p>Whether you're seeking talent or opportunity, your journey starts here.</p>
        <div className="cta-buttons">
          <button className="btn-primary">Find Your Dream Job</button>
          <button className="btn-secondary">Post a Job Opening</button>
        </div>
      </div>
    </div>
  );
};

export default About;