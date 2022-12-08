import {
  Cached,
  DoorSliding,
  Equalizer,
  EventAvailable,
  Flourescent,
  Forward10,
  History,
  PermContactCalendar,
} from '@mui/icons-material';
import {Divider, Grid, Typography} from '@mui/material';
import {ElevatorView} from 'models/elevator';
import useTheme from '@mui/material/styles/useTheme';
import {CardProps} from 'components/CardProps';
import {InfoCard} from 'components/InfoCard';
import {StatusChip} from 'components/StatusChip';
import {useFormatDate} from 'hooks/useFormatDate';
import {useTranslation} from 'react-i18next';
import {groupBy} from 'lodash';
import {useRef} from 'react';

interface Props {
  elevator: ElevatorView;
}

// const properties = {
//   responseTime: 'Response Time',
//   availability: 'Availability'
// }

export const UnitDetails = ({elevator}: Props) => {
  const formatDate = useFormatDate();
  const theme = useTheme();
  const {t} = useTranslation();
  const properties = useRef(
    groupBy(elevator.properties, (record) => record.key),
  ).current;

  return (
    <InfoCard
      containerStyles={{
        [theme.breakpoints.up('md')]: {
          minHeight: '24.5rem',
          height: '100%',
        },
      }}
      header={
        <Typography variant="subtitle2" color={theme.palette.action.active}>
          {t('Unit Details')}
        </Typography>
      }
      showHeaderBackground>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={4}>
        <Grid item xs={4}>
          <StatusChip label="Running" color="success" size="medium" />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            icon={<PermContactCalendar sx={{color: theme.palette.info.dark}} />}
            label="LAST VISIT"
            bodyText={
              elevator.lastVisitDate
                ? formatDate(new Date(elevator.lastVisitDate))
                : '-'
            }
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3rem"
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            icon={<Cached sx={{color: theme.palette.info.dark}} />}
            label="LAST INSPECTION"
            bodyText={
              elevator.additionalInfo.lastInspectionDate
                ? formatDate(
                    new Date(elevator.additionalInfo.lastInspectionDate),
                  )
                : '-'
            }
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3rem"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider color={theme.palette.primary.outlinedHoverBg} />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            icon={<EventAvailable sx={{color: theme.palette.info.dark}} />}
            label="Ø AVAILABILITY"
            bodyText={
              properties.Availability
                ? `${
                    (properties.Availability.reduce(
                      (prev, curr) => prev + Number(curr.value),
                      0,
                    ) *
                      100) /
                    properties.Availability.length
                  }%`
                : '-'
            }
            bodyTextVariant="body1"
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3rem"
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            icon={<Forward10 sx={{color: theme.palette.info.dark}} />}
            label="RESPONSE TIME"
            bodyText={
              properties['Response time']
                ? `${
                    properties['Response time'].reduce(
                      (prev, curr) => prev + Number(curr.value),
                      0,
                    ) / properties['Response time'].length
                  } minutes`
                : '-'
            }
            bodyTextVariant="body1"
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3rem"
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            icon={<History sx={{color: theme.palette.info.dark}} />}
            label="Ø RUNS/DAY"
            bodyText="68382411"
            bodyTextVariant="body1"
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3rem"
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            icon={<DoorSliding sx={{color: theme.palette.info.dark}} />}
            label="Ø DOOR OPENS/DAY"
            bodyText="101"
            bodyTextVariant="body1"
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3rem"
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            icon={<Flourescent sx={{color: theme.palette.info.dark}} />}
            label="CURRENT FLOOR"
            bodyText="4"
            bodyTextVariant="body1"
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3rem"
          />
        </Grid>
        <Grid item xs={4}>
          <CardProps
            icon={<Equalizer sx={{color: theme.palette.info.dark}} />}
            label="Ø AIR QUALITY"
            bodyText="92%"
            bodyTextVariant="body1"
            iconBackground={theme.palette.info.outlinedHoverBg}
            containerStyles={{mt: '0.5em'}}
            iconMaxHeight="3rem"
          />
        </Grid>
      </Grid>
    </InfoCard>
  );
};
