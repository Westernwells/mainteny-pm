import {useQuery, useQueryClient} from 'react-query';
import {getStoredUser, setStoredUser, clearStoredUser} from 'userStorage';
import {queryKeys} from 'reactQuery/constants';
import {UserSession} from 'models/session';
import {differenceInMinutes} from 'date-fns';
import {axiosClient} from 'utils/axios-utils';
import {CommonUserView} from 'models/user';

interface UseUserSession {
  user?: UserSession | null;
  updateUser: (user: UserSession) => void; // eslint-disable-line no-unused-vars
  clearUser: () => void;
}

export function useUserSession(): UseUserSession {
  const queryClient = useQueryClient();

  // TODO: call useQuery to update user data from server
  const {data: user} = useQuery(queryKeys.userSession, getStoredUser, {
    onSuccess: (data) => {
      if (data) {
        const currentDate = new Date();
        const expiredAt = new Date(data.expiredAt);
        const minuteDiff = differenceInMinutes(expiredAt, currentDate);
        if (minuteDiff <= 0) {
          clearStoredUser();
          queryClient.setQueryData(queryKeys.userSession, null);
        }
      }
    },
  });

  // meant to be called from useAuth
  function updateUser(newUser: UserSession): void {
    // update user in localstorage
    setStoredUser(newUser);
    localStorage.removeItem('email');

    //  pre-populate user profile in React Query client
    queryClient.setQueryData(queryKeys.userSession, newUser);
  }

  // meant to be called from useAuth
  const clearUser = () => {
    // remove from localstorage
    clearStoredUser();

    // reset user to null in query client
    queryClient.setQueryData(queryKeys.userSession, null);
  };

  return {user, updateUser, clearUser};
}

const fetchUser = async (id: string) => {
  const response = await axiosClient.get<CommonUserView>(`/api/users/${id}`);
  return response.data;
};

export const useUser = () => {
  const {user} = useUserSession();
  return useQuery(
    [queryKeys.fetchUser, user?.userAccount.id],
    () => fetchUser(user!.userAccount.id),
    {
      enabled: !!user,
    },
  );
};
