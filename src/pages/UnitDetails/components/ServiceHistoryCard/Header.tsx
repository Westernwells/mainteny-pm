import {Box} from '@mui/system';
import useTheme from '@mui/material/styles/useTheme';
import {Chip, Typography} from '@mui/material';
import {ServiceOrderIcons} from '../../../../components/ServiceOrderIcons';
import {ServiceOrderType} from '../../../../models/service-order';

interface HeaderProps {
  createdAt?: string;
  serviceOrderType: ServiceOrderType;
  status: 'Completed' | 'Scheduled';
}

const Header = ({createdAt, serviceOrderType, status}: HeaderProps) => {
  const isCompleted = status === 'Completed';
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
          color: isCompleted
            ? theme.palette.text.secondary
            : theme.palette.secondary.main,
          background: `${
            isCompleted ? '#FAFAFA' : theme.palette.info.outlinedHoverBg
          }`,
          border: `1px solid  ${
            isCompleted
              ? theme.palette.text.secondary
              : theme.palette.secondary.main
          }`,
        }}
        label={
          <Typography
            variant="largeBtnText"
            sx={{textTransform: isCompleted ? null : 'uppercase'}}
          >
            {status}
          </Typography>
        }
        size="medium"
      />
    </Box>
  );
};

export {Header};
