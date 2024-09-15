import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = Cookies.get('esp_lunchtyme_id');

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RequireAuth;
