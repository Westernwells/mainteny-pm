import {useEffect, useState} from 'react';
import * as _ from 'lodash';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {ServiceOrderView} from '../../models/service-order';
import {fetchElevators, useAllElevators} from '../../hooks/useElevator';
import {
  fetchServiceOrders,
  useFetchServiceOrdersByElevators,
  useServiceOrders,
} from '../../hooks/useServiceOrder';
import {ElevatorsByAddress, ElevatorOrderPair} from './Models';
import {UnitSection} from './UnitSection';
import {UnitColumns} from './UnitColumns';
import {Widget} from '../../components/Widget';
import {makePage} from '../../utils/paging-utils';

interface Props {
  stopLoading: () => void;
}

export const MyUnits = ({stopLoading}: Props) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(makePage(0, 10)); // TODO: implement paging

  const {data: elevatorResponse} = useAllElevators(search, page);
  const {data: elevatorsByAddressList} = useFetchServiceOrdersByElevators(
    elevatorResponse,
    stopLoading,
  );

  console.log(elevatorsByAddressList, '>>>>>>>>>>?????');

  const onSearchTextChanged = (value: string) => {
    setSearch(value);
  };

  return (
    <Box>
      <Box mb={5} display="flex" justifyContent="space-between">
        <Typography variant="h4">Units</Typography>
        <Widget
          searchPlaceholder="Type ‘Schindler’ or ‘Blue Plaza’"
          onSearchTextChanged={onSearchTextChanged}
        />
      </Box>

      <UnitColumns />
      <Box sx={{height: '73vh', overflowY: 'scroll'}}>
        {elevatorsByAddressList?.map((elevatorsByAddress) => (
          <UnitSection
            key={elevatorsByAddress.address.id}
            elevatorsByAddress={elevatorsByAddress}
          />
        ))}
      </Box>
    </Box>
  );
};
