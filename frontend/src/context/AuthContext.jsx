// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, signup as signupApi, requestOtp as requestOtpApi, verifyOtp as verifyOtpApi, resendOtp as resendOtpApi } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    setIsAuthenticated(!!token);
    setUser(userData ? JSON.parse(userData) : null);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginApi(email, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setIsAuthenticated(true);
      setUser(res.user);
      return { success: true };
    } else {
      return { success: false, error: res.error };
    }
  };

  const signup = async (name, username, email, password, role) => {
    const res = await signupApi(name, username, email, password, role);
    if (res.message) {
      return { success: true };
    } else {
      return { success: false, error: res.error };
    }
  };

  const requestOtp = async (email) => {
    const res = await requestOtpApi(email);
    if (res.message) {
      return { 
        success: true, 
        meta: { 
          emailMode: res.emailMode, 
          previewUrl: res.previewUrl,
          note: res.note 
        } 
      };
    }
    return { success: false, error: res.error };
  };

  const verifyOtp = async (email, otp) => {
    const res = await verifyOtpApi(email, otp);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setIsAuthenticated(true);
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const resendOtp = async (email) => {
    const res = await resendOtpApi(email);
    if (res.message) {
      return { 
        success: true, 
        meta: { 
          emailMode: res.emailMode, 
          previewUrl: res.previewUrl,
          note: res.note 
        } 
      };
    }
    return { success: false, error: res.error };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loading, requestOtp, verifyOtp, resendOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
