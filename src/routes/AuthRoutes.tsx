import {Navigate, Outlet} from 'react-router-dom';

import {useUser} from 'hooks/reactQuery/useUser';

export const AuthRoutes = () => {
  const {user} = useUser();

  if (user?.token) {
    return <Navigate to="/units" />;
  }
  return <Outlet />;
};
