import {AxiosResponse} from 'axios';
import {PropertyManager} from 'models/propertyManager';
import {useQuery} from 'react-query';
import {queryKeys} from 'reactQuery/constants';
import {axiosClient} from 'utils/axios-utils';
import {useUserSession} from './useUserSession';

const fetchPropertyManager = async (username: string) => {
  const response: AxiosResponse<PropertyManager> = await axiosClient({
    method: 'GET',
    url: `/api/users/propertyManager/${username}`,
  });
  return response.data;
};

export const usePropertyManager = () => {
  const {user} = useUserSession();
  return useQuery(
    [queryKeys.propertyManager, user?.userAccount.username],
    () => fetchPropertyManager(user!.userAccount.username),
    {
      enabled: !!user,
    },
  );
};
