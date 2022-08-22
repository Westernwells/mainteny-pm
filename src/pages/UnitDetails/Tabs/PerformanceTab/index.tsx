import {useTranslation} from 'react-i18next';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import {ElevatorView} from 'models/elevator';
import {StatsSection} from './StatsSection';
import {PerformanceAnalytics} from './PerformanceAnalytics';
import {UnitDetails} from './UnitDetails';
import {Battery} from './Battery';
import {CabinDoorRolls} from './CabinDoorRolls';
import {RollsShaftDoor} from './RollsShaftDoor';

interface Props {
  elevator: ElevatorView;
}

export const PerformanceTab = ({elevator}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <>
      <Alert
        severity="info"
        sx={{boxShadow: '0px 4px 15px rgba(144, 144, 144, 0.2)'}}>
        {t(
          'The displayed information is based on dummy data. In order to show real-time unit information, the unit has to be connected to an IoT device. For more details, please reach out writing an email to',
        )}
        &nbsp;
        <Typography
          component="span"
          variant="body2"
          sx={{cursor: 'pointer', textDecoration: 'underline'}}
          onClick={() =>
            window.open(
              `mailto:${elevator?.meta.creator?.contact.email}`,
              '_blank',
            )
          }>
          {elevator?.meta.creator?.contact.email}
        </Typography>
      </Alert>
      <Grid
        container
        gap={1}
        alignItems="stretch"
        justifyContent="space-between"
        py="1rem">
        {/* Unit Details */}
        <Grid item lg={6.8}>
          <UnitDetails />
        </Grid>
        <Grid item lg={5}>
          <StatsSection />
        </Grid>
      </Grid>

      <Grid
        container
        gap={1}
        sx={{
          justifyContent: 'space-evenly',
          alignItems: 'stretch',
          [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between',
          },
        }}>
        {/* Battery section */}
        <Grid item xs={5} lg={2.8}>
          <Battery />
        </Grid>

        {/* Cabin Door Rolls (EOL) section */}
        <Grid item xs={5} lg={2.5}>
          <CabinDoorRolls />
        </Grid>

        {/* Rolls Shaft Door section */}
        <Grid item xs={5} lg={2.8}>
          <RollsShaftDoor />
        </Grid>

        {/* Performance Analytics section */}
        <Grid item xs={5} lg={3.5}>
          <PerformanceAnalytics />
        </Grid>
      </Grid>
    </>
  );
};
