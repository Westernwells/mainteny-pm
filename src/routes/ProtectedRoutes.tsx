import {useUserSession} from 'hooks/reactQuery/useUserSession';
import {Navigate, Outlet, Route} from 'react-router-dom';

export const ProtectedRoutes = () => {
  const {user} = useUserSession();

  if (user?.token) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};
