import {useTranslation} from 'react-i18next';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import {
  DateRange,
  EuroSymbol,
  Event,
  EventAvailable,
} from '@mui/icons-material';
import {ElevatorView} from 'models/elevator';
import {ContractSimpleView} from 'models/contract';
import {useFormatDate} from 'hooks/useFormatDate';
import {getCurrencySymbol} from 'utils/currency';
import {InfoCard} from 'components/InfoCard';
import {CardProps} from 'components/CardProps';

interface Props {
  containerStyles?: {[key: string]: any};
  elevator: ElevatorView;
  validContract?: ContractSimpleView;
}

export const Service = ({containerStyles, elevator, validContract}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const formatDate = useFormatDate();

  return (
    <InfoCard
      containerStyles={{...containerStyles}}
      header={<Typography variant="subtitle1">{t('Service')}</Typography>}
      showHeaderBackground
      headerStyles={{
        py: '0.25rem',
        px: '0.5rem',
      }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CardProps
            icon={<EventAvailable sx={{color: theme.palette.info.dark}} />}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            label={t('LAST VISIT')}
            bodyText={
              elevator.lastVisitDate
                ? formatDate(new Date(elevator.lastVisitDate))
                : '-'
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CardProps
            icon={<Event sx={{color: theme.palette.info.dark}} />}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            label={t('NEXT VISIT')}
            bodyText={
              elevator.nextVisitDate
                ? formatDate(new Date(elevator.nextVisitDate))
                : '-'
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CardProps
            icon={<DateRange sx={{color: theme.palette.info.dark}} />}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            label={t('LAST INSPECTION')}
            bodyText={
              elevator.additionalInfo.lastInspectionDate
                ? formatDate(
                    new Date(elevator.additionalInfo.lastInspectionDate),
                  )
                : '-'
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CardProps
            icon={<EuroSymbol sx={{color: theme.palette.info.dark}} />}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            label={t('SPENDING LIMIT')}
            bodyText={
              validContract?.spendingLimit
                ? `${getCurrencySymbol[validContract?.currency]}${
                    validContract?.spendingLimit
                  }`
                : '-'
            }
          />
        </Grid>
      </Grid>
    </InfoCard>
  );
};
