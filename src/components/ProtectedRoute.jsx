import React from 'react';
import { Navigate } from 'react-router-dom';
import UserService from '../services/UserService';

const ProtectedRoute = ({ children, requiredRole = null, allowedRoles = [] }) => {
  const isAuthenticated = UserService.isAuthenticated();
  const currentUser = UserService.getCurrentUser();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if specific role is required
  if (requiredRole) {
    if (currentUser?.role !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Check if user has one of the allowed roles
  if (allowedRoles.length > 0) {
    if (!allowedRoles.includes(currentUser?.role)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

// Higher-order component for role-based access
// Moved withRoleProtection to a separate file to support Fast Refresh.

// Specific role guards
export const AdminOnly = ({ children }) => (
  <ProtectedRoute allowedRoles={['Admin']}>
    {children}
  </ProtectedRoute>
);

export const EditorAndAdmin = ({ children }) => (
  <ProtectedRoute allowedRoles={['Editor', 'Admin']}>
    {children}
  </ProtectedRoute>
);

export const AdminOnlyUsers = ({ children }) => (
  <ProtectedRoute allowedRoles={['Admin']}>
    {children}
  </ProtectedRoute>
);

export default ProtectedRoute;