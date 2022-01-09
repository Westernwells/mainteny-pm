import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useParams} from 'react-router-dom';

import * as _ from 'lodash';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {Resource} from 'models/misc';
import {useServiceHistory} from 'hooks/reactQuery/useServiceHistory';

import {Elevator, ElevatorMaintenanceHistoryView} from 'models/elevator';
import {ScrollableCard} from 'components/ScrollableCard';
import {HistoryCard} from './HistoryCard';

export interface ServiceHistoryProp {
  renderIcon?: () => React.ReactChild;
  renderHeaderText?: (serviceHistoryTotal: number) => React.ReactChild;
  addShadowToCard?: boolean;
  showAll?: boolean;
  hideMoreDetailArrow?: boolean;
  cardHeight?: number | string;
  setSelectedServiceHistory: (state: ElevatorMaintenanceHistoryView) => void;
  selectedServiceHistory?: ElevatorMaintenanceHistoryView;
  serviceHistories: Resource<ElevatorMaintenanceHistoryView>;
}

const pageSize = 50;
export const ServiceHistory = ({
  renderIcon,
  renderHeaderText,
  addShadowToCard,
  showAll,
  hideMoreDetailArrow,
  cardHeight = '100%',
  setSelectedServiceHistory,
  selectedServiceHistory,
  serviceHistories,
}: ServiceHistoryProp) => (
  <ScrollableCard
    renderIcon={renderIcon}
    addShadowToCard={addShadowToCard}
    cardHeight={cardHeight}
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
    {serviceHistories.data
      .slice(0, !showAll ? 3 : undefined)
      .map((history, index) => (
        <Box
          key={history.id}
          mb={1}
          sx={{cursor: hideMoreDetailArrow ? 'pointer' : 'default'}}
          onClick={() => setSelectedServiceHistory(history)}
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
      ))}
  </ScrollableCard>
);
