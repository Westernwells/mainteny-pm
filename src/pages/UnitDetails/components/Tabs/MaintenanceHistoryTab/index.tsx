import Box from '@mui/material/Box';
import {Elevator} from 'models/elevator';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ServiceHistorySection} from 'pages/UnitDetails/components/ServiceHistory';
import {MaintenanceHistoryDetail} from './MaintenanceHistoryDetail';

interface Props {
  elevator: Elevator;
}

export const MaintenanceHistoryTab = ({elevator}: Props) => (
  <Box mt={4} display="flex">
    <Box width="38%" mr={2}>
      <ServiceHistorySection
        hideMoreDetailArrow
        showAll
        renderIcon={() => <MoreVertIcon />}
        renderHeaderText={(historyTotal: number) => (
          <Typography variant="largeBtnText" color="textSecondary">
            {' '}
            Maintenance History ({historyTotal})
          </Typography>
        )}
        elevator={elevator}
      />
    </Box>
    <Box sx={{}} flexGrow={1}>
      <MaintenanceHistoryDetail />
    </Box>
  </Box>
);
