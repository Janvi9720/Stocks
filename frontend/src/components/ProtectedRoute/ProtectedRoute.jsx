import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import Dashboard from '../Dashboard/UserDashboard';
import { useAuth0 } from "./../../react-auth0-spa"

const ProtectedRoute = ({ children, isDashboard = false }) => {
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    if (!isDashboard) {
      return children;
    }

    return user.userType === "admin" ? (
      <AdminDashboard />
    ) : (
      <Dashboard />
    );

  }

  return <Navigate to={{ pathname: '/auth' }} />;

};

export default ProtectedRoute;