/* eslint-disable */
import {useCallback} from 'react';
import {useQuery, UseQueryOptions} from 'react-query';
import * as _ from 'lodash';
import {queryKeys as qk} from 'reactQuery/constants';
import {axiosClient, paramsSerializer} from '../../utils/axios-utils';
import {ContractView, QueryContractParams} from '../../models/contract';
import {Resource, RestError} from '../../models/misc';
import {useUser, useUserSession} from './useUserSession';

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
  params: Partial<QueryContractParams>,
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

export const useQueryContract = (
  params: Partial<QueryContractParams>,
  options?: UseQueryOptions<any, any, any>,
) => {
  const {data: user} = useUser();
  return useQuery<Resource<ContractView>, RestError, Resource<ContractView>>(
    [qk.contracts, params],
    () => fetchContracts(user!.userData.propertyOwner.id, params),
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
