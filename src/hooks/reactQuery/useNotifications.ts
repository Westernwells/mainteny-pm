import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQueryClient,
} from 'react-query';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import {queryKeys} from 'reactQuery/constants';
import {
  NotificationMessage,
  NotificationsQueryParams,
} from 'models/notification';
import {Resource, RestError, StringValue} from 'models/misc';
import {useSnackbar} from 'hooks/useSnackbar';
import {useUser} from './useUserSession';

export const queryNotifications = async (params: NotificationsQueryParams) => {
  const response = await axiosClient.get(`/api/notifications`, {
    params,
    paramsSerializer,
  });
  return response.data;
};

export const useNotifications = (
  params: NotificationsQueryParams,
  options?: UseInfiniteQueryOptions<any, any, any>,
) => {
  const {data: user} = useUser();

  return useInfiniteQuery<
    Resource<NotificationMessage<string>>,
    RestError,
    Resource<NotificationMessage<string>>
  >(
    [queryKeys.queryNotifications, params, user?.userData.propertyOwner.id],
    ({pageParam = 0}) =>
      queryNotifications({
        ...params,
        target: [user!.userData.propertyOwner.id],
        pageIndex: pageParam,
      }),
    {
      enabled: !!user,
      getNextPageParam: (lastPage) => {
        const currentTotal =
          (lastPage.page.pageIndex + 1) * lastPage.page.pageSize;
        if (lastPage.total && currentTotal < lastPage.total) {
          return lastPage.page.pageIndex + 1;
        }
        return undefined;
      },
      ...options,
    },
  );
};

const markNotificationAsRead = async (notificationId: string) => {
  await axiosClient.put<StringValue>(`/api/notifications/${notificationId}`);
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();
  return useMutation(
    (notificationId: string) => markNotificationAsRead(notificationId),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([queryKeys.queryNotifications]),
      onError: (err) => {
        console.log(err);
        enqueueSnackbar('An unexpected error occurred, please try again.', {
          variant: 'error',
        });
      },
    },
  );
};

const markAllAsRead = async (target: string) => {
  await axiosClient.put<StringValue>(`/api/notifications?target=${target}`);
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();
  const {data: user} = useUser();

  return useMutation(() => markAllAsRead(user!.userData.propertyOwner.id), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.queryNotifications]);
    },
    onError: (err) => {
      console.log(err);
      enqueueSnackbar('An unexpected error occurred, please try again.', {
        variant: 'error',
      });
    },
  });
};
