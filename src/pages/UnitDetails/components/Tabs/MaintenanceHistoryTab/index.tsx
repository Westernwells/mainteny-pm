import Box from '@mui/material/Box';
import {Elevator} from 'models/elevator';
import Typography from '@mui/material/Typography';
import {ServiceOrderView} from 'models/service-order';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ServiceHistorySection} from 'pages/UnitDetails/components/ServiceHistory';
import {MaintenanceHistoryDetail} from './MaintenanceHistoryDetail';

interface Props {
  elevator: Elevator;
  runningServiceOrders: ServiceOrderView[];
}

export const MaintenanceHistoryTab = ({
  elevator,
  runningServiceOrders,
}: Props) => (
  <Box mt={4} display="flex">
    <Box width="38%" mr={2}>
      <ServiceHistorySection
        hideMoreDetailArrow
        addShadowToCard
        showAll
        cardHeight={710}
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
    <Box flexGrow={1}>
      <MaintenanceHistoryDetail runningServiceOrders={runningServiceOrders} />
    </Box>
  </Box>
);
