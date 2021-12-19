import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Elevator from '@mui/icons-material/Elevator';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {addDays} from 'date-fns';
import {calculateNextVisitDate, ElevatorsByAddress} from './Models';
import {getDateObject, getDay} from '../../utils/datetime';
import {ElevatorStatus} from '../../models/elevator';

export interface UnitsSectionProperty {
  elevatorsByAddress: ElevatorsByAddress;
}

const randomizeAvailability = [
  100, 92, 100, 85, 98, 100, 88, 100, 99, 65, 100, 100, 90, 100, 100,
];

export const UnitSection = ({elevatorsByAddress}: UnitsSectionProperty) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const availability =
    randomizeAvailability[
      Math.floor(Math.random() * randomizeAvailability.length)
    ];

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FAFAFA',
        border: '1px solid #E4E9F2',
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 2,
        paddingLeft: '15px',
        borderRadius: '4px 4px 0px 0px',
      }}
    >
      <Box pl={2} mb={1}>
        <Typography variant="largeBtnText" mt={1} color="textSecondary">
          {elevatorsByAddress.address.fullName}
        </Typography>
      </Box>

      {elevatorsByAddress.elevators.map((elevatorOrder) => (
        <Grid
          key={elevatorOrder.elevator.id}
          container
          sx={{
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 2,
            '&:hover': {background: 'rgba(0, 209, 255, 0.08)'},
          }}
        >
          <Grid
            item
            xs={3}
            sx={{display: 'flex', cursor: 'pointer'}}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              e.preventDefault();
              navigate(`/units/${elevatorOrder.elevator.id}`);
            }}
          >
            <Box mr={2}>
              <Elevator />
            </Box>
            <Typography variant="h6">{elevatorOrder.elevator.model}</Typography>
          </Grid>
          <Grid
            item
            container
            xs={9}
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Grid item xs={2}>
              <Typography variant="largeBtnText">
                {elevatorOrder.elevator.lastVisitDate || 'N/A'}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography variant="largeBtnText">
                {' '}
                {(elevatorOrder.serviceOrder &&
                  getDay(calculateNextVisitDate(elevatorOrder.serviceOrder))) ||
                  ''}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography
                variant="largeBtnText"
                color={availability < 100 ? 'textWarning' : 'textSuccess'}
              >
                {availability}%
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Chip
                sx={{py: 2}}
                label={
                  <Typography
                    variant="largeBtnText"
                    sx={{textTransform: 'capitalize'}}
                  >
                    {`${elevatorOrder.elevator.status.charAt(
                      0,
                    )}${elevatorOrder.elevator.status.slice(1).toLowerCase()}`}
                  </Typography>
                }
                color={
                  elevatorOrder.elevator.status === ElevatorStatus.RUNNING
                    ? 'success'
                    : 'error'
                }
                size="medium"
              />
            </Grid>

            <Grid item xs={2}>
              <Button
                variant="outlined"
                sx={{background: theme.state.hover, px: 3}}
                onClick={handleClick}
              >
                <Typography
                  variant="largeBtnText"
                  sx={{textTransform: 'capitalize'}}
                >
                  {' '}
                  Notify{' '}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{width: '100%'}}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </Box>
  );
};
