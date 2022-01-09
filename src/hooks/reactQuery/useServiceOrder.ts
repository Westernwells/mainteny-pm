import {useCallback} from 'react';
import {useQuery} from 'react-query';
import * as _ from 'lodash';
import {AxiosResponse} from 'axios';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import {addDays, endOfMonth, startOfMonth} from 'date-fns';
import {queryKeys} from 'reactQuery/constants';
import {ServiceCompanyTimeUnit} from 'models/service-company';
import {toRestDate, toRestDateTime} from 'utils/datetime';
import {ServiceOrderView} from '../../models/service-order';
import {Resource, RestError} from '../../models/misc';
import {
  ElevatorAvailability,
  ElevatorAvailabilityParams,
  ElevatorView,
} from '../../models/elevator';
import {ElevatorOrderPair, ElevatorsByAddress} from '../../pages/Units/Models';
import {usePropertyManager} from './usePropertyManager';

export const fetchServiceOrders = async (
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

export const fetchElevatorAvailability = async (
  params: ElevatorAvailabilityParams,
) => {
  const response = await axiosClient.get<ElevatorAvailability>(
    `/api/availabilities/elevators`,
    {
      params,
      paramsSerializer,
    },
  );
  return response.data;
};

const groupElevatorByAddressList = (
  serviceOrderView: ServiceOrderView[],
  elevatorRes?: Resource<ElevatorView>,
  elevatorAvailability?: ElevatorAvailability,
) => {
  const serviceOrderMap = _.groupBy(
    serviceOrderView,
    (order: ServiceOrderView) => order.elevator.id,
  );

  const elevatorWithOrders = elevatorRes!.data.map((elevator) => {
    const orders = serviceOrderMap[elevator.id];
    const availability = elevatorAvailability![elevator.id];
    const elevatorWithOrder: ElevatorOrderPair = {
      elevator: {
        ...elevator,
        availability: Object.values(availability)[0],
      },
      serviceOrder: orders && orders[0],
    };
    return elevatorWithOrder;
  });

  const elevatorByAddressList: ElevatorsByAddress[] = _.values(
    _.groupBy(elevatorWithOrders, (record) => record.elevator.address.id),
  ).map((elevators) => ({
    elevators,
    address: elevators[0].elevator.address,
  }));

  return elevatorByAddressList;
};

export const useFetchElevatorAvailability = (elevatorIds: string[]) => {
  const params = {
    elevatorId: elevatorIds,
    start: toRestDate(startOfMonth(new Date())),
    end: toRestDate(endOfMonth(new Date())),
    timeUnit: ServiceCompanyTimeUnit.MONTHLY,
  };
  return useQuery(
    [queryKeys.fetchElevatorAvailability, params],
    () => fetchElevatorAvailability(params),
    {
      enabled: !!elevatorIds.length,
    },
  );
};

export function useServiceOrders(params: any) {
  const {data: user} = usePropertyManager();
  return useQuery<Resource<ServiceOrderView>, RestError>(
    queryKeys.fetchServiceOrders,
    () => fetchServiceOrders(params, user!.propertyOwner.id),
    {enabled: !!user && !!params.elevatorIds},
  );
}

export function useFetchServiceOrdersByElevators(
  elevatorRes: Resource<ElevatorView>,
) {
  const {data: user} = usePropertyManager();
  const elevatorIds = elevatorRes?.data.map((elevator) => elevator.id);
  const {data: availability} = useFetchElevatorAvailability(elevatorIds);
  const start = toRestDateTime(new Date());
  const end = toRestDateTime(addDays(new Date(), 7));
  return useQuery<Resource<ServiceOrderView>, RestError, ElevatorsByAddress[]>(
    [queryKeys.fetchServiceOrders, elevatorIds],
    () =>
      fetchServiceOrders(
        {
          start,
          end,
          pageSize: 500,
          pageIndex: 0,
          elevatorIds,
          query: '',
        },
        user!.propertyOwner.id,
      ),
    {
      enabled: !!user && !!availability,
      select: useCallback(
        (serviceOrderView: Resource<ServiceOrderView>) =>
          groupElevatorByAddressList(
            serviceOrderView.data,
            elevatorRes,
            availability,
          ),

        [availability, user],
      ),
    },
  );
}
