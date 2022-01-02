import {Navigate, Outlet} from 'react-router-dom';
import {useUserSession} from 'hooks/reactQuery/useUserSession';

export const AuthRoutes = () => {
  const {user} = useUserSession();

  if (user?.token) {
    return <Navigate to="/units" />;
  }
  return <Outlet />;
};
