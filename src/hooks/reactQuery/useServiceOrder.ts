import {useCallback} from 'react';
import {useSnackbar} from 'notistack';
import {useMutation, useQuery, UseQueryOptions} from 'react-query';
import * as _ from 'lodash';
import {AxiosResponse} from 'axios';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import {
  addDays,
  endOfMonth,
  startOfMonth,
  endOfWeek,
  startOfDay,
  getWeek,
  getMonth,
} from 'date-fns';
import {queryKeys} from 'reactQuery/constants';
import {ServiceCompanyTimeUnit} from 'models/service-company';
import {toDate, toRestDate, toRestDateTime} from 'utils/datetime';
import {
  OptionalCreateNonScheduledBody,
  ServiceOrderReport,
  ServiceOrderType,
  ServiceOrderView,
} from '../../models/service-order';
import {Priority, Resource, RestError} from '../../models/misc';
import {
  ElevatorAvailability,
  ElevatorAvailabilityParams,
  ElevatorView,
} from '../../models/elevator';
import {ElevatorOrderPair, ElevatorsByAddress} from '../../pages/Units/Models';
import {usePropertyManager} from './usePropertyManager';

interface ServiceOrderReportPayload {
  serviceOrderId: string | string[];
}

const filterByNextVisit = (
  serviceOrderViewRes: Resource<ServiceOrderView>,
  nextVisit: string[],
) => {
  let mergedResult = [] as ServiceOrderView[];
  let key: number | string;

  const monthIndex = getMonth(new Date());

  const serviceOrderViewMap = _.groupBy(
    serviceOrderViewRes.data,
    (serviceOrder) => {
      const theDate = toDate(serviceOrder.schedules[0].startTime);

      const month = getMonth(theDate);
      if (month === monthIndex) {
        return getWeek(theDate);
      }

      if (month === monthIndex + 1) {
        return 'nextMonth';
      }
      return null;
    },
  );

  nextVisit
    .map((item) => {
      switch (item) {
        case 'This week': // TODO: create an enum
          key = getWeek(new Date());
          break;
        case 'Next week':
          key = getWeek(addDays(startOfDay(endOfWeek(new Date())), 1));
          break;
        case 'Next month':
          key = 'nextMonth';
          break;
        default:
          break;
      }

      return serviceOrderViewMap[key];
    })
    .filter((item) => item)
    .forEach((item) => {
      const diff = _.differenceBy(mergedResult, item, 'id');
      mergedResult = [...diff, ...item];
    });

  return mergedResult;
};

const filterServiceOrder = (
  serviceOrderViewRes: Resource<ServiceOrderView>,
  filter: {nextVisit: string[]},
) => {
  let result = {...serviceOrderViewRes};

  if (filter.nextVisit.length) {
    const nextVisitFilter = filterByNextVisit(
      serviceOrderViewRes,
      filter.nextVisit,
    );
    result = {...result, data: nextVisitFilter, total: nextVisitFilter.length};
  }
  return result;
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

export const logIssue = async (body: OptionalCreateNonScheduledBody) => {
  await axiosClient.post(`/api/serviceOrders/nonscheduled`, {
    ...body,
  });
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

export const fetchServiceOrderReport = async (
  params: ServiceOrderReportPayload,
) => {
  const response = await axiosClient.get<ServiceOrderReport[]>(
    `/api/serviceOrders/reports`,
    {
      params,
      paramsSerializer,
    },
  );
  return response.data;
};

export function useServiceOrderReport(params: ServiceOrderReportPayload) {
  return useQuery<ServiceOrderReport[], RestError>(
    [queryKeys.fetchServiceOrderReport, params],
    () => fetchServiceOrderReport(params as ServiceOrderReportPayload),
    {enabled: !!params.serviceOrderId || !!params.serviceOrderId.length},
  );
}

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

export function useServiceOrders(params: any) {
  const {data: user} = usePropertyManager();
  return useQuery<Resource<ServiceOrderView>, RestError>(
    [queryKeys.fetchServiceOrders, params],
    () => fetchServiceOrders(params, user!.propertyOwner.id),
    {
      enabled: !!user && !!params.elevatorIds,
      select: useCallback((data) => data, [user, params]),
    },
  );
}

export function useFetchServiceOrdersByElevators(
  elevatorRes: Resource<ElevatorView>,
  filter: {nextVisit: string[]},
  options?: UseQueryOptions<any, any, any>,
) {
  const {data: user} = usePropertyManager();
  const elevatorIds = elevatorRes?.data.map((elevator) => elevator.id);
  const {data: availability} = useFetchElevatorAvailability(elevatorIds);
  const start = toRestDateTime(new Date());
  const end = toRestDateTime(addDays(new Date(), 30));
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
      ...options,
      enabled: !!user && !!availability,
      select: useCallback(
        (serviceOrderView: Resource<ServiceOrderView>) => {
          const filterResult = filterServiceOrder(serviceOrderView, filter);
          let response = groupElevatorByAddressList(
            filterResult.data,
            elevatorRes,
            availability,
          );
          if (filter.nextVisit.length) {
            response = response
              .filter(
                (item) => item.elevators.filter((x) => x.serviceOrder).length,
              )
              .map((item) => ({
                ...item,
                elevators: item.elevators.filter((x) => x.serviceOrder),
              }));
          }
          return response;
        },

        [availability, user, filter],
      ),
    },
  );
}

export const useLogIssue = () => {
  const {data: propertyManager} = usePropertyManager();
  const {enqueueSnackbar} = useSnackbar();
  const serviceCompanyId = propertyManager?.userAccount.serviceCompany.id;

  const {mutate, isLoading} = useMutation(
    (body: OptionalCreateNonScheduledBody) =>
      logIssue({
        ...body,
        dueDate: toRestDate(new Date()),
        externalId: '',
        priority: Priority.A,
        type: ServiceOrderType.EMERGENCY,
        serviceCompanyId: serviceCompanyId as string,
      }),
    {
      onSuccess: () => {
        enqueueSnackbar('Issue logged successfully', {
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
  return {mutate, isLoading};
};
