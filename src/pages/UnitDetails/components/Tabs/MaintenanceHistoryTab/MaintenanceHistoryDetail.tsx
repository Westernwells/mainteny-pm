import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ServiceOrderIcons} from 'components/ServiceOrderIcons';
import {ServiceOrderType, ServiceOrderView} from 'models/service-order';
import Chip from '@mui/material/Chip';
import useTheme from '@mui/material/styles/useTheme';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

interface Props {
  cardHeight?: number;
  runningServiceOrders: ServiceOrderView[];
}

const basicDetail = [
  {
    key: 'Location',
    value: 'Prankstrabe 32, 13357 Berlin, Germany',
  },
  {
    key: 'Units',
    value: 'KONE TravelMaster 110',
  },
  {
    key: 'Technician',
    value: 'PChris Anderson',
  },
  {
    key: 'Cost',
    value: '400 €',
  },
  {
    key: 'Duration',
    value: '45 min',
  },
];

export const MaintenanceHistoryDetail = ({
  cardHeight = 650,
  runningServiceOrders,
}: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: '8px',
        height: cardHeight,
        boxShadow:
          '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
        pt: 2,
        px: '25px',
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Maintenance Details</Typography>
        <Box>
          <MoreVertIcon />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={6} ml={2}>
        <Box display="flex">
          <Typography variant="h6" mr={2}>
            02 Oct 2021
          </Typography>

          <Box>
            <ServiceOrderIcons
              serviceOrderType={ServiceOrderType.REGULAR}
              style={{width: '18px', mt: '5px', marginRight: '4px'}}
            />
          </Box>
          <Typography variant="largeBtnText" sx={{mt: '4px'}}>
            MAINTENANCE
          </Typography>
        </Box>

        <Chip
          sx={{
            py: 2,
            color: theme.palette.text.secondary,
            background: '#FAFAFA',
            border: `1px solid  ${theme.palette.text.secondary}`,
          }}
          label={
            <Typography
              variant="largeBtnText"
              sx={{textTransform: 'capitalize'}}
            >
              Completed
            </Typography>
          }
          size="medium"
        />
      </Box>

      <Divider sx={{mt: 2}} />

      <Typography variant="subtitle2" color="textSecondary" mt={2}>
        What was done
      </Typography>

      <Box>
        <Typography
          variant="body1"
          color="primary"
          sx={{background: '#F7F9FC', mt: 2, pt: 3, pl: 2, height: '120px'}}
        >
          Clean, lubricate, and adjust all the elevator components
        </Typography>
      </Box>

      <Box width="30vw" ml={15}>
        {basicDetail.map((item) => (
          <Box display="flex">
            <Typography
              variant="largeBtnText"
              mr={1}
              pr={10}
              width="30%"
              py={1}
              color="textSecondary"
            >
              {item.key}
            </Typography>
            <Box py={1} display={item.key === 'Cost' ? 'flex' : 'block'}>
              <Typography variant="largeBtnText" mr={2}>
                {item.value}
              </Typography>
              {item.key === 'Cost' ? (
                <Typography
                  variant="subtitle1"
                  sx={{color: theme.palette.info.main}}
                >
                  View Invoice
                </Typography>
              ) : null}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        gap={3}
        sx={{width: '100%', overflowX: 'auto', mt: 2}}
      >
        <Box
          sx={{
            width: '161px',
            height: '120px',
            overflow: 'hidden',
            borderRadius: 1,
          }}
        >
          <img
            src={`${process.env.REACT_APP_BASE_URL}/images/1.png`}
            alt=""
            style={{objectFit: 'cover', height: '100%', width: '100%'}}
          />
        </Box>

        <Box
          sx={{
            width: '161px',
            height: '120px',
            overflow: 'hidden',
            borderRadius: 1,
          }}
        >
          <img
            src={`${process.env.REACT_APP_BASE_URL}/images/3.png`}
            alt=""
            style={{objectFit: 'cover', height: '100%', width: '100%'}}
          />
        </Box>
      </Box>
    </Box>
  );
};
