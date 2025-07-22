// src/auth/Signup.jsx
import React, { useState } from 'react';
import './Auth.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'jobseeker',
    company: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      setError('Please fill all required fields');
      return;
    }
    const res = await signup(formData.name, formData.username, formData.email, formData.password, formData.role);
    if (res.success) {
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(res.error || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>Create Your {formData.role === 'employer' ? 'Employer' : 'Job Seeker'} Account</h1>
        <p>Join thousands of professionals on ConnectHire</p>
      </div>
      <div className="login-tabs" style={{marginBottom: 20}}>
        <button className={`tab ${formData.role === 'jobseeker' ? 'active' : ''}`} onClick={() => handleRoleChange('jobseeker')}>
          <i className="fas fa-user-tie"></i> Job Seeker
        </button>
        <button className={`tab ${formData.role === 'employer' ? 'active' : ''}`} onClick={() => handleRoleChange('employer')}>
          <i className="fas fa-briefcase"></i> Employer
        </button>
      </div>
      {error && <div style={{color: 'red', marginBottom: 10}}>{error}</div>}
      {success && <div style={{color: 'green', marginBottom: 10}}>{success}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <div className="input-with-icon">
            <i className="fas fa-user"></i>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <div className="input-with-icon">
            <i className="fas fa-user-circle"></i>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={formData.username}
              onChange={handleChange}
              placeholder="Unique username"
              required
            />
          </div>
        </div>
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
              placeholder="nitish@gmail.com"
              required
            />
          </div>
        </div>
        {formData.role === 'employer' && (
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <div className="input-with-icon">
              <i className="fas fa-building"></i>
              <input 
                type="text" 
                id="company" 
                name="company" 
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
                required
              />
            </div>
          </div>
        )}
        <div className="form-row">
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
                placeholder="Create password"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group terms">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </label>
        </div>
        <button type="submit" className="auth-btn">
          Create Account
          <span className="btn-edge"></span>
        </button>
      </form>
      <div className="auth-footer">
        <p>Already have an account? <Link to="/login">Login</Link></p>
        <p>Or <Link to="/role">go back to role selection</Link></p>
      </div>
    </div>
  );
};

export default Signup;
