import {useEffect, useState} from 'react';
import * as _ from 'lodash';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {ServiceOrderView} from '../../models/service-order';
import {fetchElevators, useAllElevators} from '../../hooks/useElevator';
import {
  fetchServiceOrders,
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

  const [elevatorsByAddressList, setElevatorsByAddressList] = useState<
    ElevatorsByAddress[]
  >([]);

  async function doLoad() {
    const elevatorRes = await fetchElevators(search, page);
    const serviceOrders = await fetchServiceOrders(
      elevatorRes.data.map((elevator) => elevator.id),
    );

    const serviceOrderMap = _.groupBy(
      serviceOrders,
      (order: ServiceOrderView) => order.elevator.id,
    );

    const elevatorWithOrders = elevatorRes!.data.map((elevator) => {
      const orders = serviceOrderMap[elevator.id];
      const elevatorWithOrder: ElevatorOrderPair = {
        elevator,
        serviceOrder: orders && orders[0],
      };
      return elevatorWithOrder;
    });

    const elevatorByAddressList: ElevatorsByAddress[] = _.values(
      _.groupBy(elevatorWithOrders, (record) => record.elevator.address.id),
    ).map((elevators) => ({
      elevators,
      address: elevators[0].elevator.address,
    }));

    setElevatorsByAddressList(elevatorByAddressList);
  }
  const onSearchTextChanged = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    doLoad().then(() => stopLoading());
  }, [search, page]);

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
      {elevatorsByAddressList.map((elevatorsByAddress) => (
        <UnitSection
          key={elevatorsByAddress.address.id}
          elevatorsByAddress={elevatorsByAddress}
        />
      ))}
    </Box>
  );
};
