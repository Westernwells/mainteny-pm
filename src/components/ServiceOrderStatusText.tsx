import Typography from '@mui/material/Typography';
import {useServiceOrderStatusColor} from 'hooks/useServiceOrderStatusColor';
import {ServiceOrderStatus} from '../models/service-order';

interface Props {
  serviceOrderStatus?: ServiceOrderStatus;
  style?: {[key: string]: string | number};
}
export const ServiceOrderStatusText = ({serviceOrderStatus, style}: Props) => {
  const [serviceOrderStatusColor] = useServiceOrderStatusColor();
  const statusColor = serviceOrderStatus
    ? serviceOrderStatusColor[serviceOrderStatus]
    : serviceOrderStatusColor.SCHEDULED;
  const renderStatus = () => {
    switch (serviceOrderStatus) {
      case ServiceOrderStatus.COMPLETED:
        return 'Completed';
      case ServiceOrderStatus.SCHEDULED:
        return 'Pending';
      case ServiceOrderStatus.IN_PROGRESS:
        return 'In Progress';
      case ServiceOrderStatus.EXPIRED:
        return 'Expired';
      case ServiceOrderStatus.CANCELLED:
        return 'Cancelled';
      default:
        return null;
    }
  };

  return (
    <Typography
      variant="chip"
      color="white"
      bgcolor={statusColor}
      sx={{
        textTransform: 'capitalize',
        px: '0.625rem',
        py: '3px',
        borderRadius: '1rem',
        ...style,
      }}>
      {renderStatus()}
    </Typography>
  );
};
