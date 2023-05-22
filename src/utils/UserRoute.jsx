import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserRoute = ({ path, ...props }) => {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default UserRoute;
