import {ReactElement} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import useTheme from '@mui/material/styles/useTheme';
import {useTranslation} from 'react-i18next';
import {ReactComponent as Pin} from '../assets/icons/Pin.svg';
import {ElevatorStatus, ElevatorView} from '../models/elevator';
import {formatDate} from '../utils/datetime';
import {StatusIndicator} from './StatusIndicator';

interface Props {
  elevator?: ElevatorView;
  lat: number;
  lng: number;
  children?: ReactElement;
}

export const LocationPin = ({
  elevator: elevatorItem,
  lat,
  lng,
  children,
}: Props) => {
  console.log(`lat = ${lat}, lng = ${lng}`);
  const {t} = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const renderTooltipDetail = (elevator: ElevatorView) => (
    <Box
      display="flex"
      flexDirection="column"
      style={{color: 'black'}}
      padding={1}>
      <Box display="flex">
        <Box sx={{flexGrow: 1}}>
          <Typography variant="caption" mt="1em">
            {t('Company')}: <br />{' '}
            <Typography
              color="text.secondary"
              sx={{whiteSpace: 'wrap', mr: '0.5em'}}>
              {elevator.propertyOwner.name}
            </Typography>
          </Typography>
        </Box>

        <Box>
          <StatusIndicator
            color={
              elevator.status === ElevatorStatus.RUNNING ? 'success' : 'error'
            }
            containerStyles={{ml: '5em'}}>
            <Typography variant="caption">
              {t(
                `${elevator.status.charAt(0)}${elevator.status
                  .slice(1)
                  .toLowerCase()}`,
              )}
            </Typography>
          </StatusIndicator>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="1em">
        <Box sx={{flexGrow: 1}}>
          <Typography variant="caption">
            {t('Elevator Address')}: <br />
            <Typography
              color="text.secondary"
              sx={{whiteSpace: 'wrap', mr: '0.5em'}}>
              {elevator.address.fullName}
            </Typography>
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" mt="1em">
            {t('Capacity')}: <br />{' '}
            <Typography color="text.secondary">{elevator.capacity}</Typography>
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="1em">
        <Box>
          <Typography variant="caption">
            {t('Last Visit')}: <br />{' '}
            <Typography color="text.secondary">
              {' '}
              {formatDate(elevator.lastVisitDate)}
            </Typography>
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">
            {t('Next Visit')}: <br />
            {elevator.nextVisitDate && (
              <Typography color="text.secondary">
                {' '}
                {formatDate(elevator.nextVisitDate)}
              </Typography>
            )}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="outlined"
        size="small"
        style={{marginTop: '2rem'}}
        onClick={() => navigate(`/units/details/${elevator.id}`)}>
        {t('More details')}
      </Button>
    </Box>
  );
  return (
    <Box
      sx={{
        fill: () => theme.palette.common.white,
        stroke: () => theme.palette.divider,
        strokeWidth: 1,
      }}>
      {children || (
        <Box>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'common.white',
                  '& .MuiTooltip-arrow': {
                    color: 'common.black',
                  },
                },
              },
            }}
            title={renderTooltipDetail(elevatorItem!)}
            arrow
            placement="top">
            <Pin />
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};
