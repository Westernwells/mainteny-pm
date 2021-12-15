import React from 'react';
import {styled} from '@mui/material';
import Button from '@mui/material/Button';
import Elevator from '@mui/icons-material/Elevator';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import Chip from '@mui/material/Chip';
import {ElevatorsByAddress} from './Models';
import {getDay} from '../../utils/datetime';
import {ElevatorStatus} from '../../models/elevator';

export interface UnitsSectionProperty {
  elevatorsByAddress: ElevatorsByAddress;
}

const randomizeAvailability = [
  100, 92, 100, 85, 98, 100, 88, 100, 99, 65, 100, 100, 90, 100, 100,
];

export const UnitsSection = ({elevatorsByAddress}: UnitsSectionProperty) => {
  const availability =
    randomizeAvailability[
      Math.floor(Math.random() * randomizeAvailability.length)
    ];
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
      <Grid container sx={{mb: 3, width: '97%'}}>
        <Grid item xs={11}>
          <Box pl={2}>
            <Typography variant="h5">Grant Hyatt Berlin,</Typography>
            <Typography variant="largeBtnText" mt={1} color="textSecondary">
              {elevatorsByAddress.address.fullName}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={1} sx={{width: '50%'}}>
          <Box>
            <Typography variant="h5" color="textSecondary" pr="13%">
              {elevatorsByAddress.elevators.length} units
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {elevatorsByAddress.elevators.map((elevatorOrder) => (
        <Grid
          container
          sx={{
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 2,
            '&:hover': {background: 'rgba(0, 209, 255, 0.08)'},
          }}
        >
          <Grid item xs={3} sx={{display: 'flex'}}>
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
            <Grid item xs={1}>
              <Typography variant="largeBtnText">
                {elevatorOrder.elevator.number}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography variant="largeBtnText">
                {elevatorOrder.elevator.lastVisitDate || 'N/A'}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography variant="largeBtnText">
                {' '}
                {getDay(elevatorOrder.serviceOrder?.schedules[0]?.startTime) ||
                  '2021-08-21'}
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
                sx={{background: (theme) => theme.state.hover, px: 3}}
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
    </Box>
  );
};
