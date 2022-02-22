import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import {
  ServiceOrderStatus,
  ServiceOrderType,
  ServiceOrderTypeValue,
  ServiceOrderView,
} from 'models/service-order';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {SplitButton} from 'components/SplitButton';
import Box from '@mui/material/Box';
import {PageCard} from 'components/PageCard';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {
  useServiceOrderReport,
  useServiceOrders,
} from 'hooks/reactQuery/useServiceOrder';
import {formatDate, getDateObject, toRestDateTime} from 'utils/datetime';
import {useDownloadUrl} from 'hooks/reactQuery/useDownloadUrl';
import {
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfYear,
  subDays,
} from 'date-fns';
import {useParams} from 'react-router-dom';
import {HistoryCard} from './HistoryCard';
import {HistoryReport} from './HistoryReport';
import {HistoryBasicDetails} from './HistoryBasicDetails';
import {HistoryAttachments} from './HistoryAttachments';

const pageSize = 10;

export const ServiceHistoryTab = () => {
  const {id: elevatorId} = useParams();
  const [year, setYear] = useState('2022');
  const [status, setStatus] = useState('ALL');
  const [expanded, setExpanded] = useState<boolean>();
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrderView>();
  const [currentReportDate, setCurrentReportDate] = useState<string>();
  const [currentScheduleDate, setCurrentScheduleDate] = useState<string | null>(
    null,
  );
  const [currentScheduleTime, setCurrentScheduleTime] = useState<string | null>(
    null,
  );
  const {
    data: serviceOrders = createEmptyResource<ServiceOrderView>(pageSize),
  } = useServiceOrders({
    elevatorIds: elevatorId,
    start: toRestDateTime(subDays(startOfDay(new Date()), 90)),
    end: toRestDateTime(endOfMonth(new Date())),
    pageSize: 50,
    pageIndex: 0,
    query: '',
  }); // TODO: Use Infinite scroll
  const {data: serviceOrderReport = [], isLoading: serviceOrderReportLoading} =
    useServiceOrderReport({
      serviceOrderId: selectedOrder?.id || '',
    });

  const {data: downloadUrl} = useDownloadUrl(
    serviceOrderReport.length
      ? serviceOrderReport[0].attachments.map((item) => item.fileResource.uri)
      : [],
    {cacheTime: 5000, refetchOnWindowFocus: true},
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const resolveScheduledDate = () =>
    formatDate(selectedOrder?.schedules[0].startTime, 'dd MMM YYY') || null;

  const resolveScheduledTime = () => {
    const startTime = formatDate(selectedOrder?.schedules[0].startTime, 'ha');
    const endTime = formatDate(selectedOrder?.schedules[0].endTime, 'ha');

    return startTime && endTime ? `${startTime} - ${endTime}` : null;
  };

  useEffect(() => {
    const date = formatDate(
      getDateObject(selectedOrder?.actualEndTime),
      'dd MMM YYY',
    );
    const result = date && `Resolved on ${date}`;
    setCurrentReportDate(result);
    setCurrentScheduleDate(resolveScheduledDate());
    setCurrentScheduleTime(resolveScheduledTime());
  }, [selectedOrder]);

  useEffect(() => {
    if (serviceOrders) {
      setSelectedOrder(serviceOrders.data[0]);
    }
  }, [serviceOrders]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <HistoryBasicDetails>
          <HistoryCard
            showTimeCategory
            // noContent={!selectedOrder}
            serviceOrder={selectedOrder}
            headerTitle={currentScheduleDate || null}
            description={selectedOrder?.description}
            scheduledTime={
              currentScheduleDate && currentScheduleTime
                ? `${currentScheduleDate}, ${currentScheduleTime}`
                : ''
            }
            minHeight="30vh"
            isDetailCard
            removeBottomLeftRadius
            removeBottomRightRadius
            showAlert
            headerActionIcon={<MoreVertIcon />}
            subtitle={currentScheduleTime || null}
            containerStyles={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              pt: '0.5em',
            }}
          />
        </HistoryBasicDetails>
        <HistoryReport>
          <HistoryCard
            serviceOrder={selectedOrder}
            noContent={!serviceOrderReport.length}
            serviceOrderReport={serviceOrderReport[0]}
            reportIsLoading={serviceOrderReportLoading}
            minHeight="30vh"
            isDetailCard
            removeTopLeftRadius
            removeTopRightRadius
            removeServiceOrderType
            removeServiceOrderStatus
            showMoreReportDetails
            showMoreSection
            containerStyles={{
              pt: '0.5em',
            }}
            handleExpandClick={handleExpandClick}
            expanded={expanded}
            collapsedChildren={<HistoryAttachments downloadUrl={downloadUrl} />}
            headerTitle="Work Report"
            subtitle={currentReportDate || 'Awaiting completion of visit'}
          />
        </HistoryReport>
      </Grid>
      <Grid item xs={4}>
        <PageCard
          headerLabel="All Services"
          contentPadding="0rem"
          headerContainerOverrideStyles={{
            background: 'none',
            mt: 'default',
            mx: 'default',
            height: 'default',
          }}
          headerActionIcon={<MoreVertIcon />}
        >
          <Box display="flex" mb="0.8em" px="1rem">
            <Box mr="1em">
              <SplitButton
                variant="outlined"
                size="small"
                disableRipple
                selectionStyle={{background: '#fff', cursor: 'default'}}
                selectedOption={`Year: ${year}`}
                options={['2020', '2021', '2022']} // TODO: Dynamically generate this
                onSelectedOptionChanged={(value) => setYear(value)}
              />
            </Box>
            <SplitButton
              variant="outlined"
              size="small"
              disableRipple
              selectionStyle={{background: '#fff', cursor: 'default'}}
              selectedOption={`Status: ${status.toLowerCase()}`}
              options={Object.keys(ServiceOrderStatus).map((item) =>
                item.split('_').join(' ').toLowerCase(),
              )}
              onSelectedOptionChanged={(value) => setStatus(value)}
            />
          </Box>
          <Box sx={{height: '55vh', overflowY: 'scroll'}}>
            {serviceOrders.data.map((serviceOrder: ServiceOrderView) => (
              <HistoryCard
                serviceOrder={serviceOrder}
                headerTitle={formatDate(
                  serviceOrder.schedules[0].startTime,
                  'dd MMM YYY',
                )}
                subtitle={`${formatDate(
                  serviceOrder?.schedules[0].startTime,
                  'ha',
                )} - ${formatDate(serviceOrder?.schedules[0].endTime, 'ha')}`}
                description={serviceOrder.description}
                key={serviceOrder.id}
                selected={serviceOrder.id === selectedOrder?.id}
                onCardSelect={() => setSelectedOrder(serviceOrder)}
                containerStyles={{borderRadius: 0}}
                showPointer
                removeShadows
                bodyContainerStyle={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              />
            ))}
          </Box>
        </PageCard>
      </Grid>
    </Grid>
  );
};
