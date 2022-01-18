import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {getDay} from 'utils/datetime';
import {ServiceOrderIcons} from 'components/ServiceOrderIcons';
import {ServiceOrderType, ServiceOrderView} from 'models/service-order';
import Chip from '@mui/material/Chip';
import useTheme from '@mui/material/styles/useTheme';
import Divider from '@mui/material/Divider';
import {ScrollableCard} from 'components/ScrollableCard';
import {ElevatorMaintenanceHistoryView} from 'models/elevator';
import {EmptyIllustration} from '../../../../components/EmptyIllustration';

// TODO: create sub components
interface Props {
  runningServiceOrders: ServiceOrderView[];
  selectedServiceHistory?: ElevatorMaintenanceHistoryView;
}

const Fields = ['Location', 'Units', 'Technician', 'Cost', 'Duration'];

export const MaintenanceHistoryDetail = ({
  runningServiceOrders,
  selectedServiceHistory,
}: Props) => {
  const theme = useTheme();
  const renderFieldValue = (field: string) => {
    switch (field) {
      case 'Location':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedServiceHistory?.elevator.address.fullName}
          </Typography>
        );
      case 'Units':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedServiceHistory?.elevator.model}
          </Typography>
        );
      case 'Technician':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedServiceHistory?.technician.userAccount.firstName}{' '}
            {selectedServiceHistory?.technician.userAccount.lastName}
          </Typography>
        );
      case 'Cost':
        return (
          <>
            <Typography variant="largeBtnText" mr={2}>
              {`${selectedServiceHistory?.fee.amount} ${selectedServiceHistory?.fee.currency}`}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{color: theme.palette.info.main}}
            >
              View Invoice
            </Typography>
          </>
        );
      case 'Duration':
        return (
          <Typography variant="largeBtnText" mr={2}>
            {selectedServiceHistory &&
            selectedServiceHistory.serviceOrder.serviceTime
              ? `${selectedServiceHistory.serviceOrder.serviceTime / 60}hrs`
              : null}
          </Typography>
        );
      default:
        return null;
    }
  };
  return (
    <ScrollableCard
      renderIcon={() => <MoreVertIcon />}
      addShadowToCard
      disableScroll
      renderHeaderText={() => (
        <Typography variant="h5">Maintenance Details</Typography>
      )}
    >
      {!selectedServiceHistory ? (
        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
          <EmptyIllustration label="Please select a maintenance to see details!" />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" mt={6} ml={2}>
            <Box display="flex">
              <Typography variant="h6" mr={2}>
                {getDay(selectedServiceHistory.createdAt, 'dd MMM YYY')}
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
                  {selectedServiceHistory.serviceOrder.status}
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
              sx={{
                background: theme.palette.inputBackground.main,
                mt: 2,
                pt: 3,
                pl: 2,
                height: '120px',
              }}
            >
              {selectedServiceHistory.description}
            </Typography>
          </Box>

          <Box width="30vw" ml={15}>
            {Fields.map((field) => (
              <Box display="flex">
                <Typography
                  variant="largeBtnText"
                  mr={1}
                  pr={10}
                  width="30%"
                  py={1}
                  color="textSecondary"
                >
                  {field}
                </Typography>
                <Box py={1} display={field === 'Cost' ? 'flex' : 'block'}>
                  {renderFieldValue(field)}
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap={3}
            sx={{
              width: '100%',
              overflowX: 'auto',
              mt: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
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
        </>
      )}
    </ScrollableCard>
  );
};
