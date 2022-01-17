import {Elevator, ElevatorMaintenanceHistoryView} from 'models/elevator';
import {ServiceOrderView} from 'models/service-order';
import Grid from '@mui/material/Grid';
import {Resource} from 'models/misc';
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
    <Grid container spacing={2} sx={{mt: 2}}>
      <Grid item xs={4}>
        <ElevatorBasicSection
          elevator={elevator}
          serviceOrder={runningServiceOrders[0]}
        />
      </Grid>
      <Grid item xs={3}>
        <TechnicianSection maintainers={maintainers} />
      </Grid>
      <Grid item xs={5}>
        <ElevatorAvailabilitySection />
      </Grid>
    </Grid>

    <Grid container spacing={2} sx={{mt: 2}}>
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
