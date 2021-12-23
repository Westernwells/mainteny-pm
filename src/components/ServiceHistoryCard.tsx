import {Box} from '@mui/system';
import useTheme from '@mui/material/styles/useTheme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import {ServiceOrderIcons} from './ServiceOrderIcons';
import {ServiceOrderType} from '../models/service-order';

interface Props {
  createdAt?: string;
  serviceOrderType: ServiceOrderType;
  status: 'Completed' | 'Scheduled';
  description?: string;
}

const ServiceHistoryCard = ({
  createdAt,
  serviceOrderType,
  status,
  description,
}: Props) => {
  const theme = useTheme();
  const isCompleted = status === 'Completed';
  const Icon = isCompleted ? CheckCircleIcon : RadioButtonCheckedIcon;
  return (
    <Box display="flex">
      <Box>
        <Box
          sx={{
            borderLeft: '1px dashed #9E9E9E',
            height: 60,
            ml: '11px',
            zIndex: 1000,
          }}
        />
        <Icon
          sx={{
            mr: 1,
            color: isCompleted
              ? theme.palette.text.disabled
              : theme.palette.secondary.main,
          }}
        />
        <Box
          sx={{
            borderLeft: '1px dashed #9E9E9E',
            height: 100,
            ml: '11px',
          }}
        />
      </Box>
      <Box
        sx={{
          border: isCompleted
            ? null
            : `1px solid  ${theme.palette.secondary.main}`,
          boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.4)',

          background: '#F7F9FC',
          borderRadius: '4px',
          py: 2,
          px: 3,
          mb: 2,
          flexGrow: 1,
        }}
      >
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
        <Divider sx={{mt: 1}} />
        <Typography pb={1} pt={1}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ServiceHistoryCard;
