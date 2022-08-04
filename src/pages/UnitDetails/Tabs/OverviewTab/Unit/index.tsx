import {useTranslation} from 'react-i18next';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import {Elevator, Escalator, Grid3x3, LocationCity} from '@mui/icons-material';
import {ElevatorView} from 'models/elevator';
import {InfoCard} from 'components/InfoCard';
import {StatusChip} from 'components/StatusChip';
import {CardProps} from 'components/CardProps';
import {convertToText} from 'utils/utils';

interface Props {
  containerStyles?: {[key: string]: any};
  elevator: ElevatorView;
}

export const Unit = ({containerStyles, elevator}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <InfoCard
      containerStyles={{...containerStyles}}
      header={<Typography variant="subtitle1">{t('Unit')}</Typography>}
      showHeaderBackground
      headerStyles={{
        py: '0.125rem',
        px: '0.5rem',
      }}
      {...(elevator.status === 'RUNNING' && {
        headerActionIcon: <StatusChip color="success" label="Running" />,
      })}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CardProps
            icon={<Escalator sx={{color: theme.palette.text.primary}} />}
            iconBackground={theme.palette.background.default}
            iconMaxHeight="3rem"
            label={t(convertToText(elevator.category))}
            titleTextVariant="subtitle1"
            labelStyle={{color: theme.palette.text.primary}}
            bodyText={elevator.address.fullName || '-'}
          />
        </Grid>
        <Grid item xs={12}>
          <CardProps
            icon={<Grid3x3 sx={{color: theme.palette.info.dark}} />}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            label={t('UNIT NUMBER')}
            bodyText={elevator.externalId || '-'}
          />
        </Grid>
        <Grid item xs={12}>
          <CardProps
            icon={<LocationCity sx={{color: theme.palette.info.dark}} />}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            label={t('BUILDING')}
            bodyText={elevator.additionalInfo.buildingLocation || '-'}
          />
        </Grid>
        <Grid item xs={12}>
          <CardProps
            icon={<Elevator sx={{color: theme.palette.info.dark}} />}
            iconBackground={theme.palette.info.outlinedHoverBg}
            iconMaxHeight="3rem"
            label={t('MODEL')}
            bodyText={elevator.model || '-'}
          />
        </Grid>
      </Grid>
    </InfoCard>
  );
};
