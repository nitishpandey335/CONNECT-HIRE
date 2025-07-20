// App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AuthCard from './components/auth/Login';
import Signup from './components/auth/Signup';
import RoleSelector from './components/auth/RoleSelector';
import About from './pages/About';
import { AuthContext, AuthProvider } from './context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
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
      <Route path="/about" element={<About />} />
      {/* Optional: 404 Not Found */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
