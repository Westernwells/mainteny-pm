import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import * as _ from 'lodash';
import {createEmptyResource} from 'utils/paging-utils';
import {fetchServiceHistoryByElevator} from 'hooks/reactQuery/useServiceHistory';
import {Elevator, ElevatorMaintenanceHistoryView} from 'models/elevator';
import {ServiceOrderView} from 'models/service-order';
import {StringMap} from 'models/misc';
import {
  fetchServiceOrderByIds,
  getServiceOrderById,
} from 'hooks/reactQuery/useServiceOrder';
import {ReactComponent as Elevation} from 'assets/icons/Elevation.svg';
import {ServiceHistoryCard} from './components/ServiceHistoryCard';
import {RunningServiceOrderCard} from './components/RunningServiceOrderCard';

function getMockedRunningServiceOrder(): ServiceOrderView {
  return getServiceOrderById('032e6ca0-28dc-4b6a-acbe-155ee75e1446');
}

export interface ServiceHistorySectionProp {
  elevator: Elevator;
}

const pageSize = 50;
export const ServiceHistorySection = ({
  elevator,
}: ServiceHistorySectionProp) => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [serviceHistories, setServiceHistories] = useState(
    createEmptyResource<ElevatorMaintenanceHistoryView>(pageSize),
  );
  const [runningServiceOrder] = useState(getMockedRunningServiceOrder());

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
    <Box
      sx={{
        background: '#fff',
        borderRadius: '8px',
        height: 650,
        px: '20px',
      }}
      pt={2}
      pb={3}
      px={2}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">
          Maintenance History ({serviceHistories.total})
        </Typography>
        <Elevation />
      </Box>

      <Box pt={2} height="90%" sx={{overflowY: 'scroll'}}>
        {runningServiceOrder && (
          <Box mb={1}>
            <RunningServiceOrderCard serviceOrder={runningServiceOrder} />
          </Box>
        )}

        {serviceHistories.data.slice(0, 2).map((history, index) => (
          <Box mb={1}>
            <ServiceHistoryCard
              key={history.id}
              serviceHistory={history}
              serviceOrder={serviceOrderMap[history.serviceOrderId]}
            />
          </Box>
        ))}
        <Typography
          variant="h6"
          textAlign="center"
          color={theme.palette.info.main}
        >
          More...
        </Typography>
      </Box>
    </Box>
  );
};
