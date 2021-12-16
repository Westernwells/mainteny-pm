import {useEffect, useState} from 'react';
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
import {createEmptyResource, getNextPage} from '../../utils/paging-utils';
import {getDay} from '../../utils/datetime';
import {ContractHeader} from './ContractHeader';
import {ContractRow} from './ContractRow';
import {Widget} from '../../components/Widget';

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
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4">Contracts</Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{mt: 1, mb: 2}}>
            <Link underline="hover" color="inherit" href="/">
              Contracts /
            </Link>
          </Breadcrumbs>
        </Box>
        <Box mt={1}>
          <Widget
            btnGroupType={BtnGroupType.ICON}
            searchPlaceholder="Try ‘Delfar Elevators’"
          />
        </Box>
      </Box>
      <Box>
        <ContractHeader />
        <Box sx={{height: '73vh', overflowY: 'scroll'}}>
          {contractResource.data.map((record) => (
            <ContractRow contract={record} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
