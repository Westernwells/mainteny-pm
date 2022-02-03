import {
  Elevator,
  ElevatorMaintenanceHistoryView as ServiceHistoryView,
} from 'models/elevator';
import {ServiceOrderStatus, ServiceOrderView} from 'models/service-order';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {useIssueHistory} from 'hooks/reactQuery/useIssueHistory';
import {createEmptyResource, makePage} from 'utils/paging-utils';
import {endOfMonth, endOfYear, startOfDay, startOfYear} from 'date-fns';
import {toRestDateTime} from 'utils/datetime';
import {useParams} from 'react-router-dom';
import {ReactComponent as Escalator} from 'assets/icons/Escalator.svg';
import {useServiceHistory} from 'hooks/reactQuery/useServiceHistory';
import {useServiceOrders} from 'hooks/reactQuery/useServiceOrder';
import {ElevatorAvailabilitySection} from '../ElevatorAvailabilitySection';
import {ElevatorBasicSection} from '../ElevatorBasicSection';
import {TechnicianSection} from '../TechnicianSection';
import {MaintainerView} from '../../../models/technician';
import {IssueHistoryPageCard} from '../IssueHistoryPageCard';
import {IssueHistoryCard} from '../IssueHistoryPageCard/IssueHistoryCard';
import {MaintenanceHistoryPageCard} from '../MaintenanceHistoryPageCard';
import {MaintenanceHistoryCard} from '../MaintenanceHistoryPageCard/MaintenanceHistoryCard';

const pageSize = 10;

interface Props {
  elevator?: Elevator;
  maintainers: MaintainerView[];
}

export const OverviewTab = ({elevator, maintainers}: Props) => {
  const {id: elevatorId} = useParams();
  const theme = useTheme();
  const {data: issueHistory = createEmptyResource<ServiceOrderView>(pageSize)} =
    useIssueHistory({
      elevatorIds: elevatorId,
      start: toRestDateTime(startOfYear(new Date())),
      end: toRestDateTime(endOfYear(new Date())),
      pageSize,
      pageIndex: 0,
      query: '',
      status: [],
    });

  const {
    data: serviceHistories = createEmptyResource<ServiceHistoryView>(pageSize),
  } = useServiceHistory(makePage(0, 10), elevatorId);

  const {
    data: runningServiceOrders = createEmptyResource<ServiceOrderView>(
      pageSize,
    ),
  } = useServiceOrders({
    elevatorIds: elevatorId,
    start: toRestDateTime(startOfDay(new Date())),
    end: toRestDateTime(endOfMonth(new Date())),
    pageSize: 2,
    pageIndex: 0,
    query: '',
  });
  return (
    <>
      <Grid container spacing={2} sx={{mt: '1em'}}>
        <Grid item xs={4}>
          <ElevatorBasicSection
            elevator={elevator}
            serviceOrder={runningServiceOrders.data[0]}
            rows={[
              {
                leftLabel: elevator?.model,
                leftValue: elevator?.address.fullName,
                leftIcon: <Escalator />,
                status: elevator?.status,
              },
              {
                leftLabel: 'Facility Manager',
                leftValue: elevator?.propertyOwner.name,
                leftIcon: (
                  <PersonOutlineOutlinedIcon
                    sx={{
                      width: '1.125rem',
                      color: theme.palette.text.primary,
                    }}
                  />
                ),
                rightLabel: 'Number',
                rightValue: elevator?.number,
                rightIcon: (
                  <PersonOutlineOutlinedIcon
                    sx={{
                      width: '1.125rem',
                      color: theme.palette.text.primary,
                    }}
                  />
                ),
              },
              {
                leftLabel: 'Capacity',
                leftValue: elevator?.capacity,
                leftIcon: (
                  <PersonOutlineOutlinedIcon
                    sx={{
                      width: '1.125rem',
                      color: theme.palette.text.primary,
                    }}
                  />
                ),
                rightLabel: 'Stops',
                rightValue: 10,
                rightIcon: (
                  <PersonOutlineOutlinedIcon
                    sx={{
                      width: '1.125rem',
                      color: theme.palette.text.primary,
                    }}
                  />
                ),
              },
            ]}
          />
        </Grid>
        <Grid item xs={3}>
          <TechnicianSection maintainers={maintainers} />
        </Grid>
        <Grid item xs={5}>
          <ElevatorAvailabilitySection />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{mt: '1em'}}>
        <Grid item xs={7}>
          <IssueHistoryPageCard>
            {issueHistory.data.map((item) => (
              <IssueHistoryCard
                history={item}
                bodyContainerStyle={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              />
            ))}
          </IssueHistoryPageCard>
        </Grid>

        <Grid item xs={5}>
          <MaintenanceHistoryPageCard>
            {runningServiceOrders.data.length &&
            runningServiceOrders.data[0].status !==
              ServiceOrderStatus.COMPLETED ? (
              <MaintenanceHistoryCard
                serviceOrder={runningServiceOrders.data[0]}
                description={runningServiceOrders.data[0].description}
                bodyContainerStyle={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              />
            ) : null}
            {serviceHistories.data.map((item) => (
              <MaintenanceHistoryCard
                serviceOrder={item.serviceOrder}
                description={item.description}
                bodyContainerStyle={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              />
            ))}
          </MaintenanceHistoryPageCard>
        </Grid>
      </Grid>
    </>
  );
};
