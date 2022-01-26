import {useQuery} from 'react-query';
import * as _ from 'lodash';
import {addDays} from 'date-fns';
import {queryKeys as qk} from 'reactQuery/constants';
import {axiosClient, paramsSerializer} from 'utils/axios-utils';
import {Page, Resource, RestError, State} from '../../models/misc';
import {
  InvoiceStatus,
  InvoiceView,
  QueryInvoiceParams,
} from '../../models/invoice';
import {createResource, makePage} from '../../utils/paging-utils';
import {getDateObject} from '../../utils/datetime';
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

export function useInvoices(params: QueryInvoiceParams) {
  const {data: user} = usePropertyManager();
  return useQuery<Resource<InvoiceView>, RestError>(
    [qk.fetchInvoice, params, user?.id],
    () => fetchInvoices(params, user!.propertyOwner.id),
    {enabled: !!user},
  );
}
