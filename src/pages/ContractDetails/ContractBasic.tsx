import Box from '@mui/material/Box';
import {formatDate, toDate} from 'utils/datetime';
import useTheme from '@mui/material/styles/useTheme';
import {CardProps} from 'components/CardProps';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import TodayIcon from '@mui/icons-material/Today';
import DangerousIcon from '@mui/icons-material/Dangerous';
import TimerIcon from '@mui/icons-material/Timer';
import BusinessIcon from '@mui/icons-material/Business';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import {Contract} from '../../models/contract';

interface Props {
  contract: Contract;
}

export const ContractBasic = ({contract}: Props) => {
  const theme = useTheme();
  const {price, startTime, endTime, type, visitsNumber, elevators} = contract;
  const information = [
    {
      label: 'Cost Per Year',
      Icon: MonetizationOnOutlinedIcon,
      value: `${price.toLocaleString()} EUR`,
    },
    {
      label: 'Start Date',
      Icon: TodayIcon,
      value: formatDate(toDate(startTime)),
    },
    {
      label: 'End Date',
      Icon: DangerousIcon,
      value: formatDate(toDate(endTime)),
    },
    {
      label: 'Visits Per Year',
      Icon: TimerIcon,
      value: `${visitsNumber}`,
    },
    {
      label: 'Contract Type',
      Icon: BusinessIcon,
      value: type,
    },
    {
      label: 'Number of Units',
      Icon: WorkspacesIcon,
      value: `${elevators.length}`,
    },
  ];
  return (
    <Box
      display="grid"
      sx={{
        gridTemplateColumns: 'repeat(3, 1fr)',
        justifyItems: 'start',
        rowGap: 1,
      }}>
      {information.map(({label, Icon, value}) => (
        <CardProps
          label={label.toUpperCase()}
          bodyTextVariant="subtitle1"
          icon={<Icon color="info" />}
          iconBackground={theme.palette.info.outlinedHoverBg}
          iconMaxHeight="3rem"
          bodyText={value}
        />
      ))}
    </Box>
  );
};
