import {Link, useLocation} from 'react-router-dom';

interface Props {
  startLoading: () => void;
}

export const AppTopBar = ({startLoading}: Props) => {
  const location = useLocation();

  return location.pathname !== '/' && location.pathname !== '/login' ? (
    <Link
      to="profile"
      onClick={() => {
        startLoading();
      }}
    >
      Profile
    </Link>
  ) : null;
};
