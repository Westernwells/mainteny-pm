import {useQuery} from 'react-query';
import {ContractStatus, ContractOrderField} from '../types/contract';
import {Order} from '../types/misc';
import {paramsSerializer, request} from '../utils/axios-utils';

const queryContracts = (params: any) =>
  request({
    method: 'get',
    url: '/api/contracts',
    params,
    paramsSerializer,
  });

const fetchContractDetails = (contractId: string) =>
  request({
    method: 'get',
    url: `/api/contracts/${contractId}`,
  });

export const useQueryContract = () =>
  useQuery('query-contract', () =>
    queryContracts({
      query: '',
      status: [
        ContractStatus.EXPIRED,
        ContractStatus.PENDING,
        ContractStatus.VALID,
      ],
      pageIndex: 0,
      pageSize: 30,
      orderBy: ContractOrderField.EXPIRY_TIME,
      order: Order.ASC,
      serviceCompanyId: '4a156124-a1f1-4877-9059-595416996223',
    }),
  );

export const useFetchContractDetails = (contractId: string) =>
  useQuery('contract-details', () => fetchContractDetails(contractId), {
    enabled: false,
  });
