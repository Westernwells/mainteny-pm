import React, {useEffect, useState} from 'react';
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
import {ServiceHistoryCard} from './ServiceHistoryCard';

export interface ServiceHistorySectionProp {
  elevator: Elevator;
  renderIcon?: () => React.ReactChild;
  renderHeaderText?: (serviceHistoryTotal: number) => React.ReactChild;
  addShadowToCard?: boolean;
  showAll?: boolean;
  hideMoreDetailArrow?: boolean;
}

const pageSize = 50;
export const ServiceHistorySection = ({
  elevator,
  renderIcon,
  renderHeaderText,
  addShadowToCard,
  showAll,
  hideMoreDetailArrow,
}: ServiceHistorySectionProp) => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState<string | undefined>();
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
    <Box
      sx={{
        background: '#fff',
        borderRadius: '8px',
        height: 650,
        px: '20px',
        boxShadow: addShadowToCard
          ? '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'
          : null,
      }}
      pt={2}
      pb={3}
      px={2}
    >
      <Box display="flex" justifyContent="space-between">
        {renderHeaderText ? (
          renderHeaderText(serviceHistories.total)
        ) : (
          <Typography variant="h6">
            Maintenance History ({serviceHistories.total})
          </Typography>
        )}{' '}
        :{renderIcon ? renderIcon() : <Elevation />}
      </Box>

      <Box pt={2} height="90%" sx={{overflowY: 'scroll'}}>
        {serviceHistories.data
          .slice(0, !showAll ? 3 : undefined)
          .map((history, index) => (
            <Box
              mb={1}
              sx={{cursor: hideMoreDetailArrow ? 'pointer' : 'default'}}
              onClick={() => setActiveCard(history.id)}
            >
              <ServiceHistoryCard
                key={history.id}
                serviceHistory={history}
                serviceOrder={serviceOrderMap[history.serviceOrderId]}
                running={!!(index === 0)}
                hideMoreDetailArrow={hideMoreDetailArrow}
                active={activeCard === history.id && hideMoreDetailArrow}
              />
            </Box>
          ))}
        {!showAll ? (
          <Typography
            variant="h6"
            textAlign="center"
            color={theme.palette.info.main}
          >
            More...
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};
