import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useUserSession} from 'hooks/reactQuery/useUserSession';

export const ProtectedRoutes = () => {
  const {user} = useUserSession();
  const location = useLocation();

  if (user?.token) {
    return <Outlet />;
  }
  return <Navigate to="/login" state={{from: location}} replace />;
};
