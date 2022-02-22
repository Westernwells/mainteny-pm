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
  const [selectedType, setSelectedType] = useState<ServiceOrderType>();
  const [resolvedDate, setResolvedDate] = useState<string>();
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
  const {data: serviceOrderReport = []} = useServiceOrderReport({
    serviceOrderId: selectedOrder?.id || '',
  });

  const {data: downloadUrl} = useDownloadUrl(
    serviceOrderReport.length
      ? serviceOrderReport[0].attachments.map((item) => item.fileResource.uri)
      : [],
  );

  // const {
  //   data: serviceHistories = createEmptyResource<ElevatorMaintenanceHistoryView>(
  //     pageSize,
  //   ),
  // } = useServiceHistory(makePage(0, 500), elevatorId);
  // const {data: issueHistories = createEmptyResource<ServiceOrderView>(pageSize)} =
  // useIssueHistory(makePage(0, 500), elevatorId);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const date = formatDate(
      getDateObject(selectedOrder?.actualEndTime),
      'dd MMM YYY',
    );
    const result = date && `Resolved on ${date}`;
    setResolvedDate(result);
  }, [selectedOrder]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <HistoryBasicDetails>
          <HistoryCard
            showTimeCategory
            noContent={!selectedOrder}
            serviceOrder={selectedOrder}
            headerTitle={formatDate(
              selectedOrder?.schedules[0].startTime,
              'dd MMM YYY',
            )}
            description={selectedOrder?.description}
            minHeight="30vh"
            isDetailCard
            removeBottomLeftRadius
            removeBottomRightRadius
            showAlert
            headerActionIcon={<MoreVertIcon />}
            subtitle={`${formatDate(
              selectedOrder?.schedules[0].startTime,
              'ha',
            )} - ${formatDate(selectedOrder?.schedules[0].endTime, 'ha')}`}
            containerStyles={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              pt: '0.5em',
            }}
          />
        </HistoryBasicDetails>
        <HistoryReport>
          <HistoryCard
            serviceOrder={selectedOrder}
            noContent={!selectedOrder}
            serviceOrderReport={serviceOrderReport[0]}
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
            subtitle={resolvedDate}
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
