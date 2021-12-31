import React from 'react';
import {Navigate, Outlet, Route} from 'react-router-dom';

export const ProtectedRoutes = () => (
  // TODO: make use of this when auth is done

  // const auth = true;
  // if (auth) {
  //   return ( <Outlet />)
  // }
  // return <Navigate to="/login" />
  <Outlet />
);
