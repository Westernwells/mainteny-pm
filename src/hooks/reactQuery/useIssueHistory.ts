import {AxiosResponse} from 'axios';
import {ServiceOrderType, ServiceOrderView} from 'models/service-order';
import {useCallback} from 'react';
import {useQuery} from 'react-query';
import {queryKeys as qks} from 'reactQuery/constants';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import {BreakdownHistoryView} from '../../models/breakdownHistory';
import {Resource, RestError} from '../../models/misc';
import {usePropertyManager} from './usePropertyManager';

export const breakDownHistoryResource: Resource<BreakdownHistoryView> = {
  data: [
    {
      id: '1',
      datetime: '2021-11-02T00:00:00Z',
      durationInMinutes: 240,
      status: 'Resolved',
      description: 'Blocked door in 2nd floor',
    },
    {
      id: '2',
      datetime: '2021-10-29T00:00:00Z',
      durationInMinutes: 120,
      status: 'Resolved',
      description: 'Controller error',
    },
    {
      id: '3',
      datetime: '2021-08-11T00:00:00Z',
      durationInMinutes: 240,
      status: 'Resolved',
      description: 'Broken roller',
    },
  ],
  page: {
    pageIndex: 0,
    pageSize: 500,
  },
  total: 10,
};

export const fetchIssueHistory = async (
  params: any,
  propertyOwnerId: string,
): Promise<Resource<ServiceOrderView>> => {
  const response: AxiosResponse<Resource<ServiceOrderView>> =
    await axiosClient.get(
      `/api/propertyOwners/${propertyOwnerId}/scheduledOrders`,
      {
        params,
        paramsSerializer,
      },
    );
  return response.data;
};

export function useIssueHistory(params: any) {
  const {data: user} = usePropertyManager();
  return useQuery(
    [qks.fetchIssueHistory, params],
    () => fetchIssueHistory(params, user!.propertyOwner.id),
    {
      enabled: !!user && !!params.elevatorIds,
      select: useCallback((history: Resource<ServiceOrderView>) => {
        const issues = history.data.filter(
          (item) => item.type !== ServiceOrderType.REGULAR,
        );
        return {
          ...history,
          total: issues.length,
          data: issues,
        };
      }, []),
    },
  );
}
