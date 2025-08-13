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
  const [info, setInfo] = useState('');
  const [useOtp, setUseOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { login, requestOtp, verifyOtp, resendOtp } = useAuth();
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
    setInfo('');
    setSubmitting(true);
    try {
      if (useOtp) {
        if (!otpSent) {
          const res = await requestOtp(formData.email);
          if (res.success) {
            setOtpSent(true);
            const mode = res.meta?.emailMode;
            const preview = res.meta?.previewUrl;
            const note = res.meta?.note;
            
            if (mode === 'preview' && preview) {
              setInfo(`${res.meta?.note || 'OTP sent!'} Click here to view: ${preview}`);
            } else if (mode === 'console') {
              setInfo(`${res.meta?.note || 'OTP generated!'} Check server console.`);
            } else {
              setInfo('OTP sent to your email!');
            }
            setCooldown(60);
            const timer = setInterval(() => {
              setCooldown(prev => {
                if (prev <= 1) { clearInterval(timer); return 0; }
                return prev - 1;
              });
            }, 1000);
          } else {
            setError(res.error || 'Failed to send OTP');
          }
        } else {
          const res = await verifyOtp(formData.email, otp);
          if (res.success) {
            navigate('/');
          } else {
            setError(res.error || 'Invalid OTP');
          }
        }
      } else {
        const res = await login(formData.email, formData.password);
        if (res.success) {
          navigate('/');
        } else {
          setError(res.error || 'Login failed');
        }
      }
    } finally {
      setSubmitting(false);
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
      {info && <div style={{color: 'green', marginBottom: 10}}>{info}</div>}
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
        {!useOtp && (
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
        )}
        {useOtp && otpSent && (
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <div className="input-with-icon">
              <i className="fas fa-key"></i>
              <input 
                type="text" 
                id="otp" 
                name="otp" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                required
              />
            </div>
          </div>
        )}
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
            {!useOtp ? (
              <button type="button" onClick={() => { setUseOtp(true); setError(''); setInfo(''); }} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0 }}>
                Login with OTP
              </button>
            ) : (
              <button type="button" onClick={() => { setUseOtp(false); setOtp(''); setOtpSent(false); setError(''); setInfo(''); }} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0 }}>
                Use password instead
              </button>
            )}
          </div>
        </div>
        <button type="submit" className="auth-btn" disabled={submitting}>
          {!useOtp ? 'Login to Your Account' : (otpSent ? 'Verify OTP & Login' : 'Send OTP')}
          <span className="btn-edge"></span>
        </button>
        {useOtp && otpSent && (
          <div style={{ marginTop: 10 }}>
            <button type="button" className="auth-btn" disabled={cooldown>0} onClick={async () => {
              setError(''); setInfo('');
              const res = await resendOtp(formData.email);
              if (res.success) {
                const mode = res.meta?.emailMode;
                const preview = res.meta?.previewUrl;
                const note = res.meta?.note;
                
                if (mode === 'preview' && preview) {
                  setInfo(`${res.meta?.note || 'OTP resent!'} Click here to view: ${preview}`);
                } else if (mode === 'console') {
                  setInfo(`${res.meta?.note || 'OTP regenerated!'} Check server console.`);
                } else {
                  setInfo('OTP resent to your email!');
                }
                setCooldown(60);
                const timer = setInterval(() => {
                  setCooldown(prev => {
                    if (prev <= 1) { clearInterval(timer); return 0; }
                    return prev - 1;
                  });
                }, 1000);
              } else {
                setError(res.error || 'Could not resend OTP');
              }
            }}>
              {cooldown>0 ? `Resend OTP (${cooldown}s)` : 'Resend OTP'}
            </button>
          </div>
        )}
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