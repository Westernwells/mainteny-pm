import {Elevator, ElevatorMaintenanceHistoryView} from 'models/elevator';
import {ServiceOrderView} from 'models/service-order';
import Grid from '@mui/material/Grid';
import {Resource} from 'models/misc';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {ReactComponent as Escalator} from 'assets/icons/Escalator.svg';
import {ReactComponent as Elevation} from 'assets/icons/Elevation.svg';
import {ElevatorAvailabilitySection} from '../ElevatorAvailabilitySection';
import {ElevatorBasicSection} from '../ElevatorBasicSection';
import {ElevatorBreakDownSection} from '../ElevatorBreakDownSection';
import {ServiceHistory} from '../ServiceHistory';
import {TechnicianSection} from '../TechnicianSection';
import {MaintainerView} from '../../../models/technician';

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
}: Props) => (
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
                    color: (theme) => theme.palette.text.primary,
                  }}
                />
              ),
              rightLabel: 'Number',
              rightValue: elevator?.number,
              rightIcon: (
                <PersonOutlineOutlinedIcon
                  sx={{
                    width: '1.125rem',
                    color: (theme) => theme.palette.text.primary,
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
                    color: (theme) => theme.palette.text.primary,
                  }}
                />
              ),
              rightLabel: 'Stops',
              rightValue: 10,
              rightIcon: (
                <PersonOutlineOutlinedIcon
                  sx={{
                    width: '1.125rem',
                    color: (theme) => theme.palette.text.primary,
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
      <Grid item xs={6}>
        <ServiceHistory
          serviceHistories={serviceHistories}
          renderIcon={() => <Elevation />}
        />
      </Grid>
      <Grid item xs={6}>
        <ElevatorBreakDownSection />
      </Grid>
    </Grid>
  </>
);
