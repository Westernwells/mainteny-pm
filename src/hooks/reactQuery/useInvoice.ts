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

function generateInvoice(): InvoiceView[] {
  const startDate = getDateObject('2021-05-23T00:00:00Z');
  const invoices = [];
  for (let i = 20; i > 0; i -= 1) {
    const number = `INV000${_.padStart(i.toString(), 3, '0')}`;
    const amount = _.random(20, 80) * 100;
    const serviceCompany =
      i % 4 === 0 ? 'Maintenance Experts GmbH' : 'Astralift BV';
    let paid = InvoiceStatus.PAID;
    if (i % 3 === 0 || i % 5 === 0) {
      paid = InvoiceStatus.NOT_PAID;
    }
    invoices.push({
      id: i.toString(),
      issueDate: addDays(startDate, i * 4).toISOString(),
      number,
      serviceCompany,
      amount: {
        amount,
        currency: 'EUR',
      },
      status: paid,
      search: `${number} ${amount} EUR ${paid} ${serviceCompany}`.toLowerCase(),
      meta: {
        createdAt: '2021-05-30T22:45:24.258240Z',
        lastUpdatedAt: '2021-05-30T22:45:25.909Z',
        state: State.ACTIVE,
      },
    });
  }
  return invoices;
}

const invoices: Resource<InvoiceView> = {
  data: generateInvoice(),
  page: makePage(0, 50),
  total: 1000,
};

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
