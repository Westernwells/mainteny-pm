import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import * as _ from 'lodash';
import {Resource} from 'models/misc';
import {EmptyItem} from 'components/EmptyItem';

import {ElevatorMaintenanceHistoryView} from 'models/elevator';
import {ScrollableCard} from 'components/ScrollableCard';
import {HistoryCard} from './HistoryCard';

export interface ServiceHistoryProp {
  renderIcon?: () => React.ReactChild;
  renderHeaderText?: (serviceHistoryTotal: number) => React.ReactChild;
  addShadowToCard?: boolean;
  showAll?: boolean;
  hideMoreDetailArrow?: boolean;
  cardHeight?: number | string;
  contentHeight?: number | string;
  setSelectedServiceHistory?: (state: ElevatorMaintenanceHistoryView) => void;
  selectedServiceHistory?: ElevatorMaintenanceHistoryView;
  serviceHistories: Resource<ElevatorMaintenanceHistoryView>;
}

export const ServiceHistory = ({
  renderIcon,
  renderHeaderText,
  addShadowToCard,
  showAll,
  hideMoreDetailArrow,
  setSelectedServiceHistory,
  selectedServiceHistory,
  serviceHistories,
  cardHeight,
  contentHeight,
}: ServiceHistoryProp) => (
  <ScrollableCard
    renderIcon={renderIcon}
    addShadowToCard={addShadowToCard}
    cardHeight={cardHeight}
    contentHeight={contentHeight}
    showMoreBtn={!showAll && serviceHistories.total > 3}
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
    {serviceHistories.total ? (
      serviceHistories.data
        .slice(0, !showAll ? 3 : undefined)
        .map((history, index) => (
          <Box
            key={history.id}
            mb={1}
            sx={{cursor: hideMoreDetailArrow ? 'pointer' : 'default'}}
            onClick={() =>
              setSelectedServiceHistory
                ? setSelectedServiceHistory(history)
                : () => {}
            }
          >
            <HistoryCard
              key={history.id}
              serviceHistory={history}
              running={!!(index === 0)}
              hideMoreDetailArrow={hideMoreDetailArrow}
              active={
                selectedServiceHistory?.id === history.id && hideMoreDetailArrow
              }
            />
          </Box>
        ))
    ) : (
      <EmptyItem label="No service history for this elevator" />
    )}
  </ScrollableCard>
);
