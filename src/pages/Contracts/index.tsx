import {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  useContractElevatorCount,
  useQueryContract,
} from '../../hooks/reactQuery/useContract';
import {ContractOrderField, ContractView} from '../../models/contract';
import {ElevatorView} from '../../models/elevator';
import {BtnGroupType, Order, Resource} from '../../models/misc';
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
  const [page, setPage] = useState(makePage(0, pageSize));
  const [showFilter, setShowFilter] = useState(false);
  const {data: contractResource = createEmptyResource<ContractView>(10)} =
    useQueryContract({
      order: Order.DESC,
      orderBy: ContractOrderField.CREATED_TIME,
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
      query: search,
    });

  const {data: contractWithUnits} = useContractElevatorCount(
    contractResource.data,
  );

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
            setShowFilter={setShowFilter}
            showFilter={showFilter}
          />
        </Box>
      </Box>
      <Box>
        <ContractHeader />
        <Box sx={{height: '73vh', overflowY: 'scroll', paddingBottom: '1rem'}}>
          {contractWithUnits?.map((contract, index) => (
            <ContractRow key={contract.id} contract={contract} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
