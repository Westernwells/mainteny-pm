import {useQuery} from 'react-query';
import * as _ from 'lodash';
import {useCallback} from 'react';
import {queryKeys as qk} from 'reactQuery/constants';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import {Resource, RestError} from '../../models/misc';
import {
  InvoiceStatus,
  InvoiceStatusView,
  InvoiceView,
  QueryInvoiceParams,
} from '../../models/invoice';
import {usePropertyManager} from './usePropertyManager';

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

export const filterByTotalAmount = (
  invoiceRes: Resource<InvoiceView>,
  amountRange: number[][],
) => {
  const inRange = (item: number, range: number[][]) => {
    let result = false;
    range.forEach((interval) => {
      if (item >= interval[0] && item < interval[1]) {
        result = true;
      }
    });
    return result;
  };
  return invoiceRes.data.filter((item) =>
    inRange(item.totalAmount.amount, amountRange),
  );
};

const filterByStatus = (
  invoiceRes: Resource<InvoiceView>,
  status: string[],
) => {
  let filteredResult = [] as InvoiceView[];
  const invoiceStatusMap = _.groupBy(
    invoiceRes.data,
    (ivoice) => ivoice.status,
  );
  status
    .map((item) => invoiceStatusMap[item])
    .filter((item) => item)
    .forEach((item) => {
      filteredResult = [...filteredResult, ...item];
    });
  return filteredResult;
};

const filterInvoices = (
  invoicesRes: Resource<InvoiceView>,
  filters: {amount: number[][]; status: string[]},
) => {
  let result = {...invoicesRes};
  if (filters.amount.length) {
    const amounts = filterByTotalAmount(result, filters.amount);
    result = {...result, data: amounts, total: amounts.length};
  }
  if (filters.status.length) {
    const status = filterByStatus(result, filters.status);
    result = {...result, data: status, total: status.length};
  }
  return result;
};

export function useInvoices(
  params: QueryInvoiceParams,
  filters: {amount: number[][]; status: string[]},
) {
  const {data: user} = usePropertyManager();
  return useQuery<Resource<InvoiceView>, RestError>(
    [qk.fetchInvoice, params, user?.id],
    () => fetchInvoices(params, user!.propertyOwner.id),
    {
      enabled: !!user,
      select: useCallback(
        (invoicesRes: Resource<InvoiceView>) => {
          const filterResult = filterInvoices(invoicesRes, filters);
          return filterResult;
        },
        [filters],
      ),
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

export const fetchInvoiceDownloadUrl = async (
  pdfPath: string,
  serviceCompanyId: string,
) => {
  const response = await axiosClient.get<{[key: string]: string}>(
    `/api/media/signedUrl/download`,
    {
      params: {file: pdfPath, serviceCompanyId},
      paramsSerializer,
    },
  );

  return response.data;
};

export const useInvoiceDownloadUrl = (pdfPath?: string) => {
  const {data: propertyManager} = usePropertyManager();
  const serviceCompanyId = propertyManager?.userAccount.serviceCompany.id;
  return useQuery(
    [qk.invoiceDownloadUrl, pdfPath, serviceCompanyId],
    () => fetchInvoiceDownloadUrl(pdfPath!, serviceCompanyId!),
    {
      enabled: !!pdfPath && !!serviceCompanyId,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      select: useCallback((data) => data[pdfPath!], [pdfPath]),
    },
  );
};
