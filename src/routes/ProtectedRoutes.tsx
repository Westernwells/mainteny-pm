import {useUser} from 'hooks/reactQuery/useUser';
import React from 'react';
import {Navigate, Outlet, Route} from 'react-router-dom';

export const ProtectedRoutes = () => {
  const {user} = useUser();

  if (user?.token) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};
