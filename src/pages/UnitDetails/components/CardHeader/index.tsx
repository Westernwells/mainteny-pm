import Box from '@mui/system/Box';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import {ServiceOrderIcons} from 'components/ServiceOrderIcons';
import {ServiceOrderType} from 'models/service-order';

interface HeaderProps {
  createdAt: string;
  serviceOrderType: ServiceOrderType;
  active?: boolean;
  running?: boolean;
  status: string;
}

const CardHeader = ({
  createdAt,
  serviceOrderType,
  active,
  status,
  running,
}: HeaderProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant={running ? 'h5' : 'h6'} mr={3}>
        {createdAt}
      </Typography>
      <Box flexGrow={1} display="flex" alignItems="center">
        <ServiceOrderIcons
          serviceOrderType={serviceOrderType}
          style={{width: '18px', height: '18px', marginRight: '4px'}}
        />
        <Typography variant="largeBtnText">{serviceOrderType}</Typography>
      </Box>
      <Chip
        sx={{
          py: 2,
          color: running
            ? theme.palette.secondary.main
            : theme.palette.text.secondary,
          background: `${
            running ? theme.palette.info.outlinedHoverBg : '#FAFAFA'
          }`,
          border: `1px solid  ${
            running
              ? theme.palette.secondary.main
              : theme.palette.text.secondary
          }`,
        }}
        label={
          <Typography
            variant="largeBtnText"
            sx={{textTransform: running ? 'uppercase' : 'capitalize'}}
          >
            {status.toLowerCase()}
          </Typography>
        }
        size="medium"
      />
    </Box>
  );
};

export {CardHeader};
