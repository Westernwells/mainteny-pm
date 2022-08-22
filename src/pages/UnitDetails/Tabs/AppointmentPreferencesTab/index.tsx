import {useTranslation} from 'react-i18next';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {ElevatorView} from 'models/elevator';
import {InfoCard} from 'components/InfoCard';
import {
  AppointmentPreferencesKey,
  AppointmentPreferencesSchema,
} from './AppointmentPreferencesSchema';

interface Props {
  containerStyles?: {[key: string]: any};
  elevator: ElevatorView;
}

export const AppointmentPreferencesTab = ({
  containerStyles,
  elevator,
}: Props) => {
  const {t} = useTranslation();

  return (
    <InfoCard
      containerStyles={{...containerStyles}}
      header={
        <Typography variant="subtitle1">
          {t('Appointment Preferences')}
        </Typography>
      }
      showHeaderBackground>
      <Grid container spacing={1}>
        {elevator.properties &&
          elevator.properties
            .filter(
              (property) =>
                (AppointmentPreferencesKey as {[key: string]: any})[
                  property.key
                ],
            )
            .sort((a, b) => a.key.localeCompare(b.key))
            .map((property) => (
              <Grid key={property.key} item xs={12} sm={6} lg={4}>
                <AppointmentPreferencesSchema
                  label={property.key}
                  property={property}
                />
              </Grid>
            ))}
      </Grid>
    </InfoCard>
  );
};
