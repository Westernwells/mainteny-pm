import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import GridOffIcon from '@mui/icons-material/GridOff';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import useTheme from '@mui/material/styles/useTheme';
import PendingIcon from '@mui/icons-material/Pending';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  ServiceOrderStatus,
  ServiceOrderType,
  ServiceOrderView,
} from 'models/service-order';
import {formatDate} from 'utils/datetime';
import {ServiceOrderIcons} from 'components/ServiceOrderIcons';
import {ElevatorMaintenanceHistoryView} from 'models/elevator';

interface Props {
  bodyContainerStyle?: {[key: string]: string | number};
  serviceOrder: ServiceOrderView;
  description?: string;
}

export const MaintenanceHistoryCard = ({
  bodyContainerStyle,
  serviceOrder,
  description,
}: Props) => {
  const theme = useTheme();
  const renderHeader = () => (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex">
        <Box mr="1em">
          <Typography variant="subtitle1" sx={{mr: '0.4em'}}>
            {serviceOrder.actualEndTime
              ? formatDate(serviceOrder.actualEndTime, 'dd MMM YYY')
              : formatDate(serviceOrder.schedules[0].startTime, 'dd MMM YYY')}
          </Typography>
        </Box>
        <Box display="flex">
          <Box>
            <ServiceOrderIcons
              serviceOrderType={serviceOrder.type}
              style={{
                width: '0.8em',
                height: '0.8em',
                marginRight: '0.3em',
                mt: '0.2em',
              }}
            />
          </Box>
          <Box>
            <Typography variant="caption">
              {serviceOrder.type === ServiceOrderType.REGULAR
                ? 'Maintenance'
                : serviceOrder.type}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box display="flex">
        <Box mr="0.4em">
          <Typography
            variant="chip"
            color={theme.palette.text.secondary}
            sx={{textTransform: 'capitalize'}}
          >
            {serviceOrder.status !== ServiceOrderStatus.COMPLETED
              ? 'Upcoming'
              : serviceOrder.status.toLowerCase()}
          </Typography>
        </Box>
        <Box>
          {serviceOrder.status !== ServiceOrderStatus.COMPLETED ? (
            <UpcomingIcon
              color="info"
              sx={{width: '0.947rem', height: '0.947rem', mt: '0.3em'}}
            />
          ) : (
            <CheckCircleIcon
              color="success"
              sx={{mt: '0.3em', height: '0.833rem', width: '0.833rem'}}
            />
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Card sx={{border: 'none', boxShadow: 'none'}}>
      <CardHeader sx={{pb: '0.4em'}} title={renderHeader()} />
      <CardContent sx={{py: 0, ...bodyContainerStyle}}>
        <Typography variant="caption">{description}</Typography>
      </CardContent>
    </Card>
  );
};
