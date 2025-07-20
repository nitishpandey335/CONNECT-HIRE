import React from 'react';
import Navbar from '../components/common/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '80px', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <h1>Welcome to ConnectHire!</h1>
        <p style={{ fontSize: '1.1rem', color: '#444', margin: '1.5rem 0 2.5rem 0' }}>
          Your one-stop platform for connecting job seekers and employers. Post jobs, apply, and manage your career or company with ease.
        </p>
      </div>
    </div>
  );
};

export default Home;
