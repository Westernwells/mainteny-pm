import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import {
  fetchContracts,
  fetchContractsElevatorMap,
} from '../../hooks/useContract';
import {ContractView} from '../../models/contract';
import {ElevatorView} from '../../models/elevator';
import {BtnGroupType, Page, Resource, StringMap} from '../../models/misc';
import {
  createEmptyResource,
  getNextPage,
  makePage,
} from '../../utils/paging-utils';
import {getDay} from '../../utils/datetime';
import {ContractHeader} from './ContractHeader';
import {ContractRow} from './ContractRow';
import {Widget} from '../../components/Widget';

const pageSize = 10;
interface ContractRecord {
  contract: ContractView;
  elevators: ElevatorView[];
}

export const Contracts = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, pageSize));
  const [isLoading, setLoading] = useState(true);
  const [contractResource, setContractResource] = useState<
    Resource<ContractRecord>
  >(createEmptyResource(pageSize));

  useEffect(() => {
    const doLoad = async () => {
      const contracts = await fetchContracts(search, page);

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
    };

    doLoad();
  }, [search, page]);

  if (isLoading) {
    return <Box>Loading</Box>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box sx={{mb: 4}}>
          <Typography variant="h4">Contracts</Typography>
        </Box>
        <Box mt={1}>
          <Widget
            btnGroupType={BtnGroupType.ICON}
            searchPlaceholder="Try 'Astralift BV'"
            onSearchTextChanged={setSearch}
          />
        </Box>
      </Box>
      <Box>
        <ContractHeader />
        <Box sx={{height: '73vh', overflowY: 'scroll', paddingBottom: '1rem'}}>
          {contractResource.data.map((record, index) => (
            <ContractRow
              key={record.contract.id}
              contract={record}
              index={index}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
