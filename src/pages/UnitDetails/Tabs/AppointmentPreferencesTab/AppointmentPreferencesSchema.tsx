import {useTranslation} from 'react-i18next';
import useTheme from '@mui/material/styles/useTheme';
import {
  AssignmentTurnedIn,
  Info,
  NotificationImportant,
  TimerOutlined,
  ViewWeek,
} from '@mui/icons-material';
import {ElevatorProperty} from 'models/elevator';
import {CardProps} from 'components/CardProps';

export enum AppointmentPreferencesKey {
  appointmentDaysOfWeek = 'appointmentDaysOfWeek',
  openingHours = 'openingHours',
  appointmentNotificationDueInDays = 'appointmentNotificationDueInDays',
  requiresAppointmentNotification = 'requiresAppointmentNotification',
  requiresAppointment = 'requiresAppointment',

  'Appointment Day of the Week' = 'Appointment Day of the Week',
  'Appointment Time' = 'Appointment Time',
  'Appointment Notification Due' = 'Appointment Notification Due',
  'Notify Customer' = 'Notify Customer',
}

interface Props {
  label: string;
  property: ElevatorProperty;
}

export const AppointmentPreferencesSchema = ({label, property}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const renderSection = () => {
    switch (label) {
      case AppointmentPreferencesKey.appointmentDaysOfWeek:
      case AppointmentPreferencesKey['Appointment Day of the Week']:
        return (
          <CardProps
            icon={<ViewWeek sx={{color: theme.palette.info.dark}} />}
            label={t('DAYS OF THE WEEK')}
            bodyText={property.value}
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      case AppointmentPreferencesKey.openingHours:
      case AppointmentPreferencesKey['Appointment Time']:
        return (
          <CardProps
            icon={<TimerOutlined sx={{color: theme.palette.info.dark}} />}
            label={t('OPENING HOURS')}
            bodyText={property.value}
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      case AppointmentPreferencesKey.appointmentNotificationDueInDays:
      case AppointmentPreferencesKey['Appointment Notification Due']:
        return (
          <CardProps
            icon={
              <NotificationImportant sx={{color: theme.palette.info.dark}} />
            }
            label={t('NOTIFICATION DUE')}
            bodyText={property.value}
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      case AppointmentPreferencesKey.requiresAppointment:
        return (
          <CardProps
            icon={<AssignmentTurnedIn sx={{color: theme.palette.info.dark}} />}
            label={t('REQUIRES APPOINTMENT')}
            bodyText={t(property.value)}
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      case AppointmentPreferencesKey.requiresAppointmentNotification:
      case AppointmentPreferencesKey['Notify Customer']:
        return (
          <CardProps
            icon={<Info sx={{color: theme.palette.info.dark}} />}
            label={t('REQUIRES NOTIFICATION')}
            bodyText={t(property.value)}
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3em"
          />
        );
      default:
        return null;
    }
  };
  return renderSection();
};
