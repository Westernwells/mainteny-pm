import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {axiosClient} from 'utils/axios-utils';
import {RolesType} from 'pages/Profile/PersonalDetails/model';
import {useUserSession} from './reactQuery/useUserSession';
import {UserSession} from '../models/session';

interface UseAuth {
  signin: (email: string, password: string) => Promise<void>; // eslint-disable-line no-unused-vars
  signup: (email: string, password: string) => Promise<void>; // eslint-disable-line no-unused-vars
  signout: () => void;
  loading: boolean;
}

export const useAuth = (): UseAuth => {
  const {clearUser, updateUser} = useUserSession();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {enqueueSnackbar} = useSnackbar();

  const authRequest = async (
    urlEndpoint: string,
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      setLoading(true);
      const {data: user, status} = await axiosClient.post<UserSession>(
        urlEndpoint,
        {username: email, password},
      );

      console.log(status, '######');

      if (user.token) {
        if (
          !user.userAccount.roles.some((role) =>
            Object.keys(RolesType).includes(role),
          )
        ) {
          enqueueSnackbar(
            `Uh oh! As a Service Manager, please login at ${process.env.REACT_APP_SMUI_URL}`,
            {
              variant: 'warning',
            },
          );
          return;
        }
        axiosClient.defaults.headers.common.Authorization = `Bearer ${user.token}`;
        // update stored user data
        updateUser(user);
        if (location.state?.from) {
          navigate(
            `/${location.state.from.pathname}${
              location.state.from.search ? location.state.from.search : ''
            }`,
            {replace: true},
          );
        } else {
          navigate('/units?pageIndex=1&pageSize=25', {replace: true});
        }
      }
    } catch (errorResponse: any) {
      if (errorResponse?.response.status === 400) {
        console.log('#########');
        enqueueSnackbar('Incorrect email or password', {
          variant: 'error',
        });
      }
      console.log(errorResponse);
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email: string, password: string): Promise<void> => {
    authRequest('/api/sessions/login', email, password);
  };
  const signup = async (email: string, password: string): Promise<void> => {
    authRequest('/user', email, password);
  };

  const signout = (): void => {
    clearUser();
    navigate('/', {replace: true}); // This resets the location state
  };

  // Return the user object and auth methods
  return {
    signin,
    signup,
    signout,
    loading,
  };
};
