import Box from '@mui/material/Box';
import {Elevator} from 'models/elevator';
import {ServiceHistorySection} from 'pages/UnitDetails/ServiceHistorySection';
import {MaintenanceHistoryDetail} from './MaintenanceHistoryDetail';

interface Props {
  elevator: Elevator;
}

export const MaintenanceHistoryTab = ({elevator}: Props) => (
  <Box mt={4} display="flex">
    <Box width="38%" mr={2}>
      <ServiceHistorySection elevator={elevator} />
    </Box>
    <Box sx={{}} flexGrow={1}>
      <MaintenanceHistoryDetail />
    </Box>
  </Box>
);
