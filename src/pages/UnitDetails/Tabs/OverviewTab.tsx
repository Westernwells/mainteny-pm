import {Elevator, ElevatorMaintenanceHistoryView} from 'models/elevator';
import {ServiceOrderStatus, ServiceOrderView} from 'models/service-order';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import {Resource} from 'models/misc';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {useIssueHistory} from 'hooks/reactQuery/useIssueHistory';
import {createEmptyResource} from 'utils/paging-utils';
import {endOfYear, getYear, startOfYear} from 'date-fns';
import {toRestDateTime} from 'utils/datetime';
import {useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ReactComponent as Escalator} from 'assets/icons/Escalator.svg';
import {ReactComponent as Elevation} from 'assets/icons/Elevation.svg';
import {ElevatorAvailabilitySection} from '../ElevatorAvailabilitySection';
import {ElevatorBasicSection} from '../ElevatorBasicSection';
import {ElevatorBreakDownSection} from '../ElevatorBreakDownSection';
import {ServiceHistory} from '../ServiceHistory';
import {TechnicianSection} from '../TechnicianSection';
import {MaintainerView} from '../../../models/technician';
import {IssueHistoryPageCard} from '../IssueHistoryPageCard';
import {IssueHistoryCard} from '../IssueHistoryPageCard/IssueHistoryCard';

const pageSize = 10;

interface Props {
  serviceHistories: Resource<ElevatorMaintenanceHistoryView>;
  elevator?: Elevator;
  runningServiceOrders: ServiceOrderView[];
  maintainers: MaintainerView[];
}

export const OverviewTab = ({
  serviceHistories,
  elevator,
  runningServiceOrders,
  maintainers,
}: Props) => {
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
  return (
    <>
      <Grid container spacing={2} sx={{mt: '1em'}}>
        <Grid item xs={4}>
          <ElevatorBasicSection
            elevator={elevator}
            serviceOrder={runningServiceOrders[0]}
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
          <ElevatorBreakDownSection />
        </Grid>
      </Grid>
    </>
  );
};
