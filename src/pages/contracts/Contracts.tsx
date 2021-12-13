import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, Stack} from '@mui/material';
import {
  fetchContracts,
  fetchContractsElevatorMap,
} from '../../hooks/useContract';
import {ContractView} from '../../models/contract';
import {ElevatorView} from '../../models/elevator';
import {Page, Resource, StringMap} from '../../models/misc';
import {createEmptyResource, getNextPage} from '../../utils/paging-utils';
import {getDay} from '../../utils/datetime';

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
        <Grid container columns={12}>
          <Grid item xs={3}>
            <div>CONTRACTOR</div>
          </Grid>
          <Grid item xs={2}>
            <div>CONTRACT NUMBER</div>
          </Grid>
          <Grid item xs={1}>
            <div>UNITS</div>
          </Grid>
          <Grid item xs={2}>
            <div>COST/YR</div>
          </Grid>
          <Grid item xs={2}>
            <div>EXPIRY DATE</div>
          </Grid>
          <Grid item xs={2}>
            <div>ACTIONS</div>
          </Grid>
        </Grid>
        {contractResource.data.map((record) => (
          <Grid container columns={12}>
            <Grid item xs={3}>
              <div>{record.contract.serviceCompany.name}</div>
            </Grid>
            <Grid item xs={2}>
              {/* TODO: fix contract number */}
              <div>abc-01</div>
            </Grid>
            <Grid item xs={1}>
              <div>{record.elevators.length}</div>
            </Grid>
            <Grid item xs={2}>
              <div>{`${record.contract.hourlyRate}/${record.contract.visitsNumber}`}</div>
            </Grid>
            <Grid item xs={2}>
              <div>{getDay(record.contract.endTime)}</div>
            </Grid>
            <Grid item xs={2}>
              <Button>View</Button>
              <Button>Download</Button>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};
