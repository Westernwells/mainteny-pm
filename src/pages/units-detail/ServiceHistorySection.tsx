import React, {useEffect, useState} from 'react';
import {Box, Stack} from '@mui/material';
import * as _ from 'lodash';
import {createEmptyResource} from '../../utils/paging-utils';
import {fetchServiceHistoryByElevator} from '../../hooks/useServiceHistory';
import {Elevator, ElevatorMaintenanceHistoryView} from '../../models/elevator';
import {getDay} from '../../utils/datetime';
import {ServiceOrderView} from '../../models/service-order';
import {StringMap} from '../../models/misc';
import {fetchServiceOrderByIds} from '../../hooks/useServiceOrder';

export interface ServiceHistorySectionProp {
  elevator: Elevator;
}

const pageSize = 50;
export const ServiceHistorySection = ({
  elevator,
}: ServiceHistorySectionProp) => {
  const [isLoading, setLoading] = useState(true);
  const [serviceHistories, setServiceHistories] = useState(
    createEmptyResource<ElevatorMaintenanceHistoryView>(pageSize),
  );
  const [serviceOrderMap, setServiceOrderMap] = useState<
    StringMap<ServiceOrderView>
  >({});

  useEffect(() => {
    const doLoad = async () => {
      const histories = await fetchServiceHistoryByElevator(elevator.id);
      setServiceHistories(histories);

      const serviceOrders = await fetchServiceOrderByIds(
        histories.data.map((history) => history.serviceOrderId),
      );
      setServiceOrderMap(_.keyBy(serviceOrders, (order) => order.id));

      setLoading(false);
    };
    doLoad();
  }, []);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <h2>Service History</h2>
      {serviceHistories.data.map((history) => (
        <Stack key={history.id} spacing={1}>
          <Stack direction="row" spacing={3}>
            <div>{getDay(history.createdAt)}</div>
            <div>{serviceOrderMap[history.serviceOrderId]?.type}</div>
            <div>{serviceOrderMap[history.serviceOrderId]?.status}</div>
          </Stack>
          <div>{history.description}</div>
        </Stack>
      ))}
    </Box>
  );
};
