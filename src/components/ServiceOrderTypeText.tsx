import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import {ResponsiveStyleValue} from '@mui/system';
import {ServiceOrderStatus, ServiceOrderType} from '../models/service-order';

interface Props {
  serviceOrderType?: ServiceOrderType | null;
  style?: {[key: string]: string | number};
  variant?: any;
}
export const ServiceOrderTypeText = ({
  serviceOrderType,
  style,
  variant,
}: Props) => {
  const theme = useTheme();

  return (
    <Typography variant={variant || 'caption'} sx={{...style}}>
      {serviceOrderType === ServiceOrderType.REGULAR
        ? 'MAINTENANCE'
        : serviceOrderType}
    </Typography>
  );
};
