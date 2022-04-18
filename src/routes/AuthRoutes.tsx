import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useUserSession} from 'hooks/reactQuery/useUserSession';

export const AuthRoutes = () => {
  const {user} = useUserSession();
  const location = useLocation();

  const authRouteActive =
    !location.state ||
    location.state.from.pathname === '/login' ||
    location.state.from.pathname === '/reset-password';

  if (user?.token) {
    return (
      <Navigate
        to={
          authRouteActive
            ? '/units?pageIndex=1&pageSize=25'
            : `${location.state.from.pathname}${
                location.state.from.search ? location.state.from.search : ''
              }`
        }
        state={{from: location}}
        replace
      />
    );
  }
  return <Outlet />;
};
