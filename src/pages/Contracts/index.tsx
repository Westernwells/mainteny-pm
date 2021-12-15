import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import {
  fetchContracts,
  fetchContractsElevatorMap,
} from '../../hooks/useContract';
import {ContractView} from '../../models/contract';
import {ElevatorView} from '../../models/elevator';
import {Page, Resource, StringMap} from '../../models/misc';
import {createEmptyResource, getNextPage} from '../../utils/paging-utils';
import {getDay} from '../../utils/datetime';
import {ContractHeader} from './ContractHeader';
import {ContractRow} from './ContractRow';

const pageSize = 50;
interface ContractRecord {
  contract: ContractView;
  elevators: ElevatorView[];
}

export interface ContractsProp {
  stopLoading: () => void;
}

export const Contracts = ({stopLoading}: ContractsProp) => {
  const [isLoading, setLoading] = useState(true);
  const [contractResource, setContractResource] = useState<
    Resource<ContractRecord>
  >(createEmptyResource(pageSize));

  useEffect(() => {
    const doLoad = async () => {
      const page = getNextPage(contractResource) as Page; // TODO: implement paging
      const contracts = await fetchContracts('abc', page);

      let elevatorMap: StringMap<ElevatorView[]> = {};
      if (contracts.data.length > 0) {
        elevatorMap = await fetchContractsElevatorMap(
          contracts.data.map((c) => c.id),
        );
      }
      const contractElevatorMap: ContractRecord[] = contracts.data.map(
        (contract) => {
          const elevators = elevatorMap[contract.id] || [];
          return {contract, elevators};
        },
      );
      setContractResource({
        data: contractElevatorMap,
        page: contracts.page,
        total: contracts.total,
      });
      setLoading(false);
      stopLoading();
    };

    doLoad();
  }, []);

  if (isLoading) {
    return <Box>Loading</Box>;
  }

  return (
    <Box>
      <h2>Contracts</h2>
      <Box display="flex" justifyContent="space-between">
        <div>Contracts /</div>
        <Stack direction="row">
          <div>Filter</div>
          <div>Sort</div>
          <input placeholder="Tyr 'Elevators'" />
        </Stack>
      </Box>
      <Box>
        <ContractHeader />
        {contractResource.data.map((record) => (
          <ContractRow contract={record} />
        ))}
      </Box>
    </Box>
  );
};
