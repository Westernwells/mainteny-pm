import {useCallback} from 'react';
import {useQuery, UseQueryOptions} from 'react-query';
import {AxiosResponse} from 'axios';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import * as _ from 'lodash';
import {queryKeys} from 'reactQuery/constants';
import {useNavigate} from 'react-router-dom';
import {Elevator, ElevatorView} from 'models/elevator';
import {Page, Resource, RestError} from 'models/misc';
import {MaintainerView} from 'models/technician';
import {usePropertyManager} from './usePropertyManager';

export const fetchElevator = async (elevatorId: string) => {
  const response = await axiosClient.get<Elevator>(
    `/api/elevators/${elevatorId}`,
  );
  return response.data;
};

export const fetchElevatorMaintainers = async (elevatorId: string) => {
  const response = await axiosClient.get<MaintainerView[]>(
    `/api/elevators/${elevatorId}/maintainers`,
  );
  return response.data;
};

export const fetchElevatorBreakdownHistory = async (elevatorId: string) => {
  const response: AxiosResponse<Resource<any>> = await axiosClient.post(
    `/api/elevators/${elevatorId}/breakdownHistories`,
    {
      data: {
        breakdownDate: '2022-01-03',
        createdAt: '2022-01-03T16:22:56.410Z',
        durationInMinutes: 0,
        serviceOrderId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        status: 'REPORTED',
      },
    },
  );
  return response.data;
};

export const useElevatorById = (elevatorId?: string) => {
  const navigate = useNavigate();
  return useQuery(
    [queryKeys.elevatorById, elevatorId],
    () => fetchElevator(elevatorId!),
    {
      enabled: !!elevatorId,
      onError: (err: any) => {
        if (err.response.status === 500) {
          navigate('/404');
        }
      },
    },
  );
};

export const useElevatorMaintainers = (elevatorId?: string) =>
  useQuery(
    [queryKeys.maintainerByElevatorId, elevatorId],
    () => fetchElevatorMaintainers(elevatorId!),
    {
      enabled: !!elevatorId,
    },
  );

export const fetchElevators = async (query: string, page: Page, id: string) => {
  const response = await axiosClient.get<Resource<ElevatorView>>(
    `/api/propertyOwners/${id}/elevators`,
    {
      params: {query, ...page},
      paramsSerializer,
    },
  );
  return response.data;
};

const filterByStatus = (elevatorRes: Resource<ElevatorView>, status: string) =>
  _.groupBy(elevatorRes.data, (ivoice) => ivoice.status)[
    status
  ] as ElevatorView[];

const filterByNextVisit = (
  elevatorRes: Resource<ElevatorView>,
  upcommingVisit: {start: Date; end: Date},
) => {
  let filteredResult = [] as ElevatorView[];

  filteredResult = elevatorRes.data.filter(
    (item) =>
      'nextVisitDate' in item &&
      new Date(item.nextVisitDate) > upcommingVisit.start &&
      new Date(item.nextVisitDate) <= upcommingVisit.end,
  );
  return filteredResult;
};

const filterElevators = (
  elevatorsRes: Resource<ElevatorView>,
  filters: {status: string; upcommingVisit: {start: Date; end: Date} | null},
) => {
  let result = {...elevatorsRes};

  if (filters.status.length) {
    const status = filterByStatus(result, filters.status);
    result = {...result, data: status, total: status.length};
  }
  if (filters.upcommingVisit) {
    const nextVisits = filterByNextVisit(result, filters.upcommingVisit);
    result = {...result, data: nextVisits, total: nextVisits.length};
  }
  return result;
};

export function useAllElevators(
  query: string,
  page: Page,
  filters?: {status: string; upcommingVisit: {start: Date; end: Date} | null},
  options?: UseQueryOptions<any, any, any>,
) {
  const {data: user} = usePropertyManager();
  return useQuery<Resource<ElevatorView>, RestError>(
    [queryKeys.fetchAllElevators, query, page, user?.propertyOwner.id],
    () => fetchElevators(query, page, user!.propertyOwner.id),
    {
      ...options,
      enabled: !!user,
      select: useCallback(
        (elevatorRes: Resource<ElevatorView>) => {
          let filteredResult = elevatorRes;
          if (filters) filteredResult = filterElevators(elevatorRes, filters);

          return filteredResult;
        },
        [filters],
      ),
    },
  );
}
