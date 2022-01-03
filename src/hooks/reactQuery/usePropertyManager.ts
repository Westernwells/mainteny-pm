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
    baseURL: 'https://staging.mainteny.com', // TODO: remove this as soon as staging env is updated
  });
  return response.data;
};

export const usePropertyManager = () => {
  const {user} = useUserSession();
  return useQuery(
    [queryKeys.propertManager, user?.userAccount.username],
    () => fetchPropertyManager(user!.userAccount.username),
    {
      enabled: !!user,
    },
  );
};
