import {useTranslation} from 'react-i18next';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import {
  Build,
  Call,
  DoorSliding,
  FormatLineSpacing,
  Grid3x3,
  Label,
  LocalParking,
  MapsHomeWork,
  MonitorWeight,
  VpnKey,
} from '@mui/icons-material';
import {ElevatorView} from 'models/elevator';
import {InfoCard} from 'components/InfoCard';
import {CardProps} from 'components/CardProps';

interface Props {
  containerStyles?: {[key: string]: any};
  elevator: ElevatorView;
}

export const UnitDetails = ({containerStyles, elevator}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <InfoCard
      containerStyles={{...containerStyles}}
      header={<Typography variant="subtitle1">{t('Unit Details')}</Typography>}
      showHeaderBackground
      headerStyles={{
        py: '0.25rem',
        px: '0.5rem',
      }}>
      <Grid container rowSpacing={4} pt="0.625rem">
        <Grid item xs={12} lg={4}>
          <Grid container rowSpacing={4} flexDirection="column">
            <Grid item>
              <CardProps
                icon={<Build sx={{color: theme.palette.info.dark}} />}
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3rem"
                label={t('MANUFACTURER')}
                bodyText={elevator.additionalInfo?.manufacturer ?? '-'}
              />
            </Grid>
            <Grid item>
              <CardProps
                icon={<Label sx={{color: theme.palette.info.dark}} />}
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3rem"
                label={t('UNIT TYPE')}
                bodyText={elevator.type}
              />
            </Grid>
            <Grid item>
              <CardProps
                icon={
                  <FormatLineSpacing sx={{color: theme.palette.info.dark}} />
                }
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3rem"
                label={t('NUMBER OF STOPS')}
                bodyText={elevator.additionalInfo?.numberOfStops ?? '-'}
              />
            </Grid>
            <Grid item>
              <CardProps
                icon={<MonitorWeight sx={{color: theme.palette.info.dark}} />}
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3rem"
                label={t('UNIT CAPACITY')}
                bodyText={elevator?.capacity ?? '-'}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container rowSpacing={4} flexDirection="column">
            <Grid item>
              <CardProps
                icon={<DoorSliding sx={{color: theme.palette.info.dark}} />}
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3rem"
                label={t('CABIN TYPE')}
                bodyText={elevator.additionalInfo?.cabinType ?? '-'}
              />
            </Grid>
            <Grid item>
              <CardProps
                icon={<MapsHomeWork sx={{color: theme.palette.info.dark}} />}
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3rem"
                label={t('PROPERTY SEGMENT')}
                bodyText={elevator.additionalInfo?.propertySegment ?? '-'}
              />
            </Grid>
            <Grid item>
              <CardProps
                icon={<VpnKey sx={{color: theme.palette.info.dark}} />}
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3rem"
                label={t('KEY LOCATION')}
                bodyText={elevator.additionalInfo?.keyLocation ?? '-'}
              />
            </Grid>
            <Grid item>
              <CardProps
                icon={<LocalParking sx={{color: theme.palette.info.dark}} />}
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3rem"
                label={t('PARKING')}
                bodyText={elevator.additionalInfo?.parking ?? '-'}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container rowSpacing={4} flexDirection="column">
            <Grid item>
              <CardProps
                icon={<Grid3x3 sx={{color: theme.palette.info.dark}} />}
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3rem"
                label={t('SERIAL NUMBER')}
                bodyText={elevator.serialNumber || '-'}
              />
            </Grid>
            <Grid item>
              <CardProps
                icon={<Call sx={{color: theme.palette.info.dark}} />}
                iconBackground={theme.palette.info.outlinedHoverBg}
                iconMaxHeight="3rem"
                label={t('EMERGENCY PHONE PROVIDER')}
                bodyText={
                  elevator.additionalInfo?.emergencyPhoneProvider ?? '-'
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </InfoCard>
  );
};
