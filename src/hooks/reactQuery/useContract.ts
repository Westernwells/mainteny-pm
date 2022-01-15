import {useCallback} from 'react';
import {useQuery} from 'react-query';
import * as _ from 'lodash';
import {queryKeys as qk} from 'reactQuery/constants';
import {axiosClient, paramsSerializer} from '../../utils/axios-utils';
import {ContractView, QueryContractParams} from '../../models/contract';
import {Resource} from '../../models/misc';
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
  const response = await axiosClient.get<ContractView>(
    `/api/contracts/${contractId}`,
  );
  return response.data;
};

export const useQueryContract = (params: QueryContractParams) => {
  const {data: user} = usePropertyManager();
  return useQuery(
    [qk.contracts, params],
    () => fetchContracts(user!.propertyOwner.id, params),
    {enabled: !!user},
  );
};

export const useFetchContractDetails = (contractId: string) =>
  useQuery([qk.contractDetails, contractId], () =>
    fetchContractDetails(contractId),
  );

export const useContractElevatorCount = (contracts: ContractView[]) => {
  const contractIds = contracts.map((contract) => contract.id);
  return useQuery(
    [qk.fetchContractElevatorCount, contractIds],
    () => fetchContractElevatorCount(contractIds),
    {
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
