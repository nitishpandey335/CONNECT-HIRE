import React from 'react';
import Navbar from '../components/common/Navbar';

const About = () => (
  <div>
    <Navbar />
    <div style={{ paddingTop: '80px', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <h1>About ConnectHire</h1>
      <p style={{ fontSize: '1.1rem', color: '#444', margin: '1.5rem 0 2.5rem 0' }}>
        ConnectHire is a platform designed to bridge the gap between talented job seekers and top employers. Whether you're looking for your dream job or the perfect candidate, our platform makes the process simple, secure, and effective.
      </p>
      <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 500, color: '#333', fontSize: '1.05rem' }}>
        <li>Post and browse jobs easily</li>
        <li>Apply and manage applications</li>
        <li>Employers can manage company profiles and job postings</li>
        <li>Job seekers can build profiles and track their career</li>
      </ul>
    </div>
  </div>
);

export default About; 