import {AxiosResponse} from 'axios';
import {PropertyManager} from 'models/propertyManager';
import {UpdateUserAccountData} from 'models/user';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {queryKeys} from 'reactQuery/constants';
import {axiosClient} from 'utils/axios-utils';
import {useSnackbar} from 'notistack';
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

const updatePropertyManager = async (body: {
  userAccount: UpdateUserAccountData;
}) => {
  await axiosClient.put(`/api/users/propertyManagers`, {
    ...body,
  });
};

export const useUpdatePropertyManager = () => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();
  return useMutation(
    (body: {userAccount: UpdateUserAccountData}) => updatePropertyManager(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.propertyManager]);
        queryClient.invalidateQueries([queryKeys.downloadUrl]);
        enqueueSnackbar('Settings updated', {
          variant: 'success',
        });
      },
      onError: (err) => {
        console.log(err);
        enqueueSnackbar('Some error occurred, please try again.', {
          variant: 'error',
        });
      },
    },
  );
};
