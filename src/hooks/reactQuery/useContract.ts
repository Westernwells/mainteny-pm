/* eslint-disable */
import {useCallback} from 'react';
import {useQuery, UseQueryOptions} from 'react-query';
import * as _ from 'lodash';
import {queryKeys as qk} from 'reactQuery/constants';
import {axiosClient, paramsSerializer} from '../../utils/axios-utils';
import {ContractView, QueryContractParams} from '../../models/contract';
import {Resource, RestError} from '../../models/misc';
import {useUserSession} from './useUserSession';

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
  const {user} = useUserSession();
  return useQuery<Resource<ContractView>, RestError, Resource<ContractView>>(
    [qk.contracts, params],
    () => fetchContracts(user!.userAccount.id, params),
    {
      ...options,
      enabled: !!user,
    },
  );
};

const fetchContractDetails = async (contractId: string) => {
  const response = await axiosClient.get<ContractView>(
    `/api/contracts/${contractId}`,
  );
  return response.data;
};
export const useFetchContractDetails = (contractId: string) =>
  useQuery([qk.contractDetails, contractId], () =>
    fetchContractDetails(contractId),
  );

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
