import {useQuery} from 'react-query';
import * as _ from 'lodash';
import {useCallback} from 'react';
import {queryKeys as qk} from 'reactQuery/constants';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import {invoiceDetail} from 'pages/InvoiceDetails/data';
import {invoices} from 'pages/Invoices/data';
import {Resource, RestError} from '../../models/misc';
import {InvoiceView, QueryInvoiceParams} from '../../models/invoice';
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
  return Promise.resolve(invoices);
};

export function useInvoices(params: QueryInvoiceParams) {
  const {data: user} = usePropertyManager();
  return useQuery<Resource<InvoiceView>, RestError>(
    [qk.fetchInvoice, params, user?.id],
    () => fetchInvoices(params, user!.propertyOwner.id),
    {enabled: !!user},
  );
}

export const fetchInvoice = async (invoiceId: string) => {
  const response = await axiosClient.get<InvoiceView>(
    `/api/invoices/${invoiceId}`,
  );

  return invoiceDetail;
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
