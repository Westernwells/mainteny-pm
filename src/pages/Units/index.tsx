import React, {useEffect, useState} from 'react';
import * as _ from 'lodash';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {ServiceOrderView} from '../../models/service-order';
import {useAllElevators} from '../../hooks/useElevator';
import {useServiceOrders} from '../../hooks/useServiceOrder';
import {ElevatorsByAddress, ElevatorOrderPair} from './Models';
import {UnitSection} from './UnitSection';
import {UnitColumns} from './UnitColumns';
import {Widget} from '../../components/Widget';

interface Props {
  stopLoading: () => void;
}

export const MyUnits = ({stopLoading}: Props) => {
  const {data: serviceOrderRes, isLoading: serviceOrderResLoading} =
    useServiceOrders();
  const {data: elevatorRes, isLoading: elevatorResLoading} = useAllElevators();
  const [elevatorsByAddressList, setElevatorsByAddressList] = useState<
    ElevatorsByAddress[]
  >([]);

  useEffect(() => {
    if (!serviceOrderResLoading && !elevatorResLoading) {
      const serviceOrderMap = _.groupBy(
        serviceOrderRes!.data,
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
    stopLoading();
  }, [serviceOrderResLoading, elevatorResLoading]);

  return (
    <Box>
      <Box mb={5} display="flex" justifyContent="space-between">
        <Typography variant="h4">Units</Typography>
        <Widget searchPlaceholder="Type ‘Schindler’ or ‘Blue Plaza’" />
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
