import {LocalShipping, Report} from '@mui/icons-material';
import {MessageType} from 'models/notification';
import useTheme from '@mui/material/styles/useTheme';

interface Props {
  messageType?: MessageType;
  style?: {[key: string]: string | number};
  size?: 'inherit' | 'large' | 'medium' | 'small';
}

export const NotificationIcon = ({messageType, style, size}: Props) => {
  const theme = useTheme();
  switch (messageType) {
    case MessageType.SERVICE_ORDER_SCHEDULE_ALERT:
      return (
        <LocalShipping
          fontSize={size}
          sx={{color: theme.palette.primary.light, ...style}}
        />
      );
    case MessageType.CONTRACT_EXPIRY_ALERT:
      return (
        <Report
          fontSize={size}
          sx={{color: theme.palette.error.light, ...style}}
        />
      );
    default:
      return null;
  }
};
