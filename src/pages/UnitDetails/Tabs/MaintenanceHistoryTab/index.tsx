import Grid from '@mui/material/Grid';
import {ElevatorMaintenanceHistoryView} from 'models/elevator';
import Typography from '@mui/material/Typography';
import {ServiceOrderView} from 'models/service-order';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ServiceHistory} from 'pages/UnitDetails/ServiceHistory';
import {Resource} from 'models/misc';
import {MaintenanceHistoryDetail} from './MaintenanceHistoryDetail';

interface Props {
  runningServiceOrders: ServiceOrderView[];
  setSelectedServiceHistory: (state: ElevatorMaintenanceHistoryView) => void;
  selectedServiceHistory?: ElevatorMaintenanceHistoryView;
  serviceHistories: Resource<ElevatorMaintenanceHistoryView>;
}

export const MaintenanceHistoryTab = ({
  runningServiceOrders,
  setSelectedServiceHistory,
  selectedServiceHistory,
  serviceHistories,
}: Props) => (
  <Grid container spacing={2} sx={{mt: 2}}>
    <Grid item xs={5}>
      <ServiceHistory
        setSelectedServiceHistory={setSelectedServiceHistory}
        selectedServiceHistory={selectedServiceHistory}
        serviceHistories={serviceHistories}
        hideMoreDetailArrow
        addShadowToCard
        showAll
        cardHeight={700}
        contentHeight="67vh"
        renderIcon={() => <MoreVertIcon />}
        renderHeaderText={(historyTotal: number) => (
          <Typography variant="largeBtnText" color="textSecondary">
            {' '}
            Maintenance History ({historyTotal})
          </Typography>
        )}
      />
    </Grid>
    <Grid item xs={7}>
      <MaintenanceHistoryDetail
        runningServiceOrders={runningServiceOrders}
        selectedServiceHistory={selectedServiceHistory}
      />
    </Grid>
  </Grid>
);
