import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {ServiceOrderType} from '../models/service-order';

interface Props {
  serviceOrderType: ServiceOrderType;
  style?: {[key: string]: string | number};
}
export const ServiceOrderIcons = ({serviceOrderType, style}: Props) => {
  switch (serviceOrderType) {
    case ServiceOrderType.REPAIR:
      return <SettingsOutlinedIcon sx={{color: '#ED6C02', ...style}} />;
    default:
      return null;
  }
};
