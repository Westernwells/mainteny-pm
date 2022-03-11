import {Elevator} from 'models/elevator';
import {ServiceOrderView} from 'models/service-order';
import useTheme from '@mui/material/styles/useTheme';

import Grid from '@mui/material/Grid';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import {createEmptyResource} from 'utils/paging-utils';
import {endOfMonth, startOfDay} from 'date-fns';
import {toRestDateTime} from 'utils/datetime';
import {useParams} from 'react-router-dom';
import {ReactComponent as Escalator} from 'assets/icons/Escalator.svg';
import {PageCard} from 'components/PageCard';
import {useServiceOrders} from 'hooks/reactQuery/useServiceOrder';

import {ElevatorAvailabilitySection} from '../ElevatorAvailabilitySection';
import {ElevatorBasicSection} from '../ElevatorBasicSection';
import {TechnicianSection} from '../TechnicianSection';
import {MaintainerView} from '../../../models/technician';
import {ServiceHistory} from '../ServiceHistory';

const pageSize = 10;

interface Props {
  elevator?: Elevator;
  maintainers: MaintainerView[];
}

export const OverviewTab = ({elevator, maintainers}: Props) => {
  const {id: elevatorId} = useParams();
  const theme = useTheme();
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
        <Grid item xs={3} zeroMinWidth>
          <TechnicianSection maintainers={maintainers} />
        </Grid>
        <Grid item xs={5}>
          <ElevatorAvailabilitySection />
        </Grid>
      </Grid>

      <Grid container sx={{mt: '1em'}}>
        <Grid item xs={12}>
          <PageCard contentPadding="1.5em" headerLabel="Service History">
            <ServiceHistory />
            {[1, 2, 3, 4, 5, 6, 7].map(() => (
              <ServiceHistory />
            ))}
          </PageCard>
        </Grid>
      </Grid>
    </>
  );
};
