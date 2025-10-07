import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import Unauthorized from './Unauthorized';

const ProtectedRoute = ({ children, requiredPermission, fallbackPath = '/unauthorized' }) => {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Unauthorized />;
  }

  return children;
};

export default ProtectedRoute;
