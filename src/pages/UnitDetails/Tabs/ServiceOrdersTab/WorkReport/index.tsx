import {useTranslation} from 'react-i18next';
import useTheme from '@mui/material/styles/useTheme';
import {Grid} from '@mui/material';
import Typography from '@mui/material/Typography';
import {
  AccessTimeFilled,
  Engineering,
  EuroSymbol,
  Timelapse,
  TimerOutlined,
} from '@mui/icons-material';
import {InfoCard} from 'components/InfoCard';
import {CardProps} from 'components/CardProps';
import {useFormatDate} from 'hooks/useFormatDate';
import {convertMinsToHM, toDate} from 'utils/datetime';
import {ServiceOrderView} from 'models/service-order';

interface Props {
  serviceOrder: ServiceOrderView;
  cost: string;
}

export const WorkReport = ({serviceOrder, cost}: Props) => {
  const {t} = useTranslation();
  const formatDate = useFormatDate();
  const theme = useTheme();

  const renderSection = (label: string) => {
    switch (label) {
      case 'technician':
        return (
          <CardProps
            icon={<Engineering sx={{color: theme.palette.info.dark}} />}
            label="TECHNICIAN"
            bodyText={
              serviceOrder.schedules && serviceOrder.schedules.length
                ? `${serviceOrder.schedules[0].technician.userAccount.firstName} ${serviceOrder.schedules[0].technician.userAccount.lastName}`
                : '-'
            }
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      case 'cost':
        return (
          <CardProps
            icon={<EuroSymbol sx={{color: theme.palette.info.dark}} />}
            label="COST"
            bodyText={
              <Typography component="div" variant="body2">
                {cost}
              </Typography>
            }
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      case 'duration':
        return (
          <CardProps
            icon={<TimerOutlined sx={{color: theme.palette.info.dark}} />}
            label="DURATION"
            bodyText={convertMinsToHM(serviceOrder?.serviceTime ?? 0)}
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      case 'startTime':
        return (
          <CardProps
            icon={<Timelapse sx={{color: theme.palette.info.dark}} />}
            label="START TIME"
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
      case 'endTime':
        return (
          <CardProps
            icon={<AccessTimeFilled sx={{color: theme.palette.info.dark}} />}
            label="END TIME"
            bodyText={
              serviceOrder.schedules && serviceOrder.schedules.length
                ? `${formatDate(
                    toDate(serviceOrder.schedules[0].endTime),
                  )},${formatDate(
                    toDate(serviceOrder.schedules[0].endTime),
                    'HH:mm',
                  )}`
                : '-'
            }
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
      header={<Typography variant="subtitle1">{t('Work Report')}</Typography>}
      showHeaderBackground
      headerStyles={{
        py: '0.25rem',
        px: '0.5rem',
      }}>
      <Typography variant="body2" color={theme.palette.text.secondary}>
        {serviceOrder.actualEndTime
          ? `Resolved on 
        ${formatDate(toDate(serviceOrder.actualEndTime))}, ${formatDate(
              toDate(serviceOrder.actualEndTime),
              'HH:mm',
            )}`
          : null}
      </Typography>
      <Typography
        variant="body1"
        color={theme.palette.text.primary}
        pb="1.5rem">
        {serviceOrder.description}
      </Typography>
      <Grid container rowSpacing={6}>
        {['technician', 'cost', 'duration', 'startTime', 'endTime'].map(
          (label, index) => (
            <Grid item xs={4} key={`${label}-${index}`}>
              {renderSection(label)}
            </Grid>
          ),
        )}
      </Grid>
    </InfoCard>
  );
};
