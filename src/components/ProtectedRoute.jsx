import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from './AdminLogin';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontFamily: 'Plus Jakarta Sans, sans-serif'
      }}>
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <AdminLogin />;
};

export default ProtectedRoute;
