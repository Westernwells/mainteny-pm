import {useQuery, UseQueryOptions} from 'react-query';
import {AxiosResponse} from 'axios';
import {useNavigate} from 'react-router-dom';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import {queryKeys} from 'reactQuery/constants';
import {ElevatorQueryParams, ElevatorView} from 'models/elevator';
import {Resource, RestError} from 'models/misc';
import {MaintainerView} from 'models/technician';
import {useUser} from './useUserSession';

export const fetchElevator = async (elevatorId: string) => {
  const response = await axiosClient.get<ElevatorView>(
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

export const fetchElevators = async (
  params: Partial<ElevatorQueryParams>,
  id: string,
) => {
  const response = await axiosClient.get<Resource<ElevatorView>>(
    `/api/propertyOwners/${id}/elevators`,
    {
      params,
      paramsSerializer,
    },
  );
  return response.data;
};

export function useAllElevators(
  params: Partial<ElevatorQueryParams>,
  options?: UseQueryOptions<any, any, any>,
) {
  const {data: user} = useUser();
  return useQuery<Resource<ElevatorView>, RestError>(
    [queryKeys.fetchAllElevators, params, user?.userData.propertyOwner.id],
    () => fetchElevators(params, user!.userData.propertyOwner.id),
    {
      ...options,
      enabled: !!user,
    },
  );
}
