import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

const AuthCard = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('jobseeker');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(loginEmail, loginPassword);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.error || 'Login failed');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await signup(signupName, signupEmail, signupPassword, signupRole);
    if (res.success) {
      setSuccess('Signup successful! Please login.');
      setIsFlipped(false);
    } else {
      setError(res.error || 'Signup failed');
    }
  };

  return (
    <div className="auth-bg-simple">
      <div className="auth-card-simple">
        {!isFlipped ? (
          <>
            <h2 className="welcome-heading">Welcome Back</h2>
            <h3 className="auth-title">Login</h3>
            <form className="auth-form" onSubmit={handleLogin}>
              <input type="email" placeholder="Email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              <input type="password" placeholder="Password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              <button type="submit">Login</button>
              {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
            </form>
            <p>Don't have an account? <button className="link-btn" onClick={() => { setIsFlipped(true); setError(''); setSuccess(''); }}>Signup</button></p>
          </>
        ) : (
          <>
            <h3 className="auth-title">Signup</h3>
            <form className="auth-form" onSubmit={handleSignup}>
              <input type="text" placeholder="Name" required value={signupName} onChange={e => setSignupName(e.target.value)} />
              <input type="email" placeholder="Email" required value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
              <input type="password" placeholder="Password" required value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
              <select required value={signupRole} onChange={e => setSignupRole(e.target.value)}>
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
              <button type="submit">Signup</button>
              {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
              {success && <div style={{ color: 'green', marginTop: '0.5rem' }}>{success}</div>}
            </form>
            <p>Already have an account? <button className="link-btn" onClick={() => { setIsFlipped(false); setError(''); setSuccess(''); }}>Login</button></p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCard;
