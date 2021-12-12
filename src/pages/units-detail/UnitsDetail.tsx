import React, {useEffect, useState} from 'react';
import {Box, Stack} from '@mui/material';
import {Elevator} from '../../models/elevator';
import {ServiceOrderView} from '../../models/service-order';
import {fetchElevator} from '../../hooks/useElevator';
import {fetchServiceOrdersByElevator} from '../../hooks/useServiceOrder';
import {Resource} from '../../models/misc';
import {ElevatorBasicSection} from './ElevatorBasicSection';
import {ServiceHistorySection} from './ServiceHistorySection';
import {TechnicianSection} from './TechnicianSection';
import {createEmptyResource} from '../../utils/paging-utils';
import {ElevatorBreakDownSection} from './ElevatorBreakDownSection';
import {ElevatorAvailabilitySection} from './ElevatorAvailabilitySection';

const pageSize = 10;
export interface UnitsDetailProps {
  stopLoading: () => void;
}
// TODO: enable the rule again
// eslint-disable-next-line
export const UnitsDetail = ({stopLoading}: UnitsDetailProps) => {
  const [elevator, setElevator] = useState<Elevator>();
  const [serviceOrders, setServiceOrders] = useState<
    Resource<ServiceOrderView>
  >(createEmptyResource(pageSize));
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const doLoad = async () => {
      const elevatorId = 'mocked elevator id'; // TODO use real elevator id from url
      const data = await Promise.all([
        fetchElevator(elevatorId),
        fetchServiceOrdersByElevator(elevatorId),
      ]);
      setElevator(data[0]);
      setServiceOrders(data[1]);
      setLoading(false);
      stopLoading();
    };
    doLoad();
  }, []);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  return (
    <Stack>
      <ElevatorBasicSection elevator={elevator as Elevator} />
      <ServiceHistorySection elevator={elevator as Elevator} />
      {serviceOrders.data.length > 0 && (
        <TechnicianSection serviceOrder={serviceOrders.data[0]} />
      )}
      <ElevatorBreakDownSection />
      <ElevatorAvailabilitySection />
    </Stack>
  );
};
