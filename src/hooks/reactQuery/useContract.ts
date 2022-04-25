import {useCallback} from 'react';
import {useQuery, UseQueryOptions} from 'react-query';
import * as _ from 'lodash';
import {queryKeys as qk} from 'reactQuery/constants';
import {useNavigate} from 'react-router-dom';
import {axiosClient, paramsSerializer} from '../../utils/axios-utils';
import {
  Contract,
  ContractView,
  QueryContractParams,
} from '../../models/contract';
import {Resource, RestError} from '../../models/misc';
import {usePropertyManager} from './usePropertyManager';

export const fetchContractElevatorCount = async (contractId: string[]) => {
  const response = await axiosClient.get<{[key: string]: number}>(
    `/api/contracts/elevators/count`,
    {
      params: {contractId},
      paramsSerializer,
    },
  );

  return response.data;
};

export const fetchContracts = async (
  id: string,
  params: QueryContractParams,
) => {
  const response = await axiosClient.get<Resource<ContractView>>(
    `/api/propertyOwners/${id}/contracts`,
    {
      params,
      paramsSerializer,
    },
  );

  return response.data;
};

const fetchContractDetails = async (contractId: string) => {
  const response = await axiosClient.get<Contract>(
    `/api/contracts/${contractId}`,
  );
  return response.data;
};

const filterByExpiryData = (
  contractsRes: Resource<ContractView>,
  expiryDate: {
    start: Date;
    end: Date;
  },
) => {
  let mergedResult = [] as ContractView[];
  mergedResult = contractsRes.data.filter(
    (item) =>
      'endTime' in item &&
      new Date(item.endTime) > expiryDate.start &&
      new Date(item.endTime) <= expiryDate.end,
  );
  return mergedResult;
};

export const filterByContractor = (
  contractsRes: Resource<ContractView>,
  contractors: string[],
) => {
  let mergedResult = [] as ContractView[];
  const contractsByContractor = _.groupBy(
    contractsRes.data,
    (contract) => contract.serviceCompany.name,
  );

  contractors
    .map((contractor) => contractsByContractor[contractor])
    .filter((item) => item)
    .forEach((item) => {
      const diff = _.differenceBy(mergedResult, item, 'id');
      mergedResult = [...diff, ...item];
    });

  return mergedResult;
};

export const filterByPrice = (
  contractsRes: Resource<ContractView>,
  price: number[][],
) => {
  let mergedResult = [] as ContractView[];

  const inRange = (item: number, range: number[][]) => {
    let result = false;
    range.forEach((interval) => {
      if (item >= interval[0] && item < interval[1]) {
        result = true;
      }
    });
    return result;
  };
  mergedResult = contractsRes.data.filter((item) => inRange(item.price, price));
  return mergedResult;
};

const filterContracts = (
  contractsRes: Resource<ContractView>,
  filter: {
    expiryDate?: {
      start: Date;
      end: Date;
    } | null;
    contractor?: string[];
    price?: number[][];
  },
) => {
  let result = {...contractsRes};

  if (filter.expiryDate) {
    const expiryDates = filterByExpiryData(contractsRes, filter.expiryDate);
    result = {...result, data: expiryDates, total: expiryDates.length};
  }

  if (filter.contractor?.length) {
    const contractors = filterByContractor(result, filter.contractor);
    result = {...result, data: contractors, total: contractors.length};
  }

  if (filter.price?.length) {
    const prices = filterByPrice(result, filter.price);
    result = {...result, data: prices, total: prices.length};
  }
  return result;
};

export const useQueryContract = (
  params: QueryContractParams,
  // TODO: Create interface for filters
  filter: {
    expiryDate?: {
      start: Date;
      end: Date;
    } | null;
    contractor?: string[];
    price?: number[][];
  },
  options?: UseQueryOptions<any, any, any>,
) => {
  const {data: user} = usePropertyManager();
  return useQuery<Resource<ContractView>, RestError, Resource<ContractView>>(
    [qk.contracts, params],
    () => fetchContracts(user!.propertyOwner.id, params),
    {
      ...options,
      enabled: !!user,
      select: useCallback(
        (contractsRes: Resource<ContractView>) => {
          const filterResult = filterContracts(contractsRes, filter);
          return filterResult;
        },
        [filter],
      ),
    },
  );
};

export const useFetchContractDetails = (contractId: string) => {
  const navigate = useNavigate();
  return useQuery(
    [qk.contractDetails, contractId],
    () => fetchContractDetails(contractId),
    {
      onError: (err: any) => {
        if (err.response.status === 500) {
          navigate('/404');
        }
      },
    },
  );
};

export const useContractElevatorCount = (
  contracts: ContractView[],
  options?: UseQueryOptions<{[key: string]: number}, RestError, ContractView[]>,
) => {
  const contractIds = contracts.map((contract) => contract.id);
  return useQuery<{[key: string]: number}, RestError, ContractView[]>(
    [qk.fetchContractElevatorCount, contractIds],
    () => fetchContractElevatorCount(contractIds),
    {
      ...options,
      enabled: !!contracts.length,
      select: useCallback(
        (data) =>
          contracts.map((contract) => ({
            ...contract,
            units: data[contract.id],
          })),

        [contracts],
      ),
    },
  );
};
