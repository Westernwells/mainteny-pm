import useTheme from '@mui/material/styles/useTheme';
import {Box} from '@mui/system';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material';
import {Engineering, Grid3x3, Home, Timelapse} from '@mui/icons-material';
import {InfoCard} from 'components/InfoCard';
import {ServiceOrderIcons} from 'components/ServiceOrderIcons';
import {ServiceOrderTypeText} from 'components/ServiceOrderTypeText';
import {StatusChip} from 'components/StatusChip';
import {CardProps} from 'components/CardProps';
import {
  getServiceOrderStatusColor,
  serviceOrderStatusToString,
} from 'utils/service-order-utils';
import {toDate} from 'utils/datetime';
import {ServiceOrderView} from 'models/service-order';
import {useFormatDate} from 'hooks/useFormatDate';
import {olStyles} from 'styles';

interface Props {
  serviceOrder: ServiceOrderView;
}

export const Details = ({serviceOrder}: Props) => {
  const formatDate = useFormatDate();
  const theme = useTheme();

  const renderSection = (label: string) => {
    switch (label) {
      case 'unitNumber':
        return (
          <CardProps
            icon={<Grid3x3 sx={{color: theme.palette.info.dark}} />}
            label="UNIT NUMBER"
            bodyText={serviceOrder.elevator.externalId || '-'}
            bodyStyle={{color: theme.palette.info.dark}}
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      case 'unitAddress':
        return (
          <CardProps
            icon={<Home sx={{color: theme.palette.info.dark}} />}
            label="UNIT ADDRESS"
            bodyText={serviceOrder.elevator.address.fullName || '-'}
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      case 'schedule':
        return (
          <CardProps
            icon={<Timelapse sx={{color: theme.palette.info.dark}} />}
            label="SCHEDULE"
            bodyText={
              serviceOrder.schedules && serviceOrder.schedules.length
                ? `${formatDate(
                    toDate(serviceOrder.schedules[0].startTime),
                  )},${formatDate(
                    toDate(serviceOrder.schedules[0].startTime),
                    'HH:mm',
                  )}`
                : '-'
            }
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      case 'technicians':
        return (
          <CardProps
            icon={<Engineering sx={{color: theme.palette.info.dark}} />}
            label="TECHNICIANS"
            bodyText={
              serviceOrder.schedules && serviceOrder.schedules.length
                ? serviceOrder.schedules
                    .map(
                      (item: any) =>
                        `${item.technician.userAccount.firstName} ${item.technician.userAccount.lastName}`,
                    )
                    .join(', ')
                : '-'
            }
            bodyStyle={{color: theme.palette.info.main}}
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      default:
        return null;
    }
  };

  return (
    <InfoCard
      header={
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <ServiceOrderIcons
            serviceOrderType={serviceOrder.type}
            size="medium"
          />
          <ServiceOrderTypeText
            variant="subtitle1"
            style={{pl: '0.625em'}}
            capitalizeText
            serviceOrderType={serviceOrder.type}
          />
          <Typography variant="caption" pl="0.4em">
            #{serviceOrder.number}
          </Typography>
          <StatusChip
            color={getServiceOrderStatusColor(serviceOrder.status)}
            label={serviceOrderStatusToString(serviceOrder.status)}
            style={{
              ...olStyles.orderStatus,
              letterSpacing: 'normal',
              marginLeft: 'auto',
            }}
          />
        </Box>
      }
      showHeaderBackground
      headerStyles={{
        py: '0.25rem',
        px: '0.5rem',
      }}>
      <Grid container rowSpacing={1.5}>
        {['unitNumber', 'unitAddress', 'schedule', 'technicians'].map(
          (label, index) => (
            <Grid item xs={6} key={`${label}-${index}`}>
              {renderSection(label)}
            </Grid>
          ),
        )}
      </Grid>
    </InfoCard>
  );
};
