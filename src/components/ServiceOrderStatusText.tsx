import Typography from '@mui/material/Typography';
import {useTranslation} from 'react-i18next';
import {useServiceOrderStatusColor} from 'hooks/useServiceOrderStatusColor';
import {ServiceOrderStatus} from '../models/service-order';

interface Props {
  serviceOrderStatus?: ServiceOrderStatus;
  style?: {[key: string]: string | number};
}
export const ServiceOrderStatusText = ({serviceOrderStatus, style}: Props) => {
  const {t} = useTranslation();
  const [serviceOrderStatusColor] = useServiceOrderStatusColor();
  const statusColor = serviceOrderStatus
    ? serviceOrderStatusColor[serviceOrderStatus]
    : serviceOrderStatusColor.SCHEDULED;
  const renderStatus = () => {
    switch (serviceOrderStatus) {
      case ServiceOrderStatus.COMPLETED:
        return t('Completed');
      case ServiceOrderStatus.SCHEDULED:
        return t('Pending');
      case ServiceOrderStatus.IN_PROGRESS:
        return t('In Progress');
      case ServiceOrderStatus.EXPIRED:
        return t('Expired');
      case ServiceOrderStatus.CANCELLED:
        return t('Cancelled');
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
