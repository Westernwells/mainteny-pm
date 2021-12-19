import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import {formatDistance} from 'date-fns';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FormatListNumberedRtlOutlinedIcon from '@mui/icons-material/FormatListNumberedRtlOutlined';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import useTheme from '@mui/material/styles/useTheme';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {Elevator, ElevatorStatus} from '../../models/elevator';
import {ReactComponent as Escalator} from '../../assets/icons/Escalator.svg';
import {ReactComponent as Elevation} from '../../assets/icons/Elevation.svg';
import {ServiceOrder, ServiceOrderView} from '../../models/service-order';
import {getDay} from '../../utils/datetime';

import {calculateNextVisitDate} from '../Units/Models';

export interface ElevatorBasicSectionProp {
  elevator: Elevator;
  serviceOrder?: ServiceOrder | ServiceOrderView;
}

export const ElevatorBasicSection = ({
  elevator,
  serviceOrder,
}: ElevatorBasicSectionProp) => {
  const theme = useTheme();
  return (
    <Box
      sx={{background: '#fff', borderRadius: '8px', height: 500, px: '20px'}}
      pt={2}
      pb={3}
    >
      <Box>
        <Box display="flex" mt={1}>
          <Box mr={2}>
            <Escalator />
          </Box>
          <Typography
            variant="h6"
            mt={1}
            mr={8}
            flexGrow={1}
            color={theme.palette.primary.main}
          >
            {elevator.model}
          </Typography>
          <Box>
            <Elevation />
          </Box>
        </Box>
        <Chip
          sx={{py: 2, ml: 8}}
          label={
            <Typography
              variant="largeBtnText"
              sx={{textTransform: 'capitalize'}}
            >
              {`${elevator.status.charAt(0)}${elevator.status
                .slice(1)
                .toLowerCase()}`}
            </Typography>
          }
          color={
            elevator.status === ElevatorStatus.RUNNING ? 'success' : 'error'
          }
          size="medium"
        />

        <Box display="flex" mt={2}>
          <Box display="flex" mr={3} width="50%">
            <Box
              sx={{background: theme.palette.background.default}}
              width={35}
              height={35}
            >
              <LocationOnOutlinedIcon
                sx={{
                  width: '18px',
                  height: '18px',
                  ml: 1,
                  mt: 1,
                  color: theme.palette.text.primary,
                }}
              />
            </Box>
            <Typography
              variant="tableHeaderText"
              mt={1}
              ml={2}
              sx={{color: theme.palette.text.secondary}}
            >
              ADDRESS
            </Typography>
          </Box>

          <Typography variant="subtitle1" mt={1} width="50%">
            {elevator.address.fullName}
          </Typography>
        </Box>

        <Box display="flex" mt={2}>
          <Box display="flex" mr={3} width="50%">
            <Box
              sx={{background: theme.palette.background.default}}
              width={35}
              height={35}
            >
              <PersonOutlineOutlinedIcon
                sx={{
                  width: '18px',
                  height: '18px',
                  ml: 1,
                  mt: 1,
                  color: theme.palette.text.primary,
                }}
              />
            </Box>
            <Typography
              variant="tableHeaderText"
              mt={1}
              ml={2}
              sx={{color: theme.palette.text.secondary}}
            >
              FACILITY MANAGER
            </Typography>
          </Box>

          <Typography variant="subtitle1" mt={1} width="50%">
            George Cooper
          </Typography>
        </Box>

        <Box display="flex" mt={2}>
          <Box display="flex" mr={3} width="50%">
            <Box
              sx={{background: theme.palette.background.default}}
              width={35}
              height={35}
            >
              <FormatListNumberedRtlOutlinedIcon
                sx={{
                  width: '18px',
                  height: '18px',
                  ml: 1,
                  mt: 1,
                  color: theme.palette.text.primary,
                }}
              />
            </Box>
            <Typography
              variant="tableHeaderText"
              mt={1}
              ml={2}
              sx={{color: theme.palette.text.secondary}}
            >
              NUMBER
            </Typography>
          </Box>

          <Typography variant="subtitle1" mt={1} width="50%">
            {elevator.number}
          </Typography>
        </Box>

        <Box display="flex" mt={2}>
          <Box display="flex" mr={3} width="50%">
            <Box
              sx={{background: theme.palette.background.default}}
              width={35}
              height={35}
            >
              <MonitorWeightOutlinedIcon
                sx={{
                  width: '18px',
                  height: '18px',
                  ml: 1,
                  mt: 1,
                  color: theme.palette.text.primary,
                }}
              />
            </Box>
            <Typography
              variant="tableHeaderText"
              mt={1}
              ml={2}
              sx={{color: theme.palette.text.secondary}}
            >
              CAPACITY
            </Typography>
          </Box>

          <Typography variant="subtitle1" mt={1} width="50%">
            {elevator.capacity}
          </Typography>
        </Box>

        <Box display="flex" mt={2}>
          <Box display="flex" mr={3} width="50%">
            <Box
              sx={{background: theme.palette.background.default}}
              width={35}
              height={35}
            >
              <MultipleStopIcon
                sx={{
                  width: '18px',
                  height: '18px',
                  ml: 1,
                  mt: 1,
                  color: theme.palette.text.primary,
                }}
              />
            </Box>
            <Typography
              variant="tableHeaderText"
              mt={1}
              ml={2}
              sx={{color: theme.palette.text.secondary}}
            >
              STOPS
            </Typography>
          </Box>

          <Typography variant="subtitle1" mt={1} width="50%">
            10
          </Typography>
        </Box>

        {serviceOrder && (
          <Box>
            <Alert sx={{mt: 3}} icon={<CalendarTodayIcon />} severity="info">
              <Typography variant="alertTitleText">
                Upcoming visit in{' '}
                {formatDistance(
                  calculateNextVisitDate(serviceOrder),
                  new Date(),
                )}{' '}
                ( {getDay(calculateNextVisitDate(serviceOrder))}){' '}
              </Typography>
            </Alert>
          </Box>
        )}
      </Box>
    </Box>
  );
};
