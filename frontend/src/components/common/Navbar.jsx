import React, { useState } from 'react';
import NotificationBell from './NotificationBell';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-3d">ConnectHire</Link>
      </div>
      {isAuthenticated ? (
        <>
          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <Link to="/developers" className="nav-link">Developers</Link>
            <Link to="/messages" className="nav-link">Messages</Link>
            <Link to="/settings" className="nav-link">Settings</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
          <div className="navbar-right">
            <NotificationBell />
            <div className="logout-container">
              <button 
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
                <span className="logout-edge"></span>
              </button>
            </div>
            <button 
              className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="hamburger-line top"></span>
              <span className="hamburger-line middle"></span>
              <span className="hamburger-line bottom"></span>
            </button>
          </div>
        </>
      ) : (
        <div className="navbar-right">
          <Link to="/login" className="cta-btn primary" style={{marginRight: '1rem'}}>Sign In</Link>
          <Link to="/signup" className="cta-btn secondary">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;