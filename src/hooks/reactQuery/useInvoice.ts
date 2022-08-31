import {useQuery, UseQueryOptions} from 'react-query';
import {queryKeys as qk} from 'reactQuery/constants';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import {Resource, RestError} from 'models/misc';
import {InvoiceView, QueryInvoiceParams} from 'models/invoice';
import {ElevatorInvoicesQueryParams} from 'models/elevator';
import {useUser} from './useUserSession';

export const fetchInvoices = async (
  params: QueryInvoiceParams,
  id: string,
): Promise<Resource<InvoiceView>> => {
  const response = await axiosClient.get<Resource<InvoiceView>>(
    `/api/propertyOwners/${id}/invoices`,
    {
      params,
      paramsSerializer,
    },
  );
  return response.data;
};

export function useInvoices(
  params: QueryInvoiceParams,
  options?: UseQueryOptions<
    Resource<InvoiceView>,
    RestError,
    Resource<InvoiceView>
  >,
) {
  const {data: user} = useUser();
  return useQuery<Resource<InvoiceView>, RestError>(
    [qk.fetchInvoices, params],
    () => fetchInvoices(params, user!.userData.propertyOwner.id),
    {
      enabled: !!user,
      ...options,
    },
  );
}

export const fetchInvoice = async (invoiceId: string) => {
  const response = await axiosClient.get<InvoiceView>(
    `/api/invoices/${invoiceId}`,
  );
  return response.data;
};

export function useInvoiceDetail(invoiceId?: string) {
  return useQuery(qk.invoiceById, () => fetchInvoice(invoiceId!), {
    enabled: !!invoiceId,
  });
}

export const fetchElevatorInvoices = async (
  elevatorId: string,
  params: ElevatorInvoicesQueryParams,
): Promise<Resource<InvoiceView>> => {
  const response = await axiosClient.get<Resource<InvoiceView>>(
    `/api/elevators/${elevatorId}/invoices`,
    {
      params,
      paramsSerializer,
    },
  );
  return response.data;
};

export function useElevatorInvoices(
  elevatorId: string,
  params: ElevatorInvoicesQueryParams,
  options?: any,
) {
  const {data: user} = useUser();
  return useQuery<Resource<InvoiceView>, RestError>(
    [qk.fetchElevatorInvoices, elevatorId, params],
    () => fetchElevatorInvoices(elevatorId, params),
    {
      enabled: !!user,
      ...options,
    },
  );
}

const fetchServiceOrderInvoices = async (serviceOrderId: string) => {
  const response = await axiosClient.get<InvoiceView[]>(
    `/api/serviceOrders/${serviceOrderId}/invoices`,
  );
  return response.data;
};

export const useFetchServiceOrderInvoices = (
  serviceOrderId?: string,
  options?: UseQueryOptions<any, any, any>,
) =>
  useQuery<InvoiceView[]>(
    [qk.fetchServiceOrderInvoices, serviceOrderId],
    () => fetchServiceOrderInvoices(serviceOrderId!),
    {enabled: !!serviceOrderId, ...options},
  );
