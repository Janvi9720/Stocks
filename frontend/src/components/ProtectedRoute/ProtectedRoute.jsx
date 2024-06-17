import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import Dashboard from '../Dashboard/UserDashboard';

const ProtectedRoute = ({ children, isDashboard = false }) => {
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));

  if (!user?.result) {
    return <Navigate to={{ pathname: '/auth' }} />;
  }

  if (isDashboard) {
    return user.result.userType === "admin" ? (
      <AdminDashboard />
    ) : (
      <Dashboard />
    );
  }

  return children;
};

export default ProtectedRoute;