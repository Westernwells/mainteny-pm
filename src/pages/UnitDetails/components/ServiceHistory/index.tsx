import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import * as _ from 'lodash';
import {createEmptyResource} from 'utils/paging-utils';
import {fetchServiceHistoryByElevator} from 'hooks/reactQuery/useServiceHistory';
import {Elevator, ElevatorMaintenanceHistoryView} from 'models/elevator';
import {ScrollableCard} from 'components/ScrollableCard';
import {ServiceOrderView} from 'models/service-order';
import {StringMap} from 'models/misc';
import {fetchServiceOrderByIds} from 'hooks/reactQuery/useServiceOrder';
import {ServiceHistoryCard} from './ServiceHistoryCard';

export interface ServiceHistorySectionProp {
  elevator: Elevator;
  renderIcon?: () => React.ReactChild;
  renderHeaderText?: (serviceHistoryTotal: number) => React.ReactChild;
  addShadowToCard?: boolean;
  showAll?: boolean;
  hideMoreDetailArrow?: boolean;
  cardHeight?: number;
}

const pageSize = 50;
export const ServiceHistorySection = ({
  elevator,
  renderIcon,
  renderHeaderText,
  addShadowToCard,
  showAll,
  hideMoreDetailArrow,
  cardHeight = 650,
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
    <ScrollableCard
      renderIcon={renderIcon}
      addShadowToCard={addShadowToCard}
      cardHeight={cardHeight}
      renderHeaderText={() =>
        renderHeaderText ? (
          renderHeaderText(serviceHistories.total)
        ) : (
          <Typography variant="h6">
            Maintenance History ({serviceHistories.total})
          </Typography>
        )
      }
    >
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
    </ScrollableCard>
  );
};
