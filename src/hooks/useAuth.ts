import {axiosClient} from 'utils/axios-utils';
import {useUser} from './reactQuery/useUser';

interface UseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

export const useAuth = (): UseAuth => {
  const {clearUser, updateUser} = useUser();

  const authRequest = async (
    urlEndpoint: string,
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      const {data: user, status} = await axiosClient({
        url: urlEndpoint,
        method: 'POST',
        data: {username: email, password},
      });

      if (status === 400) {
        // show toast
        return;
      }

      if (user?.token) {
        // show success toast

        // update stored user data

        updateUser(user);
      }
    } catch (errorResponse) {
      console.log(errorResponse);
    }
  };

  const signin = async (email: string, password: string): Promise<void> => {
    authRequest('/api/sessions/login', email, password);
  };
  const signup = async (email: string, password: string): Promise<void> => {
    authRequest('/user', email, password);
  };

  const signout = (): void => {
    // show toast

    // clear user from stored user data
    clearUser();
  };

  // Return the user object and auth methods
  return {
    signin,
    signup,
    signout,
  };
};
