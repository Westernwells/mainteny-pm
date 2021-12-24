import Box from '@mui/system/Box';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import {ServiceOrderIcons} from '../../../../components/ServiceOrderIcons';
import {ServiceOrderType} from '../../../../models/service-order';

interface HeaderProps {
  createdAt: string;
  serviceOrderType: ServiceOrderType;
  active?: boolean;
  status: string;
}

const CardHeader = ({
  createdAt,
  serviceOrderType,
  active,
  status,
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
      <Typography variant="h6" mr={3}>
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
          color: active
            ? theme.palette.secondary.main
            : theme.palette.text.secondary,
          background: `${
            active ? theme.palette.info.outlinedHoverBg : '#FAFAFA'
          }`,
          border: `1px solid  ${
            active ? theme.palette.secondary.main : theme.palette.text.secondary
          }`,
        }}
        label={
          <Typography
            variant="largeBtnText"
            sx={{textTransform: active ? 'uppercase' : 'capitalize'}}
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
