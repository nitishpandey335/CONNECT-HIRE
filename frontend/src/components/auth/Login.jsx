// src/auth/Login.jsx
import React, { useState } from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [activeTab, setActiveTab] = useState('jobseeker');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(formData.email, formData.password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>Welcome Back to ConnectHire</h1>
        <p>Login to continue your journey</p>
      </div>
      <div className="login-tabs">
        <button 
          className={`tab ${activeTab === 'jobseeker' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobseeker')}
        >
          <i className="fas fa-user-tie"></i> Job Seeker
        </button>
        <button 
          className={`tab ${activeTab === 'employer' ? 'active' : ''}`}
          onClick={() => setActiveTab('employer')}
        >
          <i className="fas fa-briefcase"></i> Employer
        </button>
      </div>
      {error && <div style={{color: 'red', marginBottom: 10}}>{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-with-icon">
            <i className="fas fa-envelope"></i>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-with-icon">
            <i className="fas fa-lock"></i>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group remember">
            <input 
              type="checkbox" 
              id="rememberMe" 
              name="rememberMe" 
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
        </div>
        <button type="submit" className="auth-btn">
          Login to Your Account
          <span className="btn-edge"></span>
        </button>
      </form>
      <div className="social-login">
        <p>Or continue with</p>
        <div className="social-buttons">
          <button className="social-btn google" type="button" onClick={() => alert('Google login coming soon!')} disabled>
            <i className="fab fa-google"></i> Google
          </button>
          <button className="social-btn linkedin" type="button" onClick={() => alert('LinkedIn login coming soon!')} disabled>
            <i className="fab fa-linkedin"></i> LinkedIn
          </button>
        </div>
      </div>
      <div className="auth-footer">
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;