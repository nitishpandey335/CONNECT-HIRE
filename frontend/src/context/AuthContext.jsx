// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, signup as signupApi } from '../services/api';

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

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
