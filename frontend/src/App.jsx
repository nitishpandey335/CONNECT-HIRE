// App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AuthCard from './components/auth/Login';
import Signup from './components/auth/Signup';
import RoleSelector from './components/auth/RoleSelector';
import About from './pages/About';
import { AuthContext, AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/common/DashboardLayout';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';

const AppRoutes = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '2rem'}}>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated && user && user.role ? (
            user.role === 'employer' ? (
              <Navigate to="/employer-dashboard" replace />
            ) : (
              <Navigate to="/jobseeker-dashboard" replace />
            )
          ) : (
            <Home />
          )
        }
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <AuthCard /> : <Navigate to="/" replace />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <Signup /> : <Navigate to="/" replace />}
      />
      <Route
        path="/role"
        element={<RoleSelector onSelect={(role) => alert(`Selected: ${role}`)} />}
      />
      <Route
        path="/jobseeker-dashboard"
        element={isAuthenticated && user?.role === 'jobseeker' ? (
          <DashboardLayout>
            <JobSeekerDashboard />
          </DashboardLayout>
        ) : (
          <Navigate to="/login" replace />
        )}
      />
      <Route
        path="/employer-dashboard"
        element={isAuthenticated && user?.role === 'employer' ? (
          <DashboardLayout>
            <EmployerDashboard />
          </DashboardLayout>
        ) : (
          <Navigate to="/login" replace />
        )}
      />
      <Route path="/about" element={
        isAuthenticated ? (
          <DashboardLayout>
            <About />
          </DashboardLayout>
        ) : (
          <About />
        )
      } />
      {/* Optional: 404 Not Found */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
