import {useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  useFetchContractsElevatorMap,
  useQueryContract,
} from '../../hooks/useContract';
import {ContractView} from '../../models/contract';
import {ElevatorView} from '../../models/elevator';
import {BtnGroupType, Resource} from '../../models/misc';
import {createEmptyResource, makePage} from '../../utils/paging-utils';
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
  const fallback = useRef<Resource<ContractRecord>>(
    createEmptyResource(10),
  ).current;
  const [page, setPage] = useState(makePage(0, pageSize));

  const {data: contracts} = useQueryContract(search, page);
  const {data: contractResource = fallback, isLoading} =
    useFetchContractsElevatorMap(contracts);

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
