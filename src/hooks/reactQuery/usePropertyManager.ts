import {AxiosResponse} from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useSnackbar} from 'notistack';
import {PropertyOwnerView} from 'models/propertyManager';
import {UpdateUserAccountData} from 'models/user';
import {queryKeys} from 'reactQuery/constants';
import {axiosClient} from 'utils/axios-utils';
import {useUser} from './useUserSession';

const fetchPropertyManager = async (id: string) => {
  const response: AxiosResponse<PropertyOwnerView> = await axiosClient({
    method: 'GET',
    url: `/api/propertyOwners/${id}`,
  });
  return response.data;
};

export const usePropertyManager = () => {
  const {data: user} = useUser();
  console.log(user, '$$$$$$');
  return useQuery(
    [queryKeys.propertyManager, user?.userData.propertyOwner.id],
    () => fetchPropertyManager(user!.userData.propertyOwner.id),
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
