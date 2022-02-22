import {endOfMonth, startOfDay, subDays} from 'date-fns';
import Grid from '@mui/material/Grid';
import {useDownloadUrl} from 'hooks/reactQuery/useDownloadUrl';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  useElevatorById,
  useElevatorMaintainers,
} from 'hooks/reactQuery/useElevator';
import {
  useServiceOrderReport,
  useServiceOrders,
} from 'hooks/reactQuery/useServiceOrder';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {formatDate, getDateObject, toRestDateTime} from 'utils/datetime';
import {createEmptyResource} from 'utils/paging-utils';
import Box from '@mui/material/Box';
import {PageCard} from 'components/PageCard';
import {SplitButton} from 'components/SplitButton';
import {ServiceOrderStatus, ServiceOrderView} from 'models/service-order';
import {OverviewTab} from './OverviewTab';
import {ServiceHistoryTab} from './ServiceHistoryTab';
import {HistoryBasicDetails} from './ServiceHistoryTab/HistoryBasicDetails';
import {HistoryCard} from './ServiceHistoryTab/HistoryCard';
import {HistoryReport} from './ServiceHistoryTab/HistoryReport';
import {HistoryAttachments} from './ServiceHistoryTab/HistoryAttachments';

const pageSize = 10;

interface Props {
  value: number;
  index: number;
  children: React.ReactNode | null;
}

export const TabsBody = ({value, index, children}: Props) => (
  <Box>{value === index ? children : null}</Box>
);
