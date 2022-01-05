import Box from '@mui/material/Box';
import {Elevator} from 'models/elevator';
import {ServiceOrderView} from 'models/service-order';
import {ElevatorAvailabilitySection} from '../../ElevatorAvailabilitySection';
import {ElevatorBasicSection} from '../../ElevatorBasicSection';
import {ElevatorBreakDownSection} from '../../ElevatorBreakDownSection';
import {ServiceHistorySection} from '../../ServiceHistorySection';
import {TechnicianSection} from '../../TechnicianSection';

interface Props {
  runningServiceOrders: ServiceOrderView[];
  elevator: Elevator;
}

export const OverviewTab = ({runningServiceOrders, elevator}: Props) => (
  <Box>
    <Box mt={3} display="flex">
      <Box mr={2} minWidth="32%">
        <ElevatorBasicSection
          elevator={elevator}
          serviceOrder={runningServiceOrders[0]}
        />
      </Box>
      <Box maxWidth="22%" mr={2}>
        {runningServiceOrders.length > 0 && (
          <TechnicianSection serviceOrder={runningServiceOrders[0]} />
        )}
      </Box>
      <Box flexGrow={1}>
        <ElevatorAvailabilitySection />
      </Box>
    </Box>
    <Box mt={4} display="flex" height="40%">
      <Box width="55%" mr={2}>
        <ServiceHistorySection elevator={elevator} />
      </Box>
      <Box sx={{}} flexGrow={1}>
        <ElevatorBreakDownSection />
      </Box>
    </Box>
  </Box>
);
