import {AxiosResponse} from 'axios';
import {useQuery, useQueryClient} from 'react-query';
import {axiosClient} from 'utils/axios-utils';
import {getStoredUser, setStoredUser, clearStoredUser} from 'userStorage';
import {queryKeys} from 'reactQuery/constants';
import {useState} from 'react';
import {UserSession} from 'models/session';
// query function
async function getUser(user: UserSession | null): Promise<UserSession | null> {
  if (!user) return null;
  const {data}: AxiosResponse<{user: UserSession}> = await axiosClient.get('');

  return data.user;
}

interface UseUser {
  user: UserSession | null;
  updateUser: (user: UserSession) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const [user, setUser] = useState<UserSession | null>(getStoredUser());
  const queryClient = useQueryClient();

  // TODO: call useQuery to update user data from server
  useQuery(queryKeys.user, () => getUser(user), {
    enabled: !!user,
    onSuccess: (data) => setUser(data),
  });

  // meant to be called from useAuth
  function updateUser(newUser: UserSession): void {
    // set user in state
    setUser(newUser);

    // update user in localstorage
    setStoredUser(newUser);

    //  pre-populate user profile in React Query client
    queryClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // update state
    setUser(null);

    // remove from localstorage
    clearStoredUser();

    // reset user to null in query client
    queryClient.setQueryData(queryKeys.user, null);
  }

  return {user, updateUser, clearUser};
}
